class AppError extends Error {
  constructor(message, statuseCode) {
    super(message );
    this.statuseCode = statuseCode ; 
    this.status = `${statuseCode}`.startsWith(4) ? 'fail' : 'error' ;
  }
}

module.exports = AppError;

