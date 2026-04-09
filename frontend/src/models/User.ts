export interface User {
  id: string;
  name: string;
  role: "admin" | "user";
  email: string;
  avatarUrl: string;
}
