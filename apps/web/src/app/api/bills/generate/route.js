import sql from '@/app/api/utils/sql';

export async function POST(request) {
  try {
    const body = await request.json();
    const { month, year } = body;
    
    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    // Get all customers and their deliveries for the month
    const customerDeliveries = await sql`
      SELECT 
        c.id as customer_id,
        u.name as customer_name,
        u.phone,
        c.address,
        c.rate_per_liter,
        COALESCE(SUM(d.quantity), 0) as total_quantity,
        COALESCE(SUM(d.total_amount), 0) as total_amount,
        COUNT(d.id) as delivery_days
      FROM customers c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN deliveries d ON c.id = d.customer_id 
        AND EXTRACT(MONTH FROM d.delivery_date) = ${currentMonth}
        AND EXTRACT(YEAR FROM d.delivery_date) = ${currentYear}
      WHERE u.is_active = true
      GROUP BY c.id, u.name, u.phone, c.address, c.rate_per_liter
      HAVING COALESCE(SUM(d.quantity), 0) > 0
      ORDER BY u.name
    `;

    const bills = [];

    // Generate bills for each customer
    for (const customer of customerDeliveries) {
      // Insert or update monthly bill
      const [bill] = await sql`
        INSERT INTO monthly_bills (
          customer_id, 
          month, 
          year, 
          total_quantity, 
          total_amount, 
          is_generated,
          generated_at
        )
        VALUES (
          ${customer.customer_id}, 
          ${currentMonth}, 
          ${currentYear}, 
          ${customer.total_quantity}, 
          ${customer.total_amount},
          true,
          NOW()
        )
        ON CONFLICT (customer_id, month, year)
        DO UPDATE SET 
          total_quantity = ${customer.total_quantity},
          total_amount = ${customer.total_amount},
          is_generated = true,
          generated_at = NOW()
        RETURNING *
      `;

      bills.push({
        ...bill,
        customer_name: customer.customer_name,
        customer_phone: customer.phone,
        customer_address: customer.address,
        delivery_days: parseInt(customer.delivery_days),
        total_quantity: parseFloat(customer.total_quantity),
        total_amount: parseFloat(customer.total_amount)
      });

      // Here you would send notification to customer about their monthly bill
      console.log(`Monthly bill generated for ${customer.customer_name}: ₹${customer.total_amount}`);
    }

    return Response.json({ 
      bills,
      summary: {
        total_customers: bills.length,
        total_quantity: bills.reduce((sum, bill) => sum + bill.total_quantity, 0),
        total_amount: bills.reduce((sum, bill) => sum + bill.total_amount, 0),
        month: currentMonth,
        year: currentYear
      },
      message: `${bills.length} customers के लिए मासिक बिल तैयार किया गया`
    });
  } catch (error) {
    console.error('Error generating monthly bills:', error);
    return Response.json({ error: 'Failed to generate monthly bills' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const month = url.searchParams.get('month') || new Date().getMonth() + 1;
    const year = url.searchParams.get('year') || new Date().getFullYear();
    const customerId = url.searchParams.get('customer_id');

    let query = `
      SELECT 
        mb.*,
        u.name as customer_name,
        u.phone as customer_phone,
        c.address as customer_address
      FROM monthly_bills mb
      JOIN customers c ON mb.customer_id = c.id
      JOIN users u ON c.user_id = u.id
      WHERE mb.month = $1 AND mb.year = $2
    `;
    
    const params = [month, year];
    
    if (customerId) {
      query += ` AND mb.customer_id = $3`;
      params.push(customerId);
    }
    
    query += ` ORDER BY u.name`;

    const bills = await sql(query, params);

    return Response.json({ 
      bills: bills.map(bill => ({
        ...bill,
        total_quantity: parseFloat(bill.total_quantity),
        total_amount: parseFloat(bill.total_amount)
      }))
    });
  } catch (error) {
    console.error('Error fetching monthly bills:', error);
    return Response.json({ error: 'Failed to fetch monthly bills' }, { status: 500 });
  }
}