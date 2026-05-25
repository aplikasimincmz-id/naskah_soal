import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Hanya POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { query, params = [] } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'SQL query wajib diisi'
      });
    }

    // FIX UTAMA
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      return res.status(500).json({
        success: false,
        error:
          'DATABASE_URL belum diatur di Environment Variables Vercel'
      });
    }

    const sql = neon(connectionString);

    const result = await sql.query(query, params);

    return res.status(200).json({
      success: true,
      rows: result
    });
  } catch (error: any) {
    console.error('NEON ERROR:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Database error'
    });
  }
}
