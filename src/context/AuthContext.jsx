import React, { createContext, useContext, useState, useEffect} from "react"; 

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from 'firebase/auth'

import {auth} from "../../firebaseconfig"

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);

}

// authentication function
export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // sign up function
    async function signup(email,password){

        setError('')

        try{
            return await createUserWithEmailAndPassword(auth,email,password)
        }catch (err) {
            setError(err.message);
            throw err;
        }

    }

    // login function
    async function login(email, password) {
       setError("");

        try {

         return await signInWithEmailAndPassword(auth, email, password);

        } catch (err) {
         setError(err.message);
         throw err;
       }
    }

    // sign out from page function
    async function logout() {
        setError("");

        try {
            return await signOut(auth);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }
 
//    to keep user logged in when the web page reloads

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;

    }, []);

    // exporting all variable to be used elsewhere
    const value = {
        currentUser,
        logout,
        signup,
        login,
        error,
        loading
    }
    // component to be used in our application
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}