export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly role: string,
    public readonly department: string,
    public readonly avatarUrl: string,
  ) {}
}
