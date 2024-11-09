import * as React from 'react';
import { cn } from '../../utils/cn';
import { Button } from './button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface CollapsibleSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsedWidth?: string;
  expandedWidth?: string;
  renderCollapsed?: () => React.ReactNode;
  renderExpanded?: () => React.ReactNode;
  showCollapseButton?: boolean;
  collapseButtonClassName?: string;
  isSmallScreen?: boolean;
  smallScreenClassName?: string;
}

export const CollapsibleSidebar = React.forwardRef<HTMLDivElement, CollapsibleSidebarProps>(
  ({ 
    className,
    collapsed = false,
    onCollapsedChange,
    collapsedWidth = "w-[60px]",
    expandedWidth = "w-[280px]",
    renderCollapsed,
    renderExpanded,
    showCollapseButton = true,
    collapseButtonClassName,
    isSmallScreen = false,
    smallScreenClassName,
    ...props
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

    const toggleCollapsed = () => {
      const newValue = !isCollapsed;
      setIsCollapsed(newValue);
      onCollapsedChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative transition-all duration-300 flex-shrink-0',
          isSmallScreen ? smallScreenClassName : cn(
            isCollapsed ? collapsedWidth : expandedWidth
          ),
          className
        )}
        {...props}
      >
        {showCollapseButton && !isSmallScreen && (
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute -right-4 top-6 z-50",
              "w-8 h-8 rounded-full shadow-md",
              "flex items-center justify-center",
              "border-2",
              collapseButtonClassName
            )}
            onClick={toggleCollapsed}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </Button>
        )}

        <div className={cn(
          'absolute inset-0 transition-all duration-300',
          !isSmallScreen && (isCollapsed ? 'invisible' : 'visible')
        )}>
          {renderExpanded?.()}
        </div>

        <div className={cn(
          'absolute inset-0 transition-all duration-300',
          !isSmallScreen && (!isCollapsed ? 'invisible' : 'visible')
        )}>
          {renderCollapsed?.()}
        </div>
      </div>
    );
  }
);

CollapsibleSidebar.displayName = 'CollapsibleSidebar';