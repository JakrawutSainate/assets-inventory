import { mockUsers } from "@/lib/mockData";
import { User, UserRole } from "@/models/User";

export class AuthService {
  private currentUser: User | null = null;

  login(role: UserRole): User {
    const user = mockUsers.find((item) => item.role === role);
    if (!user) {
      throw new Error("User role not found");
    }

    this.currentUser = user;
    return user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export const authService = new AuthService();
