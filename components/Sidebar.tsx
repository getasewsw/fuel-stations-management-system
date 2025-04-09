import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  Receipt,
  Fuel,
  User,
  ChevronRight,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function Sidebar() {
  return (
    <div className="h-full w-64 border-r bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Branding Section */}
      <div className="mb-6 px-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Fuel className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">FuelTracker</h1>
            <p className="text-xs text-muted-foreground">Energy Management Suite</p>
          </div>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Navigation Groups */}
      <nav className="space-y-4">
        <div className="space-y-2">
          <p className="px-4 text-xs font-medium text-muted-foreground">Navigation</p>
          <div className="space-y-1">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent group'
              )}
            >
              <LayoutDashboard className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span>Dashboard</span>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
            <Link
              href="/posts"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent group'
              )}
            >
              <Receipt className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span>Fuel Prices</span>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent group'
              )}
            >
              <Fuel className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span>Stations</span>
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                Soon
              </span>
            </Link>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <p className="px-4 text-xs font-medium text-muted-foreground">Account</p>
          <div className="space-y-1">
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent group'
              )}
            >
              <User className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span>Profile</span>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent group'
              )}
            >
              <CreditCard className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span>Billing</span>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent group'
              )}
            >
              <Settings className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span>Settings</span>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="absolute bottom-4 left-4 right-4 text-xs text-muted-foreground">
        <Separator className="mb-2" />
        <div className="flex justify-between px-2">
          <span>v1.2.0</span>
          <span>© 2024 FuelTracker</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;