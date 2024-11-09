export type RouteState = {
  currentState: string;
  allowedTransitions: string[];
  timestamp: Date;
  metadata?: Record<string, any>;
};

export type UserRouteHistory = {
  states: RouteState[];
  currentStateIndex: number;
};

export interface ProtectedRouteConfig {
  path: string;
  requireAuth: boolean;
  allowedPreviousStates?: string[];
  stateName: string;
  metadata?: Record<string, any>;
} 