// Libraries
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

// Layouts
import { AppLayout } from '@/layouts/app-layout';

// Components
import { Heading, Subheading } from '@/components/ui/heading';
import { ErrorMessage, Field, Fieldset, Label } from '@/components/ui/fieldset';
import { Input } from '@/components/ui/input';
import { Upload } from '@/components/ui/upload';
import { Button } from '@/components/ui/button';

interface BookForm {
    title: string;
    author: string;
    cover: File | null;
}
export default function Create(): ReactNode {
    const {data, setData, post, errors, processing} = useForm<Required<BookForm>>({
        'title': '',
        'author': '',
        'cover': null
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('books.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Add Book" />
            <div className="max-w-6xl space-y-6">
                <Heading>Add new book</Heading>
                <Subheading>Add a book you are planning to read, have read, or are reading.</Subheading>

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
                        <Button type="submit" disabled={processing}>Add Book</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}
