import { User } from "@/models/User";

export class AuthService {
  private static readonly admin = new User(
    "admin-1",
    "Alex Custodian",
    "Root Access",
    "System Custodian",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA7QOF5vjwNU_WpTRwYX09RHJf0fzli7F6hb-tes9RbiF6IauZFOxd0S4Ca4SM4e_zI6YyqtmkVbH2vSdvYkcQHisz2EYZqP3i6P2dle8VEDn0cOJSJ6Xwm6PZeh9kk9zgsPWQMsfkKLa3FdBzE9Nf_8EsA-XTQUC3z8i4mmPdziO3YRWCZAT7JAe5k5e6HIo6LzI58JCIGkWLejPENIwtPkHvAKq2DLJ-bLnDhMwWEe69u6XifhTYbcAWddxsKvP2DJBEbTdr_gq4",
  );

  static async getCurrentUser(): Promise<User> {
    return Promise.resolve(this.admin);
  }
}
