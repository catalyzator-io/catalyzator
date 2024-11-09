import { 
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp
} from 'firebase/firestore';
import db from '../../firebase/firebase';
import { ProductId } from '../../types/product';

export class ProductsDAL {
  private static getUserProductsDoc(userId: string) {
    return doc(db, 'users', userId, 'metadata', 'products');
  }

  static async initializeUserProducts(userId: string): Promise<void> {
    const productsDoc = this.getUserProductsDoc(userId);
    await setDoc(productsDoc, {
      activeProducts: [],
      waitlistedProducts: [],
      lastUpdated: Timestamp.now()
    }, { merge: true });
  }

  static async getUserAccess(userId: string): Promise<{
    activeProducts: ProductId[];
    waitlistedProducts: ProductId[];
  }> {
    const productsDoc = await getDoc(this.getUserProductsDoc(userId));
    
    if (!productsDoc.exists()) {
      await this.initializeUserProducts(userId);
      return { activeProducts: [], waitlistedProducts: [] };
    }

    const data = productsDoc.data();
    return {
      activeProducts: data.activeProducts || [],
      waitlistedProducts: data.waitlistedProducts || []
    };
  }

  static async addToWaitlist(
    userId: string, 
    productId: ProductId
  ): Promise<void> {
    const productsDoc = this.getUserProductsDoc(userId);
    
    await updateDoc(productsDoc, {
      waitlistedProducts: arrayUnion(productId),
      lastUpdated: Timestamp.now(),
      [`waitlistDates.${productId}`]: Timestamp.now()
    });
  }

  static async removeFromWaitlist(
    userId: string, 
    productId: ProductId
  ): Promise<void> {
    const productsDoc = this.getUserProductsDoc(userId);
    
    await updateDoc(productsDoc, {
      waitlistedProducts: arrayRemove(productId),
      lastUpdated: Timestamp.now(),
      [`waitlistDates.${productId}`]: null
    });
  }

  static async activateProduct(
    userId: string, 
    productId: ProductId
  ): Promise<void> {
    const productsDoc = this.getUserProductsDoc(userId);
    
    await updateDoc(productsDoc, {
      activeProducts: arrayUnion(productId),
      waitlistedProducts: arrayRemove(productId),
      lastUpdated: Timestamp.now(),
      [`activationDates.${productId}`]: Timestamp.now()
    });
  }

  static async deactivateProduct(
    userId: string, 
    productId: ProductId
  ): Promise<void> {
    const productsDoc = this.getUserProductsDoc(userId);
    
    await updateDoc(productsDoc, {
      activeProducts: arrayRemove(productId),
      lastUpdated: Timestamp.now(),
      [`activationDates.${productId}`]: null
    });
  }

  static async checkAccess(
    userId: string, 
    productId: ProductId
  ): Promise<boolean> {
    const { activeProducts } = await this.getUserAccess(userId);
    return activeProducts.includes(productId);
  }
} 