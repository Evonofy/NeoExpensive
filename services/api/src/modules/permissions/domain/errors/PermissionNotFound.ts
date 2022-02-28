export class PermissionNotFound extends Error {
  public override message: string;

  constructor() {
    super();

    this.message = 'Could not find a permission with that ID.';
  }
}
