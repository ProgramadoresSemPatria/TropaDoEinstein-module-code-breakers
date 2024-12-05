import { auth } from "../firebaseAuthConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../firebaseDBConfig";
import { ref, set } from "firebase/database";

export default async function SignUp(name: string, email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);

        const userRef = ref(database, 'users/' + result.user.uid);
        await set(userRef, {
            username: name,
            email: email
        })
        
    }
    catch(e) {
        error = e;
    }

    return { result, error };
}