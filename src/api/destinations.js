// URL base dell'API per tutte le chiamate relative alle destinazioni
const API_URL = 'http://localhost:3001/destinations';

// Funzione asincrona per recuperare tutte le destinazioni, con possibilità di filtrare
export async function getAllDestinations({ search = '', category = '', minPrice = '', maxPrice = '' } = {}) {
  // Creo un oggetto URLSearchParams per costruire dinamicamente la query string
  const query = new URLSearchParams();

  // Se ci sono filtri attivi, li aggiungo alla query
  if (search) query.append('search', search);
  if (category) query.append('category', category);
  if (minPrice !== '') query.append('minPrice', minPrice);
  if (maxPrice !== '') query.append('maxPrice', maxPrice);

  // Costruisco l'URL finale con tutti i parametri
  const url = `${API_URL}?${query.toString()}`;
  // Faccio la richiesta all'API
  const res = await fetch(url);

  // Se qualcosa va storto, lancio un errore con il codice HTTP
  if (!res.ok) {
    throw new Error(`Errore nel caricamento destinazioni: ${res.status}`);
  }

  // Restituisco i dati come JSON
  return await res.json();
}

// Funzione asincrona per recuperare una singola destinazione dato l'ID
export async function getDestinationById(id) {
  // Costruisco l'URL per la singola destinazione e faccio la fetch
  const res = await fetch(`${API_URL}/${id}`);

  // Se la risposta è un 404, segnalo che la destinazione non è stata trovata
  if (res.status === 404) {
    throw new Error(`Destinazione con ID ${id} non trovata`);
  }

  // Per qualsiasi altro errore HTTP, sollevo un errore generico
  if (!res.ok) {
    throw new Error(`Errore nel recupero della destinazione (status: ${res.status})`);
  }

  // Restituisco i dati JSON della destinazione
  return await res.json();
}
