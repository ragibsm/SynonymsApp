import Joi from 'joi';
import ValidationError from '../../util/ValidationError.js';

class SynonymsServiceValidations {
  public static ValidateCreateRequest(request: { word: string, synonyms: string[] }) {
    const schema = Joi.object({
      word: Joi.string().not().empty().regex(/^[a-z0-9]+$/i).required(),
      synonyms: Joi.array().items(Joi.string().not().empty().regex(/^[a-z0-9]+$/i)).min(1).required(),
    }).required();

    const validationResult = schema.validate(request, { abortEarly: false })

    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message, validationResult.error.details.map(d => d.message));
    }
  }

  public static ValidateGetAllRequest(word: string) {
    const schema = Joi.string().not().empty().regex(/^[a-z0-9]+$/i).required();

    const validationResult = schema.validate(word)

    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message, validationResult.error.details.map(d => d.message));
    }
  }

}

export default SynonymsServiceValidations;