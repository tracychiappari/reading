import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Heading, Subheading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, Label, ErrorMessage } from '@/components/ui/fieldset';

import { Dialog, DialogDescription, DialogTitle, DialogBody, DialogActions } from '@/components/ui/dialog';

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

export function DeleteBook({book}: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const { setData, delete: destroy, processing, errors } = useForm<Required<{ confirm: string }>>({ confirm: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('books.destroy', { id: book.id }), {
            preserveScroll: true,
        });
    };

    return (
        <div className="mt-6 max-w-6xl space-y-6">
            <Heading>Delete book</Heading>
            <Subheading>Delete your book and all of its resources</Subheading>
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
                </div>

                <Button type="button" onClick={() => setIsOpen(true)}>Delete book</Button>

                <Dialog open={isOpen} onClose={setIsOpen}>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <DialogTitle>Are you sure you want to delete this book?</DialogTitle>
                        <DialogDescription>
                            Once your book is deleted, all of its associated data (including reading statuses and schedules)
                            will also be permanently deleted. Please type 'delete' in the following form field to confirm your action.
                        </DialogDescription>
                        <DialogBody>
                            <Field className="grid gap-2">
                                <Label htmlFor="confirm" className="sr-only">
                                    Confirm
                                </Label>
                                <Input
                                    id="confirm"
                                    onChange={(e) => setData('confirm', e.target.value)}
                                    placeholder="delete"
                                />
                                {errors.confirm && <ErrorMessage>{errors.confirm}</ErrorMessage>}
                            </Field>
                        </DialogBody>
                        <DialogActions>
                            <Button plain onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button disabled={processing} type="submit">Delete book</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </div>
    );
}
