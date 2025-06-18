import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { AuthLayout } from '@/layouts/auth-layout';

import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxField } from '@/components/ui/checkbox'
import { Fieldset, Field, Label } from '@/components/ui/fieldset'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Strong, Text, TextLink } from '@/components/ui/text'

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <form className="grid w-full max-w-sm grid-cols-1 gap-8" onSubmit={submit}>
                <Heading>Sign in to your account</Heading>
                <Field>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </Field>
                <Field>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </Field>
                <div className="flex items-center justify-between">
                    <CheckboxField>
                        <Checkbox
                            name="remember"
                            onClick={() => setData('remember', !data.remember)}
                        />
                        <Label>Remember me</Label>
                    </CheckboxField>
                    <Text>
                        <TextLink href="#">
                            <Strong>Forgot password?</Strong>
                        </TextLink>
                    </Text>
                </div>
                <Button color="indigo" type="submit" className="w-full">
                    Login
                </Button>
                <Text>
                    Don’t have an account?{' '}
                    <TextLink href={route('register')}>
                        <Strong>Register</Strong>
                    </TextLink>
                </Text>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
