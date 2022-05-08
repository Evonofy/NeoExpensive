export class RoleNotFound extends Error {
  public override message: string;

  constructor() {
    super();

    this.message = 'Could not find a role with that ID.';
  }
}
