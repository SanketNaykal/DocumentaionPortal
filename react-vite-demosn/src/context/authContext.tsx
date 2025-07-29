import axios, { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';


// Define the shape of the AuthContext
interface AuthContextProps {
    currentUser: User | null;
    err: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    login: (inputs: LoginInputs) => Promise<boolean>;
    logout: () => Promise<void>;
}
// Define the shape of the user object
interface User {
    id: number;
    username: string;
    email: string;
}

// Define the shape of the login inputs
interface LoginInputs {
    email: string;
    password: string;
}
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
// Define the props for the AuthContextProvider
interface AuthContextProviderProps {
    children: React.ReactNode;
}
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<User | null>(JSON.parse(localStorage.getItem("user") || "null"));
    const [err, setError] = useState<string | null>(null);
    // Login function
    const login = async (inputs: LoginInputs) => {
        try {
            const res = await axios.post("/api/auths/login", inputs, { withCredentials: true });
            setCurrentUser(res.data); // Set the current user with the response data
            setError(null) // Clear any previous error message
            //navigate("/admin_panel"); // Redirect to the login page after successful registration
            return true;
        } catch (err) {
            console.error("Login failed:", err);
            const error = err as AxiosError<{ message: string }>;
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("An unknown error occurred.");
                //await logout(); // Logout if an error occurs
            }
            return false;
        }
    };
    // Logout function 
    const logout = async () => {
        try {
            await axios.post("/api/auths/logout", {}, { withCredentials: true });
            setCurrentUser(null); // Clear the current user
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout,err, setError }}>
            {children}
        </AuthContext.Provider>
    );
};  