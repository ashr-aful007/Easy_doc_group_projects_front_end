import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const UserContext = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);

  // create user
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // login
  const login = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signout
  const logOut = () => {
    return signOut(auth);
  };

  // forget password
  const restorePassword = (email) => {
    setLoader(true);
    return sendPasswordResetEmail(auth, email);
  };

  // google sign in
  const googleSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  // github signup
  const githubSignUp = () =>{
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  }

  // users ofserved
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoader(false);
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    loader,
    updateUser,
    login,
    user,
    logOut,
    restorePassword,
    googleSignIn,
    githubSignUp
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
