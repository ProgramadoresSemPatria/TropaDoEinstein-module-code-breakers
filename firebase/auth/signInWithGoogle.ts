import { auth } from "../firebaseAuthConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function SignInWithGoogle() {
  let result = null,
      error = null;
  try {
    const provider = new GoogleAuthProvider();
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}