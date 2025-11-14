import { ReactNode } from 'react';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
  currentPath: string;
}

export const Layout = ({ children, currentPath }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPath={currentPath} />
      <main>{children}</main>
    </div>
  );
};
