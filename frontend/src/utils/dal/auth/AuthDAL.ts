import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { firebaseConfig } from '../../../config/firebase';
import { userDAL } from '../user/UserDAL';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export class AuthDAL {

  private userDAL = userDAL;

  async getCurrentUser(): Promise<FirebaseUser | null> {
    return auth.currentUser;
  }

  async signIn(email: string, password: string): Promise<FirebaseUser> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  private async newUser(user: FirebaseUser) {
    await this.userDAL.createUser({
      id: user.uid,
      email: user.email || '',
      profile: {
        full_name: user.displayName || '',
        photo_url: user.photoURL || ''
      }
    });
  }

  async signInWithGoogle(): Promise<FirebaseUser> {
    const result = await signInWithPopup(auth, googleProvider);
    const user = await this.userDAL.getUser(result.user.uid);
    if (!user) {
      await this.newUser(result.user);
    }
    return result.user;
  }

  async signUp(
    email: string, 
    password: string, 
    displayName: string
  ): Promise<FirebaseUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    await this.newUser(userCredential.user);
    return userCredential.user;
  }

  async signOut(): Promise<void> {
    await signOut(auth);
  }

  onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  async updateProfile(user: FirebaseUser, updates: {
    displayName?: string | null;
    photoURL?: string | null;
  }): Promise<void> {
    await updateProfile(user, updates);
  }
}

export const authDAL = new AuthDAL();
export { auth }; 