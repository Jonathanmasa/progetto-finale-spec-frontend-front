const API_URL = 'http://localhost:3001/destinations';

export async function getAllDestinations({ search = '', category = '' } = {}) {
  const query = new URLSearchParams();
  if (search) query.append('search', search);
  if (category) query.append('category', category);

  const res = await fetch(`${API_URL}?${query.toString()}`);
  return await res.json();
}

export async function getDestinationById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}
