// Libraries
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import { formatStatus } from '@/lib/utils';

// Types
import { Book } from '@/types/models';

// Layouts
import { AppLayout } from '@/layouts/app-layout';

// Components
import { Heading } from '@/components/ui/heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function Index({ books }: { books: Book[] }): ReactNode {
    return (
        <AppLayout>
            <Head title="Books"></Head>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center">
                    <Heading>Books</Heading>
                    <Button color="indigo" href={route('books.create')}>Add Book</Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Cover</TableHeader>
                            <TableHeader>Title</TableHeader>
                            <TableHeader>Author</TableHeader>
                            <TableHeader>Perusals</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id} href={route(`books.show`, {id: book.id})}>
                                <TableCell className="w-24">
                                    {book.cover ? (
                                        <img
                                            src={`/${book.cover}`}
                                            alt={`Cover of ${book.title}`}
                                            className="h-32 w-auto object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).parentElement!.innerHTML =
                                                    '<div class="h-32 w-24 bg-gray-200 flex items-center justify-center"><span class="text-gray-400">No Cover</span></div>';
                                            }}
                                        />
                                    ) : (
                                        <div className="h-32 w-24 bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-400">No Cover</span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>
                                    {book.perusals && book.perusals.map((perusal) => (
                                        <div>{formatStatus(perusal.status)}</div>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {books.length === 0 && (
                    <p className="text-gray-500">No books found. Add some books to get started!</p>
                )}
            </div>
        </AppLayout>
    );
}
