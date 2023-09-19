// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { fetchUser } from "../data/container/user";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7duYju9UAyzvUjuBNOVm7KUuqmY7HtCw",
    authDomain: "twitter-auth-76375.firebaseapp.com",
    projectId: "twitter-auth-76375",
    storageBucket: "twitter-auth-76375.appspot.com",
    messagingSenderId: "543086382645",
    appId: "1:543086382645:web:93ae0aa0856878552aeb7c",
    measurementId: "G-H7J3ZD31PM"
};
const provider = new TwitterAuthProvider();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
export const getCurrentUser = auth.currentUser

export function User(dispatch) {
    onAuthStateChanged(auth, (userData) => {
        if (userData) {
            const user = {
                error: false,
                user: userData.reloadUserInfo
            }
            dispatch(fetchUser(user));
        } else {
            const error = {
                error: true,
                errorCode: 400,
                errorMessage: "User is not login",
                credential: ""
            }
            dispatch(fetchUser(error));
        }
    });
}

export async function Logout() {
    await signOut(auth);
}


export async function SingIn() {
    try {
        const user = await signInWithPopup(auth, provider);
        return {
            error: false,
            user: user.user.reloadUserInfo
        };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = TwitterAuthProvider.credentialFromError(error);
        return {
            error: true,
            errorCode: errorCode,
            errorMessage: errorMessage,
            credential: credential
        };
    }
}