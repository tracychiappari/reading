import {type ReactNode} from 'react';

import { type NavItem } from '@/types';

import { Link } from '@/components/ui/link'
import { Heading, Subheading } from '@/components/ui/heading'

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

export function SettingsLayout({ children, ...props }: SettingsLayoutProps) {
    return (
        <div>
            <Heading>Settings</Heading>
            <Subheading>Manage your profile and account settings</Subheading>

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Link key={`${item.href}-${index}`} href={route(item.route)} prefetch>
                                {item.title}
                            </Link>
                        ))}
                    </nav>
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
