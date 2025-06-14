
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Database, 
  FileText, 
  Settings, 
  User, 
  LogIn 
} from 'lucide-react';

const mainItems = [
  { title: 'Dashboard', url: '/', icon: Calendar },
  { title: 'Attendance Logs', url: '/logs', icon: FileText },
  { title: 'User Management', url: '/users', icon: User },
  { title: 'Analytics', url: '/analytics', icon: Database },
];

const settingsItems = [
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Device Management', url: '/devices', icon: LogIn },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClass = (isActiveRoute: boolean) =>
    isActiveRoute 
      ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
      : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground';

  return (
    <Sidebar className={`${collapsed ? 'w-14' : 'w-64'} transition-all duration-300`} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? 'px-2' : 'px-4'} py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide`}>
            {!collapsed && 'Main Menu'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(isActive(item.url))}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? 'px-2' : 'px-4'} py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide`}>
            {!collapsed && 'System'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(isActive(item.url))}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-auto p-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/30">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <div className="text-xs text-muted-foreground">
                <div className="font-medium">System Online</div>
                <div>Last sync: Now</div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
