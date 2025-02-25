
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";
import { Menu, X, LayoutDashboard, FileText, Settings } from "lucide-react";
import { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const navItems = [
    { 
      label: "Dashboard", 
      href: user.role === 'admin' ? '/admin' : '/student',
      icon: LayoutDashboard 
    },
    { 
      label: "Documents", 
      href: "#",
      icon: FileText 
    },
    { 
      label: "Settings", 
      href: "#",
      icon: Settings 
    },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Document Management System</h1>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${
                    isActiveRoute(item.href) ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 ml-4 border-l pl-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.name}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </nav>
          </div>

          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden py-4 space-y-4 animate-fadeIn">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent ${
                      isActiveRoute(item.href) ? 'bg-accent text-accent-foreground' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2 border-t">
                <span className="block text-sm text-muted-foreground mb-2">
                  Welcome, {user.name}
                </span>
                <Button variant="outline" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
