import {Head} from '@inertiajs/react';

import {SettingsLayout} from '@/layouts/settings/layout';

import {Heading, Subheading} from '@/components/ui/heading'

export default function Export() {
    return (
        <SettingsLayout>
            <Head title="Export data"/>

            <div className="space-y-6">
                <Heading>Export data</Heading>
                <Subheading></Subheading>
            </div>
        </SettingsLayout>
    );
}
