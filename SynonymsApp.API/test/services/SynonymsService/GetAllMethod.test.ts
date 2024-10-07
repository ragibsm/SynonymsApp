import assert from 'assert/strict';
import { describe, afterEach, beforeEach, it} from 'node:test';
import sinon, { SinonStub } from 'sinon';

import SynonymsService from '../../../src/core/services/SynonymsService/SynonymsService.js';
import createDependencies from '../../setup.js';
import ValidationError from '../../../src/core/util/ValidationError.js';


describe('Synonyms service GetAll method tests', async () => {
  let appDependencies = createDependencies();
  let synonymsRepoGetAllCall: SinonStub<[string], string[]>;
  let synonymsService: SynonymsService;

  beforeEach(() => {
    appDependencies = createDependencies();
    synonymsRepoGetAllCall = sinon.stub(appDependencies.synonymsRepository, 'GetAll');
    synonymsService = new SynonymsService(appDependencies.synonymsRepository, appDependencies.logger);
  });

  afterEach(() => {
    synonymsRepoGetAllCall.restore();
  });

  it('should successfully get direct synonyms when applyTransitiveRule flag is false', () => {
    //Prepare
    const queryWord = 'clean';
    const applyTransitiveRule = false;
    const resultSynonyms = ['tidy', 'pure'];
    synonymsRepoGetAllCall.returns(resultSynonyms);

    //Act
    const result = synonymsService.GetAll(queryWord, applyTransitiveRule);

    //Assert
    assert.ok(synonymsRepoGetAllCall.calledOnceWith(queryWord), `GetAll method of the repository was not called with "${queryWord}"`);
    assert.deepEqual(result, resultSynonyms, 'Result is not correct');
  });

  it('should successfully get direct and transitive synonyms when applyTransitiveRule flag is true', () => {
    //Prepare
    const applyTransitiveRule = true;
    const synonymsMap = {
      clean: ['tidy', 'pure'],
      tidy: ['neat'],
      pure: ['refined']
    };
    synonymsRepoGetAllCall.callsFake(w => synonymsMap[w] ?? []);
    const resultSynonyms = [...synonymsMap.clean, ...synonymsMap.tidy, ...synonymsMap.pure];
    
    //Act
    const result = synonymsService.GetAll('clean', applyTransitiveRule);

    //Assert
    resultSynonyms.forEach(s => assert.ok(synonymsRepoGetAllCall.calledWith(s), `GetAll method of the repository was not called with "${s}"`));
    assert.deepEqual(result, resultSynonyms, 'Result is not correct');
  });

  it('should throw validation error if word is not valid', () => {
    //Prepare
    const applyTransitiveRule = true;  
    const queryWord = '';

    //Act
    let error!: ValidationError;
    try {
      synonymsService.GetAll(queryWord, applyTransitiveRule);
    } catch (err) {
      error = err;
    }

    //Assert
    assert.ok(synonymsRepoGetAllCall.notCalled, `GetAll method of the repository was called`);
    assert.notEqual(error, undefined, 'Validation error is undefined');
    assert.deepEqual(error.Details, ['"value" is not allowed to be empty'], 'Error does not have required message');
  });
}); 

