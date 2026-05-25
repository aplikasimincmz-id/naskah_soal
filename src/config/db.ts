// src/config/db.ts

export async function queryNeon(sqlQuery: string, args: any[] = []) {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Proxy Backend Error');
  }

  return data.rows || [];
}
