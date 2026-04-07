export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export class User {
  constructor(
    public id: string,
    public name: string,
    public role: UserRole,
  ) {}
}
