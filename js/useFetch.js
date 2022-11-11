export default async function useFetch() {
  try {
    const url = 'https://api.npoint.io/657752771693b3cc98bc';
    // const url = '/data.json';
    const resp = await fetch(url);
    return await resp.json();
  } catch {
    return [];
  }
}
