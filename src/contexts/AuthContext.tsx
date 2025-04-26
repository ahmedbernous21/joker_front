import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import HttpClient from "../httpClient";
import { toast } from "react-hot-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");

    setIsAuthenticated(!!token);
    setIsAdmin(userType === "admin");
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await HttpClient.post("auth/login/", {
        email,
        password,
      });

      if (response && response.key) {
        // Store the authentication token
        localStorage.setItem("token", response.key);

        // For simplicity, we'll assume all authenticated users are admins
        // In a real app, you'd check user roles from the response
        localStorage.setItem("user_type", "admin");

        setIsAuthenticated(true);
        setIsAdmin(true);

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
      setIsAdmin(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (isAuthenticated) {
        await HttpClient.post("auth/logout/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
      setIsAuthenticated(false);
      setIsAdmin(false);
      navigate("/");
      toast.success("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
