export default async function useFetch() {
  try {
    const resp = await fetch('/assets/db/db.json');
    return await resp.json();
  } catch {
    return [];
  }
}
