import { Head } from '@inertiajs/react';
import { Heading } from '@/components/ui/heading';
import { AppLayout } from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface Book {
    id: number;
    title: string;
    author: string;
    cover: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    book: Book;
}

export default function Show({ book }: Props) {
    return (
        <AppLayout>
            <Head title="Book" />
            <div className="max-w-6xl">
                <div className="flex justify-between items-center">
                    <Heading>{book.title}</Heading>
                    <Button color="indigo" href={route('books.edit', {id: book.id})}>Edit Book</Button>
                </div>
                <div>
                    {book.cover && (
                        <img
                            src={`/${book.cover}`}
                            alt={`Cover of ${book.title}`}
                            className="h-32 w-auto object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).parentElement!.innerHTML =
                                    '<div class="h-32 w-24 bg-gray-200 flex items-center justify-center"><span class="text-gray-400">No Cover</span></div>';
                            }}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
