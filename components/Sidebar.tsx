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
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function Sidebar() {
  return (
    <div className="h-full w-64 border-r bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Branding Section */}
      <div className="mb-6 px-2">
        <h1 className="text-xl font-semibold tracking-tight">FuelTracker</h1>
        <p className="text-sm text-muted-foreground">Energy Management Suite</p>
      </div>

      <Separator className="mb-4" />

      {/* Navigation Groups */}
      <nav className="space-y-1">
        <div className="space-y-2">
          <p className="px-4 text-xs font-medium text-muted-foreground">Navigation</p>
          <div className="space-y-1">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent'
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/posts"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent'
              )}
            >
              <Receipt className="h-5 w-5" />
              Fuel Prices
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent'
              )}
            >
              <Fuel className="h-5 w-5" />
              Stations
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
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent'
              )}
            >
              <User className="h-5 w-5" />
              Profile
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent'
              )}
            >
              <CreditCard className="h-5 w-5" />
              Billing
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start gap-3 rounded-lg px-4 transition-all hover:bg-accent'
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
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