import sql from '@/app/api/utils/sql';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get customer details
    const [customer] = await sql`
      SELECT 
        c.id,
        u.name,
        c.address,
        c.area,
        u.phone,
        c.usual_quantity,
        c.rate_per_liter,
        c.delivery_man_id
      FROM customers c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ${id}
    `;

    if (!customer) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Get current month's deliveries
    const deliveries = await sql`
      SELECT 
        delivery_date,
        quantity,
        total_amount,
        rate_per_liter
      FROM deliveries
      WHERE customer_id = ${id}
        AND EXTRACT(MONTH FROM delivery_date) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM delivery_date) = EXTRACT(YEAR FROM CURRENT_DATE)
      ORDER BY delivery_date
    `;

    return Response.json({ 
      customer,
      deliveries: deliveries.map(d => ({
        date: d.delivery_date,
        quantity: parseFloat(d.quantity),
        amount: parseFloat(d.total_amount)
      }))
    });
  } catch (error) {
    console.error('Error fetching customer details:', error);
    return Response.json({ error: 'Failed to fetch customer details' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, phone, address, area, usual_quantity, rate_per_liter } = body;

    // Update user details
    if (name || phone) {
      await sql`
        UPDATE users 
        SET name = COALESCE(${name}, name),
            phone = COALESCE(${phone}, phone)
        FROM customers c
        WHERE users.id = c.user_id 
          AND c.id = ${id}
      `;
    }

    // Update customer details
    const [customer] = await sql`
      UPDATE customers 
      SET address = COALESCE(${address}, address),
          area = COALESCE(${area}, area),
          usual_quantity = COALESCE(${usual_quantity}, usual_quantity),
          rate_per_liter = COALESCE(${rate_per_liter}, rate_per_liter)
      WHERE id = ${id}
      RETURNING *
    `;

    return Response.json({ customer });
  } catch (error) {
    console.error('Error updating customer:', error);
    return Response.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}