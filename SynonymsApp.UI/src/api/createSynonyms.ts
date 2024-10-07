async function createSynonyms (data: { word: string; synonyms: string[]; }) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/synonyms`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to create synonyms!');
  }
}

export default createSynonyms;