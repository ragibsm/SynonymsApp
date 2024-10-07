interface ISynonymsRepository {
  GetAll(word: string) : string[];
  Create(word: string, synonyms: string[]) : void;
  Append(word: string, synonyms: string[]) : void;
  Exists(word: string) : boolean;
}

export default ISynonymsRepository;