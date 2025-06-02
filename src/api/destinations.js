const API_URL = 'http://localhost:3001/destinations';

export async function getAllDestinations({ search = '', category = '', minPrice = '', maxPrice = '' } = {}) {
  const query = new URLSearchParams();

  if (search) query.append('search', search);
  if (category) query.append('category', category);
  if (minPrice !== '') query.append('minPrice', minPrice);
  if (maxPrice !== '') query.append('maxPrice', maxPrice);

  const url = `${API_URL}?${query.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Errore nel caricamento destinazioni: ${res.status}`);
  }

  return await res.json();
}

export async function getDestinationById(id) {
  const res = await fetch(`${API_URL}/${id}`);

  if (res.status === 404) {
    throw new Error(`Destinazione con ID ${id} non trovata`);
  }

  if (!res.ok) {
    throw new Error(`Errore nel recupero della destinazione (status: ${res.status})`);
  }

 return await res.json();
}
 
