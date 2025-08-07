import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Box, Home, Eye, Users, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/experiment', label: 'The Experiment', icon: Box },
    { path: '/observer', label: 'Observer View', icon: Eye },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-gray-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Box className="text-cyber-blue" size={28} />
            <span className="font-orbitron font-bold text-lg hologram-text hidden sm:block">
              MAN IN THE BOX
            </span>
            <span className="font-orbitron font-bold text-sm hologram-text sm:hidden">
              MITB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} href={path}>
                <Button
                  variant={location === path ? "default" : "ghost"}
                  size="sm"
                  className={`
                    font-roboto-mono text-xs transition-all duration-300
                    ${location === path 
                      ? 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue' 
                      : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/10'
                    }
                  `}
                >
                  <Icon size={14} className="mr-2" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300 hover:text-cyber-blue"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-700/30 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} href={path}>
                  <Button
                    variant={location === path ? "default" : "ghost"}
                    size="sm"
                    className={`
                      w-full justify-start font-roboto-mono text-xs transition-all duration-300
                      ${location === path 
                        ? 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue' 
                        : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/10'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={14} className="mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;