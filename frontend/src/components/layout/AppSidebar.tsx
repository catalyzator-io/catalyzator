import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from '../ui/scroll-area';
import { ProductCard } from '../products/ProductCard';
import { HelpCircleIcon } from 'lucide-react';
import { PRODUCTS } from '../../constants/products';
import { useProductAccess } from '../../hooks/useProductAccess';
import { UserSection } from './UserSection';
import { GrantApplications } from '../pitch_to_grant/GrantApplications';
import { HelpAndLinks } from './HelpAndLinks';
import { CollapsibleSidebar } from '../ui/collapsible-sidebar';
import { Button } from '../ui/button';
import { useGrants } from '../../hooks/useGrants';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useProductAccess();
  const { grants, loading: grantsLoading } = useGrants();
  const isPitchToGrantRoute = location.pathname.includes('pitch-to-grant');
  const hasGrants = grants && grants.length > 0;
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (loading || grantsLoading) {
    return (
      <CollapsibleSidebar 
        className="h-auto bg-white border-r"
        isSmallScreen={isMobile}
        smallScreenClassName="fixed bottom-0 left-0 right-0 h-[60px] border-t"
        renderExpanded={() => (
          <div className="animate-pulse space-y-4 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-gray-200" />
            ))}
          </div>
        )}
      />
    );
  }

  const renderCollapsed = () => (
    <div className="flex flex-col h-full">
      <div className="py-4 flex justify-center border-b">
        <div className="w-8 h-8 rounded-full bg-purple-100" />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center gap-1 py-2">
          {PRODUCTS.map((product) => (
            <Button
              key={product.id}
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-lg hover:bg-purple-50"
              onClick={() => navigate(product.route || product.waitlistRoute || '/')}
            >
              <product.icon className="h-4 w-4 text-purple-600" />
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="py-4 flex justify-center border-t">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg hover:bg-purple-50"
        >
          <HelpCircleIcon className="h-4 w-4 text-purple-600" />
        </Button>
      </div>
    </div>
  );

  const renderExpanded = () => (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex-shrink-0 py-4 px-4 border-b">
        <UserSection />
      </div>

      {isPitchToGrantRoute && (
        <div className="flex-shrink-0 border-b">
          <h2 className="text-lg font-semibold px-4 pt-4">Grant Applications</h2>
          {hasGrants ? (
            <div className="px-4 py-2 max-h-[200px]">
              <ScrollArea className="h-full">
                <GrantApplications />
              </ScrollArea>
            </div>
          ) : (
            <div className="px-4 py-2">
              <Button 
                className="w-full"
                onClick={() => navigate('/app/pitch-to-grant/apply')}
              >
                Apply for Grant
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col">
        <h2 className="flex-shrink-0 text-lg font-semibold px-4 pt-4">Products</h2>
        <ScrollArea className="flex-1 px-4 py-2">
          <nav className="space-y-1">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="sidebar"
                showActions={false}
                onClick={() => navigate(product.route || product.waitlistRoute || '/')}
              />
            ))}
          </nav>
        </ScrollArea>
      </div>

      <div className="flex-shrink-0 border-t">
        <HelpAndLinks 
          variant="sidebar"
          className="p-4"
        />
      </div>
    </div>
  );

  return (
    <CollapsibleSidebar
      className="h-auto bg-white border-r"
      isSmallScreen={isMobile}
      smallScreenClassName="fixed bottom-0 left-0 right-0 h-[60px] border-t"
      collapseButtonClassName="bg-white hover:bg-gray-50 border-gray-200"
      renderCollapsed={renderCollapsed}
      renderExpanded={renderExpanded}
    />
  );
}; 