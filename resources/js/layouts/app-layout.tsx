import { router } from '@inertiajs/react';

import { SidebarLayout } from '@/layouts/sidebar-layout'
import { AppSidebar } from '@/components/app-sidebar'
import { AppNavbar } from "@/components/app-navbar";

import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children, ...props }: AppLayoutProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <SidebarLayout
            sidebar={<AppSidebar onClick={handleLogout}/>}
            navbar={<AppNavbar onClick={handleLogout}/>}
        >
            {children}
        </SidebarLayout>
    )
}
