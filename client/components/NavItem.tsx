import Link from 'next/link';
import React from 'react';

interface NavItemProps {
  text: string,
  path: string,
  className?: string
  Icon?: React.ForwardRefExoticComponent<any>
}

function NavItem({ text, path, className = '', Icon } : NavItemProps) {
  return (
    <Link href={path}>
      <div className={"flex items-center hover:text-primary " + className}>
        {Icon && <Icon className="w-4 h-4 mr-1" />} {text}
      </div>
    </Link>
  );
}

export default NavItem;
