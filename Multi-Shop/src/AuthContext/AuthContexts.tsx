import React, { createContext, useState, ReactNode, useContext,useEffect } from "react";
import { auth, db } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User,signOut,setPersistence,browserLocalPersistence,onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


type AuthContextType = {
  user: User | null;
  signIn: (userName: string, email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  loading: boolean;
  logOut : () => Promise<void>
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signIn = async (userName: string, email: string, password: string) => {
    setLoading(true); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);

      // Create a document for the user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        userName,
        email,
      });

      // Show success message
      toast.success("Sign-up successful! Welcome!");
      navigate('/home');

    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  const logIn = async (email: string, password: string) => {
    setLoading(true); 
    try {
      console.log("Attempting login with", { email, password });
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
  
      toast.success("Login successful!");
      navigate('/');
    } catch (error: any) {
      console.error("Login error:", error); // Log the full error for detailed debugging
      console.log("firebase err",error.code);
  
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false); 
    }
  };
  

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null); 
      toast.success("Logged out successfully!");
      navigate('/login');
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-credential":
        return "Invalid credentials. Please check your email and password.";
        case "":
        return "Password is too weak. Please choose a stronger one.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
    
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logIn, loading,logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
