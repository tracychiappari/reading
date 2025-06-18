import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import { Heading, Subheading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, Label, ErrorMessage } from '@/components/ui/fieldset';

import { Dialog, DialogDescription, DialogTitle, DialogBody, DialogActions } from '@/components/ui/dialog';

export function DeleteUser() {
    let [isOpen, setIsOpen] = useState(false)

    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setIsOpen(false),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <div className="space-y-6">
            <Heading>Delete account</Heading>
            <Subheading>Delete your account and all of its resources</Subheading>
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
                </div>

                <Button type="button" onClick={() => setIsOpen(true)}>Delete account</Button>

                <Dialog open={isOpen} onClose={setIsOpen}>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                            to confirm you would like to permanently delete your account.
                        </DialogDescription>
                        <DialogBody>
                            <Field className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />
                                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                            </Field>
                        </DialogBody>
                        <DialogActions>
                            <Button plain onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button disabled={processing} type="submit">Delete account</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </div>
    );
}
