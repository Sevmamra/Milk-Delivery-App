import sql from '@/app/api/utils/sql';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Get today's stats
    const [todayStats] = await sql`
      SELECT 
        COALESCE(SUM(d.quantity), 0) as total_milk_delivered,
        COALESCE(SUM(d.total_amount), 0) as total_revenue,
        COUNT(DISTINCT d.customer_id) as completed_deliveries,
        COUNT(DISTINCT c.id) as total_customers
      FROM customers c
      LEFT JOIN deliveries d ON c.id = d.customer_id 
        AND d.delivery_date = ${date}
      JOIN users u ON c.user_id = u.id
      WHERE u.is_active = true
    `;

    // Get delivery men stats
    const deliveryMenStats = await sql`
      SELECT 
        u.id,
        u.name,
        STRING_AGG(DISTINCT c.area, ', ') as areas,
        COUNT(DISTINCT c.id) as total_customers,
        COUNT(DISTINCT d.customer_id) as completed_today,
        COALESCE(SUM(d.quantity), 0) as milk_delivered_today,
        (COUNT(DISTINCT c.id) - COUNT(DISTINCT d.customer_id)) as pending_today
      FROM users u
      LEFT JOIN customers c ON u.id = c.delivery_man_id
      LEFT JOIN deliveries d ON c.id = d.customer_id 
        AND d.delivery_date = ${date}
      WHERE u.user_type = 'delivery_man' 
        AND u.is_active = true
      GROUP BY u.id, u.name
      ORDER BY u.name
    `;

    // Get recent activity (last 20 deliveries and notifications)
    const recentDeliveries = await sql`
      SELECT 
        d.*,
        u.name as customer_name,
        dm.name as delivery_man_name,
        c.area
      FROM deliveries d
      JOIN customers c ON d.customer_id = c.id
      JOIN users u ON c.user_id = u.id
      JOIN users dm ON d.delivery_man_id = dm.id
      WHERE d.delivery_date = ${date}
      ORDER BY d.created_at DESC
      LIMIT 10
    `;

    const pendingDeliveries = parseInt(todayStats.total_customers) - parseInt(todayStats.completed_deliveries);

    return Response.json({
      todayStats: {
        totalMilkDelivered: parseFloat(todayStats.total_milk_delivered),
        totalRevenue: parseFloat(todayStats.total_revenue),
        totalCustomers: parseInt(todayStats.total_customers),
        completedDeliveries: parseInt(todayStats.completed_deliveries),
        pendingDeliveries: Math.max(0, pendingDeliveries),
        activeDeliveryMen: deliveryMenStats.length
      },
      deliveryMenStats: deliveryMenStats.map(dm => ({
        id: dm.id,
        name: dm.name,
        area: dm.areas || 'कोई क्षेत्र नहीं',
        customers: parseInt(dm.total_customers),
        completed: parseInt(dm.completed_today),
        pending: parseInt(dm.pending_today),
        milkDelivered: parseFloat(dm.milk_delivered_today),
        status: "सक्रिय"
      })),
      recentActivity: recentDeliveries.map(d => ({
        id: d.id,
        type: "delivery",
        message: `${d.delivery_man_name} ने ${d.customer_name} को ${d.quantity}L दूध डिलीवर किया`,
        time: new Date(d.created_at).toLocaleString('hi-IN', { 
          timeZone: 'Asia/Kolkata',
          minute: '2-digit',
          hour: '2-digit'
        }) + ' पर',
        area: d.area
      }))
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return Response.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}