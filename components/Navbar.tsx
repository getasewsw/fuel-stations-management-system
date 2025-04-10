import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggler } from '@/components/ThemeToggler';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <div className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center px-4'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
              <span className='text-lg font-bold'>F</span>
            </div>
            <span className='font-semibold'>FuelTracker</span>
          </Link>
          <div className='relative hidden md:block'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search...'
              className='pl-8 w-[300px]'
            />
          </div>
        </div>
        
        <div className='ml-auto flex items-center gap-4'>
          <button className='relative rounded-full p-2 hover:bg-accent'>
            <Bell className='h-5 w-5' />
            <span className='absolute right-1 top-1 h-2 w-2 rounded-full bg-primary'></span>
          </button>
          <div className="flex items-center">
            <ThemeToggler/>
            <DropdownMenu>
              <DropdownMenuTrigger className='focus:outline-none'>
                <Avatar className='h-8 w-8 cursor-pointer border-2 border-primary'>
                  <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                  <AvatarFallback className='bg-primary text-primary-foreground'>BT</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>Naod</p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      naod@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href='/profile' className='flex w-full items-center'>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/settings' className='flex w-full items-center'>
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href='/auth' className='flex w-full items-center text-destructive'>
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;