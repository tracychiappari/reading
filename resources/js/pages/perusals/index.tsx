// Libraries
import { ReactNode } from 'react';
import { formatStatus } from '@/lib/utils';

// Types
import { Perusal } from '@/types/models';

// Layouts
import { AppLayout } from '@/layouts/app-layout';

// Components
import { Head } from '@inertiajs/react';
import { Heading } from '@/components/ui/heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ perusals }: { perusals: Perusal[] }): ReactNode {
    return (
        <AppLayout>
            <Head title="Perusals"></Head>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center">
                    <Heading>Perusals</Heading>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Book</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Started At</TableHeader>
                            <TableHeader>Finished At</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {perusals.map((perusal) => (
                            <TableRow key={perusal.id} href={route(`perusals.show`, {id: perusal.id})}>
                                <TableCell>{perusal.book.title}</TableCell>
                                <TableCell>{formatStatus(perusal.status)}</TableCell>
                                <TableCell>
                                    {perusal.started_at ? new Date(perusal.started_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : ''}
                                </TableCell>
                                <TableCell>
                                    {perusal.finished_at ? new Date(perusal.finished_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : ''}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {perusals.length === 0 && (
                    <p className="text-gray-500">No perusals found. Add some perusals to get started!</p>
                )}
            </div>
        </AppLayout>
    );
}
