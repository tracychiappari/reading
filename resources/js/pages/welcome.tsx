import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button'

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome"></Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Button color="indigo" href={route('dashboard')}>Dashboard</Button>
                        ) : (
                            <>
                                <Button color="dark/white" plain href={route('login')}>Log in</Button>
                                <Button color="indigo" href={route('register')}>Register</Button>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">

                    </main>
                </div>
            </div>
        </>
    );
}
