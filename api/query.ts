// api/query.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Pengaturan Header CORS
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
    const host = connectionString.split('@')[1]?.split('/')[0];
    if (!host) {
      return res.status(400).json({ error: 'Invalid connection string format' });
    }

    // PERBAIKAN UTAMA: Mengubah dari /v1/sql menjadi /sql agar mendukung Parameterized Query ($1, $2, dst)
    const endpoint = `https://${host}/sql`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        connectionString: connectionString.trim(),
        query,
        params, // Sekarang parameter ini didukung penuh oleh endpoint /sql
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
