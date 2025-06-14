import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Settings, User, LogOut, Search } from 'lucide-react';

const Navbar = () => {
  const [isOnline, setIsOnline] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/', active: location.pathname === '/' },
    { name: 'Attendance Logs', href: '/logs', active: location.pathname === '/logs' },
    { name: 'User Management', href: '/users', active: location.pathname === '/users' },
    { name: 'Analytics', href: '/analytics', active: location.pathname === '/analytics' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="md:hidden mr-2" />
        
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
            <div className="h-4 w-4 rounded-sm bg-white"></div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            RFID System
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex mx-6 space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex-1" />

        {/* Search and Status */}
        <div className="flex items-center space-x-4">
          {/* Firebase Connection Status */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse-glow' : 'bg-red-500'}`} />
            <span className="text-xs text-muted-foreground">
              {isOnline ? 'Connected' : 'Offline'}
            </span>
          </div>

          {/* Search */}
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span className="text-sm">Search</span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Admin</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    admin@rfidsystem.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
