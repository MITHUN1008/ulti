import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { ReactNode } from 'react';

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  href: string;
  children: ReactNode;
  className?: string;
}

const Link = ({ href, children, className, ...props }: LinkProps) => {
  return (
    <RouterLink to={href} className={className} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;