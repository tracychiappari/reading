// Libraries
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

// Types
import { Book } from '@/types/models';

// Layouts
import { AppLayout } from '@/layouts/app-layout';

// Components
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

export default function Show({ book }: { book: Book }): ReactNode {
    return (
        <AppLayout>
            <Head title="Book" />
            <div className="max-w-6xl">
                <div className="flex justify-between items-center">
                    <Heading>{book.title}</Heading>
                    <div className="space-x-3">
                        <Button color="indigo" href={route('perusals.create', {'book_id': book.id})}>Add Perusal</Button>
                        <Button color="indigo" href={route('books.edit', {id: book.id})}>Edit Book</Button>
                    </div>
                </div>
                <div className="flex justify-start items-start">
                    <div className="p-6 pl-0">
                    {book.cover && (
                        <img
                            src={`/${book.cover}`}
                            alt={`Cover of ${book.title}`}
                            className="h-80 w-auto object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).parentElement!.innerHTML =
                                    '<div class="h-32 w-24 bg-gray-200 flex items-center justify-center"><span class="text-gray-400">No Cover</span></div>';
                            }}
                        />
                    )}
                    </div>
                    <div className="p-6">
                        {book.title} | {book.author}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
