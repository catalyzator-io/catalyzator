export interface AccessState {
  currentProduct?: string;
  allowedProducts: string[];
  waitlistedProducts: string[];
}

export interface AccessTransition {
  from: string;
  to: string;
  conditions?: (state: AccessState) => boolean;
}

export interface AccessRule {
  productId: string;
  requiredProducts?: string[];
  blockedProducts?: string[];
  customCheck?: (state: AccessState) => boolean;
} 