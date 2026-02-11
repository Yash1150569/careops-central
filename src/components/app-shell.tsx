"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Calendar,
  Bot,
  LogOut,
  Menu,
  ChevronsLeft,
  MessageSquare,
  FolderKanban,
  Settings as SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/bookings", label: "Bookings", icon: Calendar },
  { href: "/inbox", label: "Inbox", icon: MessageSquare },
  { href: "/forms", label: "Forms", icon: FolderKanban },
  { href: "/ai-responder", label: "AI Responder", icon: Bot },
];

const settingsNavItems = [
    { href: "/settings", label: "Settings", icon: SettingsIcon },
]

function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push("/login");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      variant="sidebar"
      side="left"
    >
      <SidebarHeader className="flex items-center justify-between p-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg overflow-hidden"
        >
          <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 22a7 7 0 0 0 7-7h-2a5 5 0 0 1-5 5v2z" />
              <path d="M12 2a7 7 0 0 0-7 7h2a5 5 0 0 1 5-5V2z" />
              <path d="M22 12a7 7 0 0 0-7-7v2a5 5 0 0 1 5 5h2z" />
              <path d="M2 12a7 7 0 0 0 7 7v-2a5 5 0 0 1-5-5H2z" />
            </svg>
          </div>
          <span className="group-data-[collapsible=icon]:hidden">
            CareOps Central
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="group-data-[collapsible=icon]:hidden"
          onClick={toggleSidebar}
        >
          <ChevronsLeft />
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuButton
              key={item.href}
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarContent className="p-2">
        <SidebarMenu>
            {settingsNavItems.map((item) => (
                <SidebarMenuButton
                key={item.href}
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
                >
                <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                </Link>
                </SidebarMenuButton>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-2 p-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/10/100/100" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="text-left overflow-hidden group-data-[collapsible=icon]:hidden">
                <p className="font-medium text-sm truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@careops.com
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@careops.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function AppHeader({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu />
      </Button>
      <div className="flex-1">{children}</div>
      <ThemeToggle />
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname === '/login' || pathname.startsWith('/public/')) {
        return <main className="flex-1 p-4 sm:px-6">{children}</main>;
    }

  return (
    <>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <AppHeader>
          {/* Breadcrumb can go here */}
        </AppHeader>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
