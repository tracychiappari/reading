import {AppLayout} from "@/layouts/app-layout";
import {Head} from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard"/>
            <div className="max-w-6xl">Contents</div>
        </AppLayout>
    )
}
