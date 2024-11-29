import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { ProductId, ProductFeatureId, ProductAccessMap } from '../types/product';
import { toast } from 'react-hot-toast';
import { dal } from '../utils/dal/dal';

export function useProductAccess() {
  const { currentUser } = useAuth();
  const [productAccess, setProductAccess] = useState<ProductAccessMap | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user's product access
  useEffect(() => {
    if (!currentUser) {
      setProductAccess(null);
      setLoading(false);
      return;
    }

    const loadAccess = async () => {
      try {
        const user = await dal.user.getUser(currentUser.uid);
        if (user) {
          setProductAccess(user.product_access);
        }
      } catch (error) {
        console.error('Error loading product access:', error);
        toast.error('Failed to load product access');
      } finally {
        setLoading(false);
      }
    };

    loadAccess();
  }, [currentUser]);

  // Check if user has access to a specific product
  const hasProductAccess = useCallback((productId: ProductId): boolean => {
    return !!productAccess?.[productId]?.is_active;
  }, [productAccess]);

  // Check if user has access to a specific feature
  const hasFeatureAccess = useCallback((
    productId: ProductId, 
    featureId: ProductFeatureId
  ): boolean => {
    return !!productAccess?.[productId]?.features_access?.[featureId]?.is_active;
  }, [productAccess]);

  // Grant access to a feature
  const grantFeatureAccess = useCallback(async (
    productId: ProductId,
    featureId: ProductFeatureId
  ): Promise<void> => {
    if (!currentUser) {
      toast.error('Please sign in to access this feature');
      return;
    }

    try {
      await dal.user.grantFeatureAccess(currentUser.uid, productId, featureId);
      
      // Update local state
      setProductAccess(prev => {
        if (!prev) return prev;
        
        const currentAccess = prev[productId] || {
          is_active: true,
          activated_at: new Date(),
          features_access: {}
        };

        return {
          ...prev,
          [productId]: {
            ...currentAccess,
            features_access: {
              ...currentAccess.features_access,
              [featureId]: {
                is_active: true,
                activated_at: new Date()
              }
            }
          }
        };
      });

      toast.success('Access granted successfully');
    } catch (error) {
      console.error('Error granting feature access:', error);
      toast.error('Failed to grant access');
    }
  }, [currentUser]);

  // Revoke access to a feature
  const revokeFeatureAccess = useCallback(async (
    productId: ProductId,
    featureId: ProductFeatureId
  ): Promise<void> => {
    if (!currentUser) return;

    try {
      await dal.user.revokeFeatureAccess(currentUser.uid, productId, featureId);
      
      // Update local state
      setProductAccess(prev => {
        if (!prev || !prev[productId]) return prev;
        
        const { [featureId]: removed, ...remainingFeatures } = 
          prev[productId].features_access || {};

        return {
          ...prev,
          [productId]: {
            ...prev[productId],
            features_access: remainingFeatures
          }
        };
      });
    } catch (error) {
      console.error('Error revoking feature access:', error);
      toast.error('Failed to revoke access');
    }
  }, [currentUser]);

  return {
    loading,
    hasProductAccess,
    hasFeatureAccess,
    grantFeatureAccess,
    revokeFeatureAccess,
    productAccess
  };
} 