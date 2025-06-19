import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarSection
} from "@/components/ui/sidebar";
import {
    Dropdown,
    DropdownButton,
    DropdownMenu,
    DropdownItem,
    DropdownLabel,
    DropdownDivider
} from "@/components/ui/dropdown";
import {
    ArrowRightStartOnRectangleIcon,
    BookOpenIcon,
    ChevronUpIcon,
    Cog8ToothIcon
} from '@heroicons/react/16/solid';
import {Avatar} from "@/components/ui/avatar";

const getInitials = (fullName) => {
    const allNames = fullName.trim().split(' ');
    const initials = allNames.reduce((acc, curr, index) => {
        if(index === 0 || index === allNames.length - 1){
            acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
    }, '');
    return initials;
}

export function AppSidebar(props: { onClick: () => void }) {
    const { auth } = usePage<SharedData>().props;

    const initials = getInitials(auth.user.name);

    return (
        <Sidebar>
            <SidebarHeader>
                <BookOpenIcon className="size-8 text-indigo-500"/>
            </SidebarHeader>
            <SidebarBody>
                <SidebarSection>
                    <SidebarItem href={route("dashboard")}>Dashboard</SidebarItem>
                </SidebarSection>
            </SidebarBody>
            <SidebarFooter>
                <SidebarSection>
                    <Dropdown>
                        <DropdownButton as={SidebarItem}>
                            <span className="flex min-w-0 items-center gap-3">
                                <Avatar initials={initials} className="size-10" alt=""/>
                                <span className="min-w-0">
                                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{auth.user.name}</span>
                                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                      {auth.user.email}
                                    </span>
                                </span>
                            </span>
                            <ChevronUpIcon/>
                        </DropdownButton>
                        <DropdownMenu className="min-w-64" anchor="top start">
                            <DropdownItem href={route("profile.edit")}>
                                <Cog8ToothIcon/>
                                <DropdownLabel>Settings</DropdownLabel>
                            </DropdownItem>
                            <DropdownDivider/>
                            <DropdownItem method="post" href={route("logout")} onClick={props.onClick}>
                                <ArrowRightStartOnRectangleIcon/>
                                <DropdownLabel>Sign out</DropdownLabel>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </SidebarSection>
            </SidebarFooter>
        </Sidebar>
    );
}
