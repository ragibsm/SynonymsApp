class ValidationError extends Error {
  constructor(message: string, private details: string[]){
    super(message);
  }

  get Details() {
    return this.details;
  }
}

export default ValidationError;