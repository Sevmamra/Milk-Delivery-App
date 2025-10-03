import sql from '@/app/api/utils/sql';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const deliveryManId = url.searchParams.get('delivery_man_id');
    
    if (!deliveryManId) {
      return Response.json({ error: 'delivery_man_id is required' }, { status: 400 });
    }

    const customers = await sql`
      SELECT 
        c.id,
        u.name,
        c.address,
        c.area,
        u.phone,
        c.usual_quantity,
        c.rate_per_liter,
        COALESCE(d.quantity, NULL) as today_quantity,
        CASE 
          WHEN d.quantity IS NOT NULL THEN 'पूरा'
          ELSE 'बकाया'
        END as today_status,
        COALESCE(
          TO_CHAR(d.created_at, 'आज HH:MI AM'),
          'Pending'
        ) as last_delivery
      FROM customers c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN deliveries d ON c.id = d.customer_id 
        AND d.delivery_date = CURRENT_DATE
        AND d.delivery_man_id = ${deliveryManId}
      WHERE c.delivery_man_id = ${deliveryManId}
        AND u.is_active = true
      ORDER BY c.area, u.name
    `;

    return Response.json({ customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return Response.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, address, area, usual_quantity, rate_per_liter, delivery_man_id } = body;

    if (!name || !phone || !address || !delivery_man_id) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create user first
    const [user] = await sql`
      INSERT INTO users (phone, name, user_type)
      VALUES (${phone}, ${name}, 'customer')
      RETURNING id
    `;

    // Create customer record
    const [customer] = await sql`
      INSERT INTO customers (
        user_id, 
        address, 
        area, 
        usual_quantity, 
        rate_per_liter, 
        delivery_man_id
      )
      VALUES (
        ${user.id}, 
        ${address}, 
        ${area || ''}, 
        ${usual_quantity || 1.0}, 
        ${rate_per_liter || 60.0}, 
        ${delivery_man_id}
      )
      RETURNING *
    `;

    return Response.json({ customer: { ...customer, ...user } });
  } catch (error) {
    console.error('Error creating customer:', error);
    return Response.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}