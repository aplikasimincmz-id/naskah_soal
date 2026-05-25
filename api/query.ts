// api/query.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Atur header CORS agar hanya bisa diakses oleh frontend Anda sendiri
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
    // Memotong host dari connection string untuk mendapatkan endpoint resmi Neon
    const host = connectionString.split('@')[1]?.split('/')[0];
    const endpoint = `https://${host}/sql`;

    // Server-to-Server request (Aman 100% dari blokir CORS browser)
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        connectionString,
        query,
        params,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
