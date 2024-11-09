import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { HELP_AND_LINKS_STYLES, HelpAndLinksVariant } from '../../constants/styles/helpAndLinks';

interface HelpAndLinksProps {
  variant?: HelpAndLinksVariant;
  className?: string;
}

export function HelpAndLinks({
  variant = 'footer',
  className,
}: HelpAndLinksProps) {
  const currentStyle = HELP_AND_LINKS_STYLES[variant];

  return (
    <div className={cn(currentStyle.container, className)}>
      <div className="space-y-2">
        <div className={cn(
          "flex items-center gap-2",
          variant === 'footer' ? "justify-center" : "justify-start"
        )}>
          <h3 className={cn("text-lg font-semibold", currentStyle.title)}>
            Need Help?
          </h3>
          {variant === 'sidebar' && (
            <a 
              href="mailto:contact@catalyzator.io" 
              className={cn("underline text-sm sm:text-base", currentStyle.link)}
            >
              Contact Us
            </a>
          )}
        </div>
        {variant === 'footer' && (
          <>
            <p className={cn("text-sm sm:text-base mb-2", currentStyle.description)}>
              Our team is here to answer your questions
            </p>
            <a 
              href="mailto:contact@catalyzator.io" 
              className={cn("underline text-sm sm:text-base", currentStyle.link)}
            >
              Contact Us
            </a>
          </>
        )}
      </div>
      <div className={cn(
        "text-xs sm:text-sm mt-4 flex flex-wrap gap-2",
        variant === 'footer' ? "justify-center" : "justify-start",
        currentStyle.legalLinks
      )}>
        <Link 
          to="/privacy-policy" 
          className={currentStyle.legalLinksHover}
        >
          Privacy Policy
        </Link>
        <span className="hidden sm:inline">•</span>
        <Link 
          to="/terms-of-service" 
          className={currentStyle.legalLinksHover}
        >
          Terms of Service
        </Link>
        <span className="hidden sm:inline">•</span>
        <Link 
          to="/customer-agreement" 
          className={currentStyle.legalLinksHover}
        >
          Customer Agreement
        </Link>
      </div>
    </div>
  );
} 