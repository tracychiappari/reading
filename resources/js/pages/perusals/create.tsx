// Libraries
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

// Types
import { Book } from '@/types/models';

// Layouts
import { AppLayout } from '@/layouts/app-layout';

// Components
import { Heading, Subheading } from '@/components/ui/heading';
import { ErrorMessage, Field, Fieldset, Label } from '@/components/ui/fieldset';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

interface PerusalForm {
    book_id: number;
    status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
    started_at: string | null;
    finished_at: string | null;
}

export default function Create({ book }: { book: Book }): ReactNode {
    const { data, setData, post, errors, processing } = useForm<Required<PerusalForm>>({
        book_id: book.id,
        status: 'not_started',
        started_at: null,
        finished_at: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('perusals.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Add Reading Status" />
            <div className="max-w-6xl space-y-6">
                <Heading>Add Reading Status</Heading>
                <Subheading>Track your reading progress for "{book.title}"</Subheading>

                <form onSubmit={submit}>
                    <Fieldset className="space-y-6">
                        <Field>
                            <Label>Status</Label>
                            <Select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as PerusalForm['status'])}
                            >
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="abandoned">Abandoned</option>
                            </Select>
                            {errors.status && <ErrorMessage>{errors.status}</ErrorMessage>}
                        </Field>

                        {data.status !== 'not_started' && (
                            <Field>
                                <Label>Started At</Label>
                                <Input
                                    type="date"
                                    id="started_at"
                                    value={data.started_at || ''}
                                    onChange={(e) => setData('started_at', e.target.value)}
                                />
                                {errors.started_at && <ErrorMessage>{errors.started_at}</ErrorMessage>}
                            </Field>
                        )}

                        {(data.status === 'completed' || data.status === 'abandoned') && (
                            <Field>
                                <Label>Finished At</Label>
                                <Input
                                    type="date"
                                    id="finished_at"
                                    value={data.finished_at || ''}
                                    onChange={(e) => setData('finished_at', e.target.value)}
                                />
                                {errors.finished_at && <ErrorMessage>{errors.finished_at}</ErrorMessage>}
                            </Field>
                        )}
                    </Fieldset>
                    <div className="pt-6">
                        <Button type="submit" disabled={processing}>Add Reading Status</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
