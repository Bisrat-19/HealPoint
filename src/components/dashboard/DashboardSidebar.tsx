import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useSidebarContext } from '@/lib/sidebar-context';
import { cn } from '@/lib/utils';
import {
  Heart,
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  Stethoscope,
  ClipboardList,
  CreditCard,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import * as LazyPages from '@/lib/lazy-components';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: ('admin' | 'doctor' | 'receptionist' | 'patient')[];
  component?: { preload: () => Promise<any> };
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'receptionist', 'patient'], component: LazyPages.Dashboard },
  { label: 'User Management', href: '/dashboard/users', icon: Users, roles: ['admin'], component: LazyPages.UserManagement },
  { label: 'Patients', href: '/dashboard/patients', icon: Users, roles: ['admin'], component: LazyPages.Patients },
  { label: 'All Appointments', href: '/dashboard/all-appointments', icon: Calendar, roles: ['admin'], component: LazyPages.AllAppointments },
  { label: 'Register Patient', href: '/dashboard/register-patient', icon: UserPlus, roles: ['receptionist'], component: LazyPages.RegisterPatient },
  { label: 'Patient Queue', href: '/dashboard/queue', icon: ClipboardList, roles: ['receptionist'], component: LazyPages.PatientQueue },
  { label: 'Appointments', href: '/dashboard/appointments', icon: Calendar, roles: ['doctor', 'receptionist'], component: LazyPages.Appointments },
  { label: 'Treatments', href: '/dashboard/treatments', icon: Stethoscope, roles: ['doctor'], component: LazyPages.Treatments },
  { label: 'Payments', href: '/dashboard/payments', icon: CreditCard, roles: ['admin', 'receptionist'], component: LazyPages.Payments },
  { label: 'My Profile', href: '/dashboard/profile', icon: Settings, roles: ['admin', 'doctor', 'receptionist', 'patient'], component: LazyPages.Profile },
];

interface SidebarContentProps {
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  filteredNavItems: NavItem[];
  location: ReturnType<typeof useLocation>;
  onNavClick?: () => void;
  isCollapsed?: boolean;
}

const SidebarContentComponent = ({ user, filteredNavItems, location, onNavClick, isCollapsed = false }: SidebarContentProps) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = React.useTransition();

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'admin': return 'bg-admin';
      case 'doctor': return 'bg-doctor';
      case 'receptionist': return 'bg-receptionist';
      default: return 'bg-primary';
    }
  };

  const handleMouseEnter = (item: NavItem) => {
    if (item.component?.preload) {
      item.component.preload();
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (onNavClick) onNavClick();

    startTransition(() => {
      navigate(href);
    });
  };

  return (
    <TooltipProvider delayDuration={0}>
      {/* Logo */}
      <div className={cn("p-6 border-b border-sidebar-border", isCollapsed && "p-4")}>
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-sidebar-foreground">HealPoint</h1>
              <p className="text-xs text-sidebar-foreground/60">Healthcare Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 p-4 space-y-1", isCollapsed && "p-2")}>
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          const linkContent = (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              onMouseEnter={() => handleMouseEnter(item)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center px-3",
                isPending && !isActive && "opacity-70"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && item.label}
            </a>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  {linkContent}
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      {/* User info */}
      <div className={cn("p-4 border-t border-sidebar-border", isCollapsed && "p-2")}>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 mx-auto rounded-full bg-sidebar-primary/20 flex items-center justify-center text-sidebar-primary font-bold cursor-default">
                {(user.first_name?.[0] || user.username?.[0] || '').toUpperCase()}
                {(user.last_name?.[0] || '').toUpperCase()}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-sidebar-primary font-bold flex-shrink-0">
              {(user.first_name?.[0] || user.username?.[0] || '').toUpperCase()}
              {(user.last_name?.[0] || '').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.first_name} {user.last_name}
              </p>
              <div className="flex items-center gap-1.5">
                <span className={cn("w-2 h-2 rounded-full", getRoleBadgeColor())} />
                <span className="text-xs text-sidebar-foreground/60 capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

// Mobile Sidebar Trigger Button
export const MobileSidebarTrigger = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar">
        <div className="flex flex-col h-full">
          <SidebarContentComponent
            user={user}
            filteredNavItems={filteredNavItems}
            location={location}
            onNavClick={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Desktop Sidebar Toggle Button
export const DesktopSidebarTrigger = () => {
  const { isCollapsed, toggleSidebar } = useSidebarContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="hidden lg:flex"
    >
      {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
    </Button>
  );
};

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { isCollapsed } = useSidebarContext();

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <aside
      className={cn(
        "hidden lg:flex bg-sidebar h-screen flex-col border-r border-sidebar-border sticky top-0 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContentComponent
        user={user}
        filteredNavItems={filteredNavItems}
        location={location}
        isCollapsed={isCollapsed}
      />
    </aside>
  );
};

export default DashboardSidebar;
