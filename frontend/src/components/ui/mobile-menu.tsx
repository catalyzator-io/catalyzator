import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { Button } from './button';
import { Menu } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MobileMenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
}

export interface MobileMenuSection {
  id: string;
  title?: string;
  items: MobileMenuItem[];
}

interface MobileMenuProps {
  sections: MobileMenuSection[];
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  renderItem?: (item: MobileMenuItem) => React.ReactNode;
  renderSectionTitle?: (title: string) => React.ReactNode;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  sections,
  trigger,
  footer,
  className,
  contentClassName,
  renderItem,
  renderSectionTitle,
}) => {
  const defaultRenderItem = (item: MobileMenuItem) => (
    <Button
      key={item.id}
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 rounded-lg px-4 py-2 hover:bg-gray-100",
        item.href ? "a" : "button"
      )}
      asChild={!!item.href}
      onClick={item.onClick}
    >
      {item.href ? (
        <a href={item.href}>
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </a>
      ) : (
        <>
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </>
      )}
    </Button>
  );

  const defaultRenderSectionTitle = (title: string) => (
    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
      {title}
    </h2>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className={cn("w-[300px] sm:w-[400px]", className)}
      >
        <nav className={cn("flex flex-col gap-4", contentClassName)}>
          {sections.map((section) => (
            <div key={section.id} className="px-2">
              {section.title && (
                (renderSectionTitle?.(section.title) || 
                defaultRenderSectionTitle(section.title))
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item.id}>
                    {renderItem?.(item) || defaultRenderItem(item)}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {footer && (
            <div className="mt-auto px-2">
              {footer}
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}; 