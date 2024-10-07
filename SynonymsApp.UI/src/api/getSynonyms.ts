async function getSynonyms(word: string, applyTransitiveRule: boolean, signal?: AbortSignal) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/synonyms/${word}?applyTransitiveRule=${applyTransitiveRule}`, { signal });

  if (!response.ok) {
    throw new Error('Failed to retrieve synonyms!');
  }

  return response.json();
}

export default getSynonyms;