import {Transition} from '@headlessui/react';
import {Head, useForm} from '@inertiajs/react';
import {FormEventHandler, useRef} from 'react';

import {SettingsLayout} from '@/layouts/settings/layout';

import {Heading, Subheading} from '@/components/ui/heading';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Field, Label, ErrorMessage} from '@/components/ui/fieldset';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {data, setData, errors, put, reset, processing, recentlySuccessful} = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <SettingsLayout>
            <Head title="Password settings"/>

            <div className="space-y-6">
                <Heading>Update password</Heading>
                <Subheading>Ensure your account is using a long, random password to stay secure</Subheading>

                <form onSubmit={updatePassword} className="space-y-6">
                    <Field className="grid gap-2">
                        <Label htmlFor="current_password">Current password</Label>

                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            placeholder="Current password"
                        />

                        {errors.current_password && <ErrorMessage>{errors.current_password}</ErrorMessage>}
                    </Field>

                    <Field className="grid gap-2">
                        <Label htmlFor="password">New password</Label>

                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="New password"
                        />

                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    </Field>

                    <Field className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>

                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="Confirm password"
                        />

                        {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}
                    </Field>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>Save password</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    );
}
