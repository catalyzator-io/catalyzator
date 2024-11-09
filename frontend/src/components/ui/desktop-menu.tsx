import React from 'react';
import { cn } from '../../utils/cn';

export interface DesktopMenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
}

export interface DesktopMenuSection {
  id: string;
  title?: string;
  items: DesktopMenuItem[];
}

interface DesktopMenuProps {
  logo?: React.ReactNode;
  sections: DesktopMenuSection[];
  actions?: React.ReactNode;
  className?: string;
  renderItem?: (item: DesktopMenuItem) => React.ReactNode;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({
  logo,
  sections,
  actions,
  className,
  renderItem,
}) => {
  const defaultRenderItem = (item: DesktopMenuItem) => (
    <button
      key={item.id}
      onClick={item.onClick}
      className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      {item.icon && <item.icon className="h-4 w-4" />}
      {item.label}
    </button>
  );

  return (
    <div className={cn(
      "h-16 bg-white border-b",
      className
    )}>
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {logo}
        
        <div className="flex items-center gap-4">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center gap-2">
              {section.items.map((item) => (
                <div key={item.id}>
                  {renderItem?.(item) || defaultRenderItem(item)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}; 