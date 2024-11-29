import { AuthDAL } from './auth/AuthDAL';
import { EntityDAL } from './entity/EntityDAL';
import { FormDAL } from './form/FormDAL';
import { UserDAL } from './user/UserDAL';

export class CatalyzatorDAL {
  private static instance: CatalyzatorDAL;
  
  readonly auth: AuthDAL;
  readonly user: UserDAL;
  readonly entities: EntityDAL;
  readonly forms: FormDAL;

  private constructor() {
    // Initialize services with singleton instances
    this.auth = new AuthDAL();
    this.entities = new EntityDAL();
    this.forms = new FormDAL();
    this.user = new UserDAL();
  }

  static getInstance(): CatalyzatorDAL {
    if (!CatalyzatorDAL.instance) {
      CatalyzatorDAL.instance = new CatalyzatorDAL();
    }
    return CatalyzatorDAL.instance;
  }
}

// Export singleton instance
export const dal = CatalyzatorDAL.getInstance();