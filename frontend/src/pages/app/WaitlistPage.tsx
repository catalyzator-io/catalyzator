import React from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { getProductById, PRODUCTS } from '../../constants/products';
import { ProductCard } from '../../components/products/ProductCard';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const WaitlistPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;

  if (!product) {
    return (
      <AppLayout showSidebar={false}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Product not found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
      </AppLayout>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => 
    p.category === product.category && p.id !== product.id
  );

  return (
    <AppLayout showSidebar={false}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-900">
            Join the Waitlist
          </h1>
          <p className="text-lg text-gray-600">
            Be among the first to experience {product.title} when it launches
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <ProductCard product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-900">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}; 