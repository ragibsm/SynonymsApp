import ISynonymsRepository from '../../core/dependencies/ISynonymsRepository.js';

class SynonymsRepository implements ISynonymsRepository {

  private synonymsDictionary: Map<string, string[]>;

  constructor() {
    this.synonymsDictionary = new Map();
  }


  GetAll(word: string) {
    const synonyms = this.synonymsDictionary.get(word);

    return synonyms ?? [];
  }

  Create(word: string, synonyms: string[]) {
    this.synonymsDictionary.set(word, synonyms);
  }

  Append(word: string, synonyms: string[]) {
    const currentSynonyms = this.synonymsDictionary.get(word);
    
    if (!currentSynonyms) {
      throw new Error('Synonyms not found for a given word');
    }

    currentSynonyms.push(...synonyms);
  }

  Exists(word: string) {
    return this.synonymsDictionary.has(word);
  }
}

export default SynonymsRepository;