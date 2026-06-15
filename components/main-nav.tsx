"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

const competitionItems = [
  { title: "Participation Requirements", href: "/requirements" },
  { title: "Past FIPHO", href: "/past-fipho" },
  { title: "Future FIPHO", href: "/future-fipho" },
];

const fipho2026Items = [
  { title: "Organizing Committee", href: "/organizing-committee" },
  { title: "Scientific Committee", href: "/scientific-committee" },
  { title: "Programme Schedule", href: "/programme-schedule" },
  { title: "Press Release & Report", href: "/press" },
];

const infoCenterItems = [
  { title: "Results & Problems", href: "/results" },
  { title: "Rules & Guidelines", href: "/rules" },
  { title: "Preparatory Problems", href: "/preparatory-problems" },
];

function NavDropdownContent({
  items,
}: {
  items: { title: string; href: string }[];
}) {
  return (
    <div className="grid w-[280px] gap-1 p-2">
      {items.map((item) => (
        <NavigationMenuLink key={item.title} asChild>
          <Link
            href={item.href}
            className="block select-none rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-fipho-gold focus:bg-white/10 focus:text-fipho-gold"
          >
            {item.title}
          </Link>
        </NavigationMenuLink>
      ))}
    </div>
  );
}

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-1">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4")}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4")}>
              About FIPHO
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">Olympiad</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavDropdownContent items={competitionItems} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/fipho-sponsors" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4")}>
              Sponsors
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">Info Center</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavDropdownContent items={infoCenterItems} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/gallery" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4")}>
              Gallery
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">FIPHO 2026</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavDropdownContent items={fipho2026Items} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/uzbekistan" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4")}>
              Uzbekistan
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4")}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileDropdown({
  label,
  menuKey,
  items,
  openMenu,
  toggleMenu,
  onCloseAction,
}: {
  label: string;
  menuKey: string;
  items: { title: string; href: string }[];
  openMenu: string | null;
  toggleMenu: (menu: string) => void;
  onCloseAction: () => void;
}) {
  return (
    <DropdownMenu
      open={openMenu === menuKey}
      onOpenChange={() => toggleMenu(menuKey)}
    >
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-between w-full text-white hover:text-fipho-gold">
          {label}
          <span className="ml-2">
            {openMenu === menuKey ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full bg-fipho-navy-light border-white/10">
        {items.map((item) => (
          <DropdownMenuItem key={item.title} asChild>
            <Link
              href={item.href}
              className="block w-full text-white hover:text-fipho-gold"
              onClick={onCloseAction}
            >
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileNav({ onCloseAction }: { onCloseAction: () => void }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);

  const links = [
    { label: "Home", href: "/" },
    { label: "About FIPHO", href: "/about" },
    { label: "Sponsors", href: "/fipho-sponsors" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Uzbekistan", href: "/uzbekistan" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="p-6">
      <ul className="space-y-5">
        {links.map((link) => (
          <li key={link.href} className="py-1">
            <Link
              href={link.href}
              className="block text-white hover:text-fipho-gold"
              onClick={onCloseAction}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="py-1">
          <MobileDropdown
            label="Olympiad"
            menuKey="olympiad"
            items={competitionItems}
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            onCloseAction={onCloseAction}
          />
        </li>
        <li className="py-1">
          <MobileDropdown
            label="Info Center"
            menuKey="infoCenter"
            items={infoCenterItems}
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            onCloseAction={onCloseAction}
          />
        </li>
        <li className="py-1">
          <MobileDropdown
            label="FIPHO 2026"
            menuKey="fipho2026"
            items={fipho2026Items}
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            onCloseAction={onCloseAction}
          />
        </li>
      </ul>
    </nav>
  );
}
