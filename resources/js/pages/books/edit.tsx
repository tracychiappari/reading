// Libraries
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

// Types
import { Book } from '@/types/models';

// Layouts
import { AppLayout } from '@/layouts/app-layout';

// Components
import { Heading, Subheading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Description, ErrorMessage, Field, Fieldset, Label } from '@/components/ui/fieldset';
import { Input } from '@/components/ui/input';
import { Upload } from '@/components/ui/upload';
import { DeleteBook } from '@/components/delete-book';

interface BookForm {
    _method: string;
    title: string;
    author: string;
    cover: File | null;
}

export default function Edit({ book }: { book: Book }): ReactNode {
    const {data, setData, post, errors, processing} = useForm<Required<BookForm>>({
        '_method': 'patch',
        'title': book.title,
        'author': book.author,
        'cover': null
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('books.update', {id: book.id}), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Book" />
            <div className="max-w-6xl space-y-6">
                <div className="flex justify-between items-center">
                    <Heading>Edit: {book.title}</Heading>
                    <Button color="indigo" href={route('books.show', {id: book.id})}>Back</Button>
                </div>
                <Subheading>Edit the book you are planning to read, have read, or are reading.</Subheading>

                <form onSubmit={submit} encType='multipart/form-data'>
                    <Fieldset className="space-y-6">
                        <Field>
                            <Label>Title</Label>
                            <Input
                                id='title'
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
                        </Field>
                        <Field>
                            <Label>Author</Label>
                            <Input
                                id='author'
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                                required
                            />
                            {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}
                        </Field>
                        <Field>
                            <Label>Cover</Label>
                            <Description>Leave blank if not changing the cover image.</Description>
                            <Upload
                                id='cover'
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setData('cover', file);
                                }}
                            />
                            {errors.cover && <ErrorMessage>{errors.cover}</ErrorMessage>}
                        </Field>
                    </Fieldset>
                    <div className="pt-6">
                        <Button type="submit" disabled={processing}>Update</Button>
                    </div>
                </form>
            </div>
            <DeleteBook book={book} />
        </AppLayout>
    )
}
