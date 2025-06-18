import {Head, useForm} from '@inertiajs/react';
import {LoaderCircle} from 'lucide-react';
import {FormEventHandler} from 'react';

import {AuthLayout} from '@/layouts/auth-layout';

import {TextLink} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Field, Label, ErrorMessage} from '@/components/ui/fieldset';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register"/>
            <form className="grid w-full max-w-sm grid-cols-1 gap-6" onSubmit={submit}>
                <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Full name"
                    />
                    {errors.name && <ErrorMessage className="mt-2">{errors.name}</ErrorMessage>}
                </Field>

                <Field>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        placeholder="email@example.com"
                    />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </Field>

                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={3}
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        placeholder="Password"
                    />
                    {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </Field>

                <Field>
                    <Label htmlFor="password_confirmation">Confirm password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        required
                        tabIndex={4}
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        placeholder="Confirm password"
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}
                </Field>

                <Button type="submit" color="indigo" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin"/>}
                    Create account
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
