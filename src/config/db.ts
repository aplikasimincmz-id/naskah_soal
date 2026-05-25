export async function queryNeon(
  sqlQuery: string,
  args: any[] = []
) {
  try {
    const response = await fetch('/api/query', {
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
      throw new Error(
        data.error || 'Gagal mengambil data database'
      );
    }

    return data.rows || [];
  } catch (error: any) {
    console.error('Database Error:', error);

    throw new Error(
      error.message ||
        'Koneksi database gagal'
    );
  }
}
