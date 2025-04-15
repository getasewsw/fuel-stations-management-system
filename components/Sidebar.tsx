import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Receipt,
  Fuel,
  ChevronRight,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function Sidebar() {
  return (
    <div className="relative flex h-full w-64 flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Branding Section */}
      <div className="flex flex-col items-center px-6 py-8 border-b bg-gradient-to-b from-background to-background/80">
        <Image
          src="/ethio-telecom-logo.png"
          alt="Ethio Telecom"
          width={160}
          height={53}
          className="dark:brightness-200 transition-all duration-200 hover:scale-105"
        />
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          Fuel Station Management
        </p>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 space-y-1 p-4">
        <div className="space-y-1">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-full justify-start gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground group relative overflow-hidden'
            )}
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-primary transform origin-left scale-y-0 transition-transform group-hover:scale-y-100" />
            <LayoutDashboard className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0" />
            <span>Dashboard</span>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/stations"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-full justify-start gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground group relative overflow-hidden'
            )}
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-primary transform origin-left scale-y-0 transition-transform group-hover:scale-y-100" />
            <Fuel className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0" />
            <span>Fuel Stations</span>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/fuel-prices"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-full justify-start gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground group relative overflow-hidden'
            )}
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-primary transform origin-left scale-y-0 transition-transform group-hover:scale-y-100" />
            <Receipt className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0" />
            <span>Fuel Prices</span>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="border-t bg-muted/10 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>v1.2.0</span>
          <span>© 2025 Ethio Telecom</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;