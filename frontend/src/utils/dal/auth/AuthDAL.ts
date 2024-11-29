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
import { UserDAL } from '../user/UserDAL';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export class AuthDAL {
  private userDAL: UserDAL;

  constructor() {
    this.userDAL = new UserDAL();
  }

  async getCurrentUser(): Promise<FirebaseUser | null> {
    return auth.currentUser;
  }

  async signIn(email: string, password: string): Promise<FirebaseUser> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async signInWithGoogle(): Promise<FirebaseUser> {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Create user collection after Google SSO
    await this.userDAL.createUser({
      id: result.user.uid,
      email: result.user.email!,
      profile: {
        full_name: result.user.displayName || '',
        phone: result.user.phoneNumber || '',
        description: '',
        primary_entity_type: 'user',
        photo_url: result.user.photoURL || ''
      },
      hasAcceptedTerms: false   
    });

    return result.user;
  }

  async signUp(
    email: string, 
    password: string, 
    displayName: string
  ): Promise<FirebaseUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Create user collection after regular signup
    await this.userDAL.createUser({
      id: userCredential.user.uid,
      email: email,
      profile: {
        full_name: displayName,
        phone: '',
        description: '',
        primary_entity_type: 'user',
        photo_url: ''
      },
      hasAcceptedTerms: false
    });

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