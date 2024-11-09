import { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { ProductsDAL } from '../utils/dal/products';
import { ProductId } from '../types/product';
import { toast } from 'react-hot-toast';

export function useProductAccess() {
  const { currentUser } = useAuth();
  const [activeProducts, setActiveProducts] = useState<ProductId[]>([]);
  const [waitlistedProducts, setWaitlistedProducts] = useState<ProductId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const loadAccess = async () => {
      try {
        const access = await ProductsDAL.getUserAccess(currentUser.uid);
        setActiveProducts(access.activeProducts);
        setWaitlistedProducts(access.waitlistedProducts);
      } catch (error) {
        console.error('Error loading product access:', error);
        toast.error('Failed to load product access');
      } finally {
        setLoading(false);
      }
    };

    loadAccess();
  }, [currentUser]);

  const checkAccess = async (productId: ProductId): Promise<boolean> => {
    if (!currentUser) return false;
    return ProductsDAL.checkAccess(currentUser.uid, productId);
  };

  const addToWaitlist = async (productId: ProductId): Promise<void> => {
    if (!currentUser) {
      toast.error('Please sign in to join the waitlist');
      return;
    }

    try {
      await ProductsDAL.addToWaitlist(currentUser.uid, productId);
      setWaitlistedProducts(prev => [...prev, productId]);
      toast.success('Successfully joined the waitlist');
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast.error('Failed to join waitlist');
    }
  };

  return {
    activeProducts,
    waitlistedProducts,
    loading,
    checkAccess,
    addToWaitlist,
    isActive: (productId: ProductId) => activeProducts.includes(productId),
    isWaitlisted: (productId: ProductId) => waitlistedProducts.includes(productId),
  };
} 