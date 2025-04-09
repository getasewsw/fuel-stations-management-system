import React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Link
 from 'next/link'

import { 
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  Receipt,
  Fuel,
  User, } from 'lucide-react'

function Sidebar() {
  return (
    <Command className='bg-secondary rounded-none'>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <LayoutDashboard className="mr-2 h-4 w-4" />
        <Link href="/">
          Dashboard
        </Link>
      </CommandItem>
      <CommandItem> 
        <Receipt className="mr-2 h-4 w-4" />
        <Link href="/posts">
         Fuel Price
        </Link></CommandItem>

      <CommandItem>

      <Fuel className="mr-2 h-4 w-4" />
        <Link href=" #">
           Fuel Stations
        </Link>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>

      </CommandItem>
      <CommandItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Payment</span>
        <CommandShortcut>⌘P</CommandShortcut>

      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
  
  )
}

export default Sidebar
