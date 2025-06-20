import {Transition} from '@headlessui/react';
import {Head, useForm, usePage} from '@inertiajs/react';
import {FormEventHandler} from 'react';

import {type SharedData} from '@/types';

import {SettingsLayout} from '@/layouts/settings/layout';

import {DeleteUser} from '@/components/delete-user'

import {Link} from '@/components/ui/link'
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Fieldset, Field, Label, ErrorMessage} from '@/components/ui/fieldset';
import {Heading, Subheading} from '@/components/ui/heading'
import {UpdateAvatar} from "@/components/update-avatar";

type ProfileForm = {
    name: string;
    email: string;
};

export default function Profile({mustVerifyEmail, status}: { mustVerifyEmail: boolean; status?: string }) {
    const {auth} = usePage<SharedData>().props;

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <SettingsLayout>
            <Head title="Profile settings"/>

            <div className="space-y-6">
                <Heading>Profile information</Heading>
                <Subheading>Update your name and email address</Subheading>

                <form onSubmit={submit}>
                    <Fieldset className="space-y-6">
                        <Field>
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            {errors.name && <ErrorMessage className="mt-2">{errors.name}</ErrorMessage>}
                        </Field>

                        <Field>
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            {errors.email && <ErrorMessage className="mt-2">{errors.email}</ErrorMessage>}
                        </Field>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}
                    </Fieldset>
                    <div className="pt-6">
                        <Button type="submit" disabled={processing}>Save</Button>

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

            <UpdateAvatar/>

            <DeleteUser/>
        </SettingsLayout>
    );
}
