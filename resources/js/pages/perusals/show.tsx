// Libraries
import { ReactNode } from 'react';

// Types
import { Perusal } from '@/types/models';
import { Head } from '@inertiajs/react';

// Layouts
import { AppLayout } from '@/layouts/app-layout';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { formatStatus } from '@/lib/utils';

// Components

export default function Show({ perusal }: { perusal: Perusal}): ReactNode
{
    return (
        <AppLayout>
            <Head title="Book" />
            <div className="max-w-6xl">
                <div className="flex justify-between items-center">
                    <Heading>{formatStatus(perusal.status)} for {perusal.book.title}</Heading>
                    <Button color="indigo" href={route('perusals.edit', {id: perusal.id})}>Edit Perusal</Button>
                </div>
            </div>
        </AppLayout>
    );
}
