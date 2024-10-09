import ILogger from '../../dependencies/ILogger.js';
import ISynonymsRepository from '../../dependencies/ISynonymsRepository.js';
import SynonymsServiceValidations from './SynonymsServiceValidations.js';

class SynonymsService {

  constructor(private synonymsRepository: ISynonymsRepository, private logger: ILogger ) {}

  public Create(request: { word: string, synonyms: string[] }) {
    SynonymsServiceValidations.ValidateCreateRequest(request);

    this.logger.debug('Create new synonyms request', { request });

    const req = {
      word: request.word.toLowerCase(),
      synonyms: request.synonyms.map(s => s.toLowerCase())
    };

    if (this.synonymsRepository.Exists(req.word)) {
      this.logger.debug('Word already exists. Appending synonyms to the current entry..');
      const currentSynonyms = this.synonymsRepository.GetAll(req.word);
      this.synonymsRepository.Append(req.word, req.synonyms.filter(s => !currentSynonyms.includes(s)));
    } else {
      this.logger.debug('Word does not exist. Creating new entry..');
      this.synonymsRepository.Create(req.word, req.synonyms);
    }

    req.synonyms.forEach(synonym => {
      if (!this.synonymsRepository.Exists(synonym)) {
        this.synonymsRepository.Create(synonym, [req.word]);
      } else {
        this.synonymsRepository.Append(synonym, [req.word]);
      }
    });
    
  }

  public GetAll(word: string, applyTransitiveRule: boolean) : string[] {
    SynonymsServiceValidations.ValidateGetAllRequest(word);

    this.logger.debug(applyTransitiveRule ? 'Transitive rule should be applied' : 'Only direct synonyms should be returned');

    const queryWord = word.toLowerCase();

    if (!applyTransitiveRule) {
      return this.synonymsRepository.GetAll(queryWord);
    }

    const foundSynonyms = new Set<string>();
    const wordsToQuery = [queryWord];
    let currentWord: string | undefined;

    while(wordsToQuery.length > 0) {
      currentWord = wordsToQuery.shift();
      foundSynonyms.add(currentWord!);

      const synonyms = this.synonymsRepository.GetAll(currentWord!);

      synonyms.forEach((synonym: string) => {
        if (!foundSynonyms.has(synonym)) {
          wordsToQuery.push(synonym);
        }
      });
    }

    return Array.from(foundSynonyms).slice(1);
  }
}

export default SynonymsService;