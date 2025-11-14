const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const getAll = async () => {
  let allCharacters = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore && page <= 3) { 
    const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    
    const data = await response.json();
    allCharacters = [...allCharacters, ...data.results];
    
    hasMore = data.info.next !== null;
    page++;
  }
  
  return allCharacters;
};

export const getById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Character not found');
    }
    throw new Error('Failed to fetch character');
  }
  
  const data = await response.json();
  return data;
};

export const searchByName = async (name) => {
  const response = await fetch(`${API_BASE_URL}/character/?name=${name}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      return []; 
    }
    throw new Error('Failed to search characters');
  }
  
  const data = await response.json();
  return data.results;
};
