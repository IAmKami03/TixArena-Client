import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/auth";
import { getMe } from "../services/authService";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("tix_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tix_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    getMe()
      .then((freshUser) => {
        setUser(freshUser);
        localStorage.setItem("tix_user", JSON.stringify(freshUser));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("tix_user");
        localStorage.removeItem("tix_token");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("tix_user", JSON.stringify(userData));
    localStorage.setItem("tix_token", token);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("tix_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tix_user");
    localStorage.removeItem("tix_token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
