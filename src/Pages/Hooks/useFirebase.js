import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, getIdToken } from "firebase/auth";
import initializeFirebase from '../Login/Firebase/firebase.init';
import Swal from 'sweetalert2';

// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);
                // save user to the database 
                saveUser(email, name, 'POST');
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                    })
                });
                history.replace('/');
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);

            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })

            })
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                // save user to the database 
                saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                history.replace(destination);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })
            }).finally(() => setIsLoading(false));
    }

    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    useEffect(() => {
        fetch(`https://gentle-fortress-91581.herokuapp.com/user/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
            .catch(error => {

            })
    }, [user.email])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
            })
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {

        const user = { email, displayName };
        fetch('https://gentle-fortress-91581.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then()
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })
            })

    }

    return {
        user,
        isLoading,
        token,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        admin
    }
}

export default useFirebase;