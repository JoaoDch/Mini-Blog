import {db, auth} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // clean up
    // deal with memory leak

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth();

    function checkIfIsCancelled () {
        if(cancelled) {
            return;
        }
    }

    const createUser = async(data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            
            const {user} = await createUserWithEmailAndPassword (
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false)

            return user;

        } catch (error) {
            
            console.log(error.message)
            console.log(typeof error.message);

            let systemErrorMessage 
            if(error.message.includes('Password')) {
                systemErrorMessage = 'the password must contain at least 6 characters.'
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = 'email already registered'
            } else {
                systemErrorMessage = 'a error hapened, please try again later'
            }

            setLoading(false)
            setError(systemErrorMessage);

        }
    };

    //log out
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

   //login
   
   const login = async(data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false)

    try {

        await signInWithEmailAndPassword(auth, data.email, data.password);
        setLoading(false)

    } catch (error){

        let systemErrorMessage;
        console.log(error)
        if(error.message.includes('auth/user-not-found')) {
            systemErrorMessage = 'there is no user record corresponding to this identifier. the user may have been deleted.'
        } else if (error.message.includes('invalid-credential')){
            systemErrorMessage = 'there is no user record corresponding to this identifier. the password may have been incorrect.'
        } else {
            systemErrorMessage = 'a error hapened, please try again later.'
        }
        setError(systemErrorMessage);
        setLoading(false)   
    }
   }
    useEffect (() => {
        return () => setCancelled(true)
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
};