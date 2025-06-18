import {
    Sidebar,
    SidebarBody,
    SidebarHeader,
    SidebarHeading,
    SidebarItem,
    SidebarSection
} from "@/components/ui/sidebar";
import {BookOpenIcon} from "@heroicons/react/16/solid";

export function AppSidebar(props: { onClick: () => void }) {
    return (
        <Sidebar>
            <SidebarHeader>
                <BookOpenIcon className="size-8 text-indigo-500"/>
            </SidebarHeader>
            <SidebarBody>
                <SidebarSection>
                    <SidebarItem href={route("home")}>Home</SidebarItem>
                    <SidebarItem href={route("dashboard")}>Dashboard</SidebarItem>
                </SidebarSection>
                <SidebarSection>
                    <SidebarHeading>User</SidebarHeading>
                    <SidebarItem href={route("profile.edit")}>Profile</SidebarItem>
                    <SidebarItem method="post" href={route("logout")} onClick={props.onClick}>Logout</SidebarItem>
                </SidebarSection>
            </SidebarBody>
        </Sidebar>
    );
}
