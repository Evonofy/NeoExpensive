export class AppNotFound extends Error {
  public override message: string;

  constructor() {
    super();

    this.message = 'Could not find an app with that ID.';
  }
}
