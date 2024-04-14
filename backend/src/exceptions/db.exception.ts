export default class DbException extends Error {
  location: string;
  error: Error;
  constructor(message: string, location: string, error: Error) {
    super(message);
    this.name = "DbException";
    this.location = location;
    this.error = error;
  }
}
