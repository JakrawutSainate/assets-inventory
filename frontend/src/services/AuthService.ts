import type { User } from "@/models/User";

const mockAdminUser: User = {
  id: "user-admin-001",
  name: "Alex Custodian",
  role: "admin",
  email: "admin@fluid-custodian.com",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA7QOF5vjwNU_WpTRwYX09RHJf0fzli7F6hb-tes9RbiF6IauZFOxd0S4Ca4SM4e_zI6YyqtmkVbH2vSdvYkcQHisz2EYZqP3i6P2dle8VEDn0cOJSJ6Xwm6PZeh9kk9zgsPWQMsfkKLa3FdBzE9Nf_8EsA-XTQUC3z8i4mmPdziO3YRWCZAT7JAe5k5e6HIo6LzI58JCIGkWLejPENIwtPkHvAKq2DLJ-bLnDhMwWEe69u6XifhTYbcAWddxsKvP2DJBEbTdr_gq4",
};

const mockUser: User = {
  id: "user-001",
  name: "Alex Sterling",
  role: "user",
  email: "alex@fluid-custodian.com",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuANW6J1h5DZfbc4QbKu7FWf-vncgYL3FZ8ezKXTe7TkjnwyJkVbMnYI8McwznGbBkyBe7IbJPN_CvE0CeekImLkRCiGFo5Ni8ZZSxM_tDH3Gd3Y_dTdNc28rBDZf5lmSc8Nh5fXSXHHV2F9FVYv-jjEBTyabGvdvVLcTfGzMFpTH5mqarFL6cflxlcpMrs-FzpG2dlSKydep-IQAwcizGEHqLKe9Eff8GwtjH0DhnnTlpGcFN8wKt_So6jirS-A-mTP8XF3VUvtJik",
};

export class AuthService {
  static async getCurrentUser(): Promise<User> {
    return mockUser;
  }

  static async getAdminUser(): Promise<User> {
    return mockAdminUser;
  }
}
