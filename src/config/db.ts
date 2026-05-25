// src/config/db.ts

export async function queryNeon(sqlQuery: string, args: any[] = []) {
  // Menembak ke proxy backend Vercel milik kita sendiri (Satu domain, jadi ANTI-CORS)
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
  
  // Mengembalikan baris data hasil query
  return data.rows || [];
}
