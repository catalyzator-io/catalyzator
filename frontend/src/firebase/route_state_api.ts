import { 
  doc, 
  getDoc, 
  setDoc, 
} from 'firebase/firestore';
import db from './firebase';
import type { RouteState, UserRouteHistory } from '../types/routing';
import { ROUTE_STATE_CONFIG } from '../data/constants';

export class RouteStateManager {
  private readonly userRouteStateRef;

  constructor(userId: string) {
    this.userRouteStateRef = doc(db, 'users', userId, 'metadata', 'route_state');
  }

  async getCurrentState(): Promise<RouteState | null> {
    try {
      const stateDoc = await getDoc(this.userRouteStateRef);
      if (!stateDoc.exists()) return null;
      
      const data = stateDoc.data() as UserRouteHistory;
      return data.states[data.currentStateIndex];
    } catch (error) {
      console.error('Error getting current state:', error);
      throw error;
    }
  }

  async getStateHistory(): Promise<UserRouteHistory> {
    try {
      const stateDoc = await getDoc(this.userRouteStateRef);
      if (!stateDoc.exists()) {
        return { states: [], currentStateIndex: -1 };
      }
      return stateDoc.data() as UserRouteHistory;
    } catch (error) {
      console.error('Error getting state history:', error);
      throw error;
    }
  }

  async transitionTo(newState: string, metadata?: Record<string, any>): Promise<void> {
    try {
      const currentHistory = await this.getStateHistory();
      const newStateObj: RouteState = {
        currentState: newState,
        allowedTransitions: [], // Will be computed based on ROUTE_STATE_CONFIG
        timestamp: new Date(),
        metadata
      };

      const updatedHistory: UserRouteHistory = {
        states: [...currentHistory.states, newStateObj],
        currentStateIndex: currentHistory.states.length
      };

      await setDoc(this.userRouteStateRef, updatedHistory);
    } catch (error) {
      console.error('Error transitioning state:', error);
      throw error;
    }
  }

  async canTransitionTo(targetState: string): Promise<boolean> {
    try {
      const currentState = await this.getCurrentState();
      if (!currentState) return true; // First state is always allowed

      const targetConfig = ROUTE_STATE_CONFIG[targetState];
      if (!targetConfig) return false;

      // If allowed from anywhere
      if (targetConfig.allowedPreviousStates?.includes('*')) return true;

      // Check if current state is in allowed previous states
      return targetConfig.allowedPreviousStates?.includes(currentState.currentState) ?? false;
    } catch (error) {
      console.error('Error checking transition:', error);
      throw error;
    }
  }
} 