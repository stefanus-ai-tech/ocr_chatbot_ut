
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";
import { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { label: "Dashboard", href: user.role === 'admin' ? '/admin' : '/student' },
    { label: "Documents", href: "#" },
    { label: "Settings", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b relative">
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
            <nav className="hidden lg:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
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
                    className="px-2 py-2 text-sm hover:bg-accent rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
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
