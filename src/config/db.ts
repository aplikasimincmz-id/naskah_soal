// src/config/db.ts

export async function queryNeon(sqlQuery: string, args: any[] = []) {
  // Menembak ke proxy lokal Vercel (Satu domain, anti-CORS, anti-mental)
  const endpoint = '/api/query';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: sqlQuery,
      params: args,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Proxy Backend Error: ${errorText}`);
  }

  const data = await response.json();
  return data.rows || [];
}
