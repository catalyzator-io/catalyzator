import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useProductAccess } from '../../hooks/useProductAccess';
import { cn } from '../../utils/cn';
import { navigateToProtectedRoute } from '../../utils/navigation';
import { useAuth } from '../../hooks/useAuth';
import { PRODUCT_CARD_STYLES, ProductCardVariant } from '../../constants/styles/productCard';

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  showActions?: boolean;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  showActions = true,
  onClick
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isActive, isWaitlisted, addToWaitlist } = useProductAccess();
  const Icon = product.icon;
  const styles = PRODUCT_CARD_STYLES[variant];

  const handleAction = async () => {
    try {
      if (onClick) {
        onClick();
        return;
      }

      if (product.status === 'active' && product.route) {
        navigateToProtectedRoute(navigate, product.route, !!currentUser);
      } else if (product.waitlistRoute) {
        if (!isWaitlisted(product.id)) {
          await addToWaitlist(product.id);
        }
        navigateToProtectedRoute(navigate, product.waitlistRoute, !!currentUser);
      }
    } catch (error) {
      console.error('Error handling product action:', error);
    }
  };

  const getSidebarStateClass = () => {
    if (variant !== 'sidebar') return '';
    
    if (isActive(product.id)) return styles.active;
    if (isWaitlisted(product.id)) return styles.waitlisted;
    return styles.comingSoon;
  };

  return (
    <Card 
      className={cn(
        styles.container,
        getSidebarStateClass()
      )}
      onClick={handleAction}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-center">
        <div className={styles.iconContainer}>
          <Icon className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className="flex items-center justify-between gap-2">
            <h3 className={styles.title}>{product.title}</h3>
            {variant !== 'sidebar' && (
              <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                {isActive(product.id) ? 'Active' : 
                 isWaitlisted(product.id) ? 'Waitlisted' :
                 product.status === 'active' ? 'Available' : 'Coming Soon'}
              </Badge>
            )}
          </div>
          <p className={styles.description}>{product.description}</p>
          
          {showActions && styles.button !== 'hidden' && (
            <Button
              onClick={handleAction}
              className={styles.button}
              variant={product.status === 'active' ? 'default' : 'secondary'}
              disabled={isWaitlisted(product.id)}
            >
              {isActive(product.id) ? 'Access Now' :
               isWaitlisted(product.id) ? 'On Waitlist' :
               product.status === 'active' ? 'Get Access' : 'Join Waitlist'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}; 