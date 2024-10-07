import ILogger from '../../dependencies/ILogger.js';
import ISynonymsRepository from '../../dependencies/ISynonymsRepository.js';
import SynonymsServiceValidations from './SynonymsServiceValidations.js';

class SynonymsService {

  constructor(private synonymsRepository: ISynonymsRepository, private logger: ILogger ) {}

  public Create(request: { word: string, synonyms: string[] }) {
    SynonymsServiceValidations.ValidateCreateRequest(request);

    this.logger.debug('Create new synonyms request', { request });

    if (this.synonymsRepository.Exists(request.word)) {
      this.logger.debug('Word already exists. Appending synonyms to the current entry..');
      const currentSynonyms = this.synonymsRepository.GetAll(request.word);
      this.synonymsRepository.Append(request.word, request.synonyms.filter(s => !currentSynonyms.includes(s)));
    } else {
      this.logger.debug('Word does not exist. Creating new entry..');
      this.synonymsRepository.Create(request.word, request.synonyms);
    }

    request.synonyms.forEach(synonym => {
      if (!this.synonymsRepository.Exists(synonym)) {
        this.synonymsRepository.Create(synonym, [request.word]);
      } else {
        this.synonymsRepository.Append(synonym, [request.word]);
      }
    });
    
  }

  public GetAll(word: string, applyTransitiveRule: boolean) : string[] {
    SynonymsServiceValidations.ValidateGetAllRequest(word);

    this.logger.debug(applyTransitiveRule ? 'Transitive rule should be applied' : 'Only direct synonyms should be returned');

    if (!applyTransitiveRule) {
      return this.synonymsRepository.GetAll(word);
    }

    const foundSynonyms = new Set<string>();
    const wordsToQuery = [word];
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