import assert from 'assert/strict';
import { describe, afterEach, beforeEach, it} from 'node:test';
import sinon, { SinonStub } from 'sinon';

import SynonymsService from '../../../src/core/services/SynonymsService/SynonymsService.js';
import createDependencies from '../../setup.js';
import ValidationError from '../../../src/core/util/ValidationError.js';


describe('Synonyms service Create method tests', async () => {
  let appDependencies = createDependencies();
  let synonymsRepoExistCall: SinonStub<[string], boolean>;
  let synonymsRepoCreateCall: SinonStub<[string, string[]], void>;
  let synonymsRepoAppendCall: SinonStub<[string, string[]], void>;
  let synonymsService: SynonymsService;

  beforeEach(() => {
    appDependencies = createDependencies();
    synonymsRepoExistCall = sinon.stub(appDependencies.synonymsRepository, 'Exists');
    synonymsRepoCreateCall = sinon.stub(appDependencies.synonymsRepository, 'Create').returns();
    synonymsRepoAppendCall = sinon.stub(appDependencies.synonymsRepository, 'Append').returns();
    synonymsService = new SynonymsService(appDependencies.synonymsRepository, appDependencies.logger);
  });

  afterEach(() => {
    synonymsRepoExistCall.restore();
    synonymsRepoCreateCall.restore();
    synonymsRepoAppendCall.restore();
  });

  it('should successfully create new synonyms when the word does not already exist', () => {
    //Prepare
    synonymsRepoExistCall.returns(false);

    const request = {
      word: 'clean',
      synonyms: ['tidy', 'pure']
    };

    //Act
    synonymsService.Create(request);

    //Assert
    assert.ok(synonymsRepoExistCall.calledWith(request.word), `Exist method of the repository was not called for "${request.word}"`);
    assert.ok(synonymsRepoCreateCall.calledWith(request.word, request.synonyms), `Create method of the repository was not called for "${request.word}" with synonyms "${request.synonyms.join()}"`);

    assert.ok(synonymsRepoExistCall.calledWith(request.synonyms[0]), `Exist method of the repository was not called for "${request.synonyms[0]}"`);
    assert.ok(synonymsRepoCreateCall.calledWith(request.synonyms[0], [request.word]), `Create method of the repository was not called once for "${request.synonyms[0]}" with synonyms "${request.word}"`);

    assert.ok(synonymsRepoExistCall.calledWith(request.synonyms[1]), `Exist method of the repository was not called for "${request.synonyms[1]}"`);
    assert.ok(synonymsRepoCreateCall.calledWith(request.synonyms[1], [request.word]), `Create method of the repository was not called once for "${request.synonyms[1]}" with synonyms "${request.word}"`);
  });

  it('should successfully create new synonyms when the word already exists', () => {
    //Prepare
    synonymsRepoExistCall.callsFake(word => word === 'tidy');

    const request = {
      word: 'tidy',
      synonyms: ['neat']
    };
  
    //Act
    synonymsService.Create(request);
  
    //Assert
    assert.ok(synonymsRepoExistCall.calledWith(request.word), `Exist method of the repository was not called for "${request.word}"`);
    assert.ok(synonymsRepoAppendCall.calledOnceWith(request.word, request.synonyms), `Append method of the repository was not called for "${request.word}" with synonyms "${request.synonyms.join()}"`);
  
    assert.ok(synonymsRepoExistCall.calledWith(request.synonyms[0]), `Exist method of the repository was not called for "${request.synonyms[0]}"`);
    assert.ok(synonymsRepoCreateCall.calledOnceWith(request.synonyms[0], [request.word]), `Create method of the repository was not called once for "${request.synonyms[0]}" with synonyms "${request.word}"`);
  });

  it('should successfully create new synonyms when the word does not already exist but some of the synonyms do', () => {
    //Prepare
    synonymsRepoExistCall.callsFake(word => word === 'pure');
    
    const request = {
      word: 'clean',
      synonyms: ['tidy', 'pure']
    };

    //Act
    synonymsService.Create(request);
  
    //Assert
    assert.ok(synonymsRepoExistCall.calledWith(request.word), `Exist method of the repository was not called for "${request.word}"`);
    assert.ok(synonymsRepoCreateCall.calledWith(request.word, request.synonyms), `Create method of the repository was not called for "${request.word}" with synonyms "${request.synonyms.join()}"`);
  
    assert.ok(synonymsRepoExistCall.calledWith(request.synonyms[0]), `Exist method of the repository was not called for "${request.synonyms[0]}"`);
    assert.ok(synonymsRepoCreateCall.calledWith(request.synonyms[0], [request.word]), `Create method of the repository was not called once for "${request.synonyms[0]}" with synonyms "${request.word}"`);

    assert.ok(synonymsRepoExistCall.calledWith(request.synonyms[1]), `Exist method of the repository was not called for "${request.synonyms[1]}"`);
    assert.ok(synonymsRepoAppendCall.calledOnceWith(request.synonyms[1], [request.word]), `Append method of the repository was not called once for "${request.synonyms[1]}" with synonyms "${request.word}"`);
  });

  it('should throw validation error on create new synonyms when the word is not valid', () => {
    //Prepare    
    const request = {
      word: '',
      synonyms: ['tidy', 'pure']
    };

    //Act
    let error!: ValidationError;
    try {
      synonymsService.Create(request);
    } catch (err) {
      error = err;
    }

    //Assert
    assert.ok(synonymsRepoExistCall.notCalled, `Exist method of the repository was called`);
    assert.ok(synonymsRepoCreateCall.notCalled, `Create method of the repository was called`);
    assert.ok(synonymsRepoAppendCall.notCalled, `Append method of the repository was called`);
    assert.notEqual(error, undefined, 'Validation error is undefined');
    assert.deepEqual(error.Details, ['"word" is not allowed to be empty'], 'Error does not have required message');
  });
}); 

