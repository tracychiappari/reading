import {
    Navbar,
    NavbarItem,
    NavbarSection
} from "@/components/ui/navbar";
import {BookOpenIcon} from "@heroicons/react/16/solid";

export function AppNavbar(props: { onClick: () => void }) {
    return (
        <Navbar>
            <NavbarSection>
                <NavbarItem>
                    <BookOpenIcon className="size-8 text-indigo-500"/>
                </NavbarItem>
                <NavbarItem href={route("dashboard")}>Dashboard</NavbarItem>
            </NavbarSection>
        </Navbar>
    );
}
