import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ROUTE_STATE_CONFIG } from '../../constants/routes';

interface RouteState {
  currentState: keyof typeof ROUTE_STATE_CONFIG;
  lastTransition: Date;
  path: string;
}

export class RouteStateManager {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getCurrentState(): Promise<RouteState | null> {
    const docRef = doc(db, 'users', this.userId, 'state', 'route');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as RouteState : null;
  }

  async canTransitionTo(newState: keyof typeof ROUTE_STATE_CONFIG): Promise<boolean> {
    const currentState = await this.getCurrentState();
    
    if (!currentState) return true;
    
    const config = ROUTE_STATE_CONFIG[currentState.currentState];
    return config.allowedTransitions.includes(newState as never);
  }

  async transitionTo(newState: keyof typeof ROUTE_STATE_CONFIG, metadata: Record<string, unknown> = {}) {
    const docRef = doc(db, 'users', this.userId, 'state', 'route');
    await setDoc(docRef, {
      currentState: newState,
      lastTransition: new Date(),
      ...metadata
    });
  }
} 