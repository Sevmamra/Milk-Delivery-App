import sql from '@/app/api/utils/sql';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer_id, delivery_man_id, quantity, delivery_date } = body;

    if (!customer_id || !delivery_man_id || !quantity) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get customer details for rate calculation
    const [customer] = await sql`
      SELECT rate_per_liter, user_id
      FROM customers 
      WHERE id = ${customer_id}
    `;

    if (!customer) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    const rate = parseFloat(customer.rate_per_liter);
    const qty = parseFloat(quantity);
    const total_amount = (rate * qty).toFixed(2);
    const date = delivery_date || new Date().toISOString().split('T')[0];

    // Insert or update delivery record
    const [delivery] = await sql`
      INSERT INTO deliveries (
        customer_id, 
        delivery_man_id, 
        quantity, 
        rate_per_liter, 
        total_amount, 
        delivery_date
      )
      VALUES (
        ${customer_id}, 
        ${delivery_man_id}, 
        ${qty}, 
        ${rate}, 
        ${total_amount}, 
        ${date}
      )
      ON CONFLICT (customer_id, delivery_date)
      DO UPDATE SET 
        quantity = ${qty},
        rate_per_liter = ${rate},
        total_amount = ${total_amount},
        delivery_man_id = ${delivery_man_id}
      RETURNING *
    `;

    // Here you would send notification to customer
    // For now, we'll just log it
    console.log(`Delivery recorded for customer ${customer_id}: ${qty}L on ${date}`);

    return Response.json({ 
      delivery: {
        ...delivery,
        quantity: parseFloat(delivery.quantity),
        rate_per_liter: parseFloat(delivery.rate_per_liter),
        total_amount: parseFloat(delivery.total_amount)
      },
      message: 'Delivery recorded successfully'
    });
  } catch (error) {
    console.error('Error recording delivery:', error);
    return Response.json({ error: 'Failed to record delivery' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const deliveryManId = url.searchParams.get('delivery_man_id');
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    if (!deliveryManId) {
      return Response.json({ error: 'delivery_man_id is required' }, { status: 400 });
    }

    const deliveries = await sql`
      SELECT 
        d.*,
        u.name as customer_name,
        c.area
      FROM deliveries d
      JOIN customers c ON d.customer_id = c.id
      JOIN users u ON c.user_id = u.id
      WHERE d.delivery_man_id = ${deliveryManId}
        AND d.delivery_date = ${date}
      ORDER BY d.created_at DESC
    `;

    return Response.json({ 
      deliveries: deliveries.map(d => ({
        ...d,
        quantity: parseFloat(d.quantity),
        rate_per_liter: parseFloat(d.rate_per_liter),
        total_amount: parseFloat(d.total_amount)
      }))
    });
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    return Response.json({ error: 'Failed to fetch deliveries' }, { status: 500 });
  }
}