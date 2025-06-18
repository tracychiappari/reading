import {type ReactNode} from 'react';

import {type NavItem} from '@/types';

import {Heading, Subheading} from '@/components/ui/heading'
import {Divider} from '@/components/ui/divider'
import {
    Sidebar,
    SidebarBody,
    SidebarItem,
    SidebarSection
} from "@/components/ui/sidebar";

interface SettingsLayoutProps {
    children: ReactNode;
}

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        route: 'profile.edit',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        route: 'password.edit',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        route: 'appearance',
        icon: null,
    },
];

export function SettingsLayout({children}: SettingsLayoutProps) {
    return (
        <div>
            <Heading>Settings</Heading>
            <Subheading>Manage your profile and account settings</Subheading>
            <Divider className="my-5" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <Sidebar>
                        <SidebarBody className="px-0 pt-0">
                            <SidebarSection>
                                {sidebarNavItems.map((item, index) => (
                                    <SidebarItem key={`${item.href}-${index}`} href={route(item.route)} prefetch>
                                        {item.title}
                                    </SidebarItem>
                                ))}
                            </SidebarSection>
                        </SidebarBody>
                    </Sidebar>
                </aside>

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
