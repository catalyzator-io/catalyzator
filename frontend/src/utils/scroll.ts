export const scrollToSection = (sectionId: string, offset: number = 100) => (e?: React.MouseEvent<HTMLAnchorElement>) => {
  if (e) {
    e.preventDefault();
  }
  
  const section = document.getElementById(sectionId.replace('#', ''));
  if (section) {
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    return true;
  }
  return false;
}; 