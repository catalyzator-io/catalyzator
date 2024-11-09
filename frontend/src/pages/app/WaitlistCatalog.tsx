import React from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '../../components/layout/AppLayout';
import { PRODUCTS } from '../../constants/products';
import { ProductCard } from '../../components/products/ProductCard';
import { useProductAccess } from '../../hooks/useProductAccess';
import { Button } from '../../components/ui/button';
import toast from 'react-hot-toast';
import { ProductId } from '../../types/product';

export const WaitlistCatalog: React.FC = () => {
  const { loading, isWaitlisted, addToWaitlist } = useProductAccess();
  const [selectedProducts, setSelectedProducts] = React.useState<ProductId[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleProductSelect = (productId: ProductId) => {
    if (isWaitlisted(productId)) return;
    
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleJoinWaitlist = async () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }

    setIsSubmitting(true);
    try {
      await Promise.all(
        selectedProducts.map(productId => addToWaitlist(productId))
      );
      
      setSelectedProducts([]);
      toast.success('Successfully joined the waitlist!');
    } catch (error) {
      toast.error('Failed to join waitlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AppLayout showSidebar={false}>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-200" />
          ))}
        </div>
      </AppLayout>
    );
  }

  const renderProductSection = (category: 'catalyzatee' | 'catalyzator') => {
    const categoryProducts = PRODUCTS.filter(p => p.category === category);
    const title = category === 'catalyzatee' ? 'For Catalyzatees' : 'For Catalyzators';
    const subtitle = category === 'catalyzatee' 
      ? 'Tools to accelerate your venture growth' 
      : 'Solutions to enhance your impact';

    return (
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">{title}</h2>
          <p className="text-purple-700">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleProductSelect(product.id)}
            >
              <ProductCard 
                product={product}
                variant={selectedProducts.includes(product.id) ? 'landing' : 'default'}
              />
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <AppLayout showSidebar={false}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-900">
            Product Catalog
          </h1>
          <p className="text-lg text-gray-600">
            Explore our suite of tools and join the waitlist for upcoming features
          </p>
        </div>

        <div className="space-y-12">
          {renderProductSection('catalyzatee')}
          {renderProductSection('catalyzator')}
        </div>

        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-lg shadow-lg border border-purple-200 flex items-center gap-4"
          >
            <span className="text-purple-900 font-medium">
              {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
            </span>
            <Button
              onClick={handleJoinWaitlist}
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}; 