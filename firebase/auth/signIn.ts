import { auth } from "../firebaseAuthConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function SignIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    }
    catch(Error) {
        error = Error;
    }

    return { result, error };
}