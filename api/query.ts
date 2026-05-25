// api/query.ts
import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // Set CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, params } = req.body;
  const connectionString = process.env.VITE_DATABASE_URL;

  if (!connectionString) {
    return res.status(500).json({ error: 'Database connection string is missing on Vercel environment' });
  }

  try {
    // 1. Inisialisasi fungsi neon
    const sql = neon(connectionString.trim());
    
    // 2. PERBAIKAN UTAMA: Menggunakan sql.query() agar mendukung placeholder ($1, $2, dst.)
    const rows = await sql.query(query, params);
    
    return res.status(200).json({ rows });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
