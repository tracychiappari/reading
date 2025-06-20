import {useForm, usePage} from '@inertiajs/react';
import {FormEventHandler} from "react";
import type {SharedData} from "@/types";

import { Avatar } from '@/components/ui/avatar';
import {Field, Label, ErrorMessage} from '@/components/ui/fieldset';
import {Button} from "@/components/ui/button";

type AvatarForm = {
    _method: string,
    avatar?: File | null;
};

export function UpdateAvatar() {
    const {auth} = usePage<SharedData>().props;

    const {data, setData, post, errors, progress} = useForm<AvatarForm>({
        _method: 'patch',
        avatar: null
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        post(route('avatar.update'), {
            preserveScroll: true
        });
    };

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            {auth.user.avatar && (
                <Avatar className="size-15" src={`/storage/${auth.user.avatar}`} />
            )}

            <Field>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setData('avatar', file);
                    }}
                    className="mb-2"
                />

                {errors.avatar && <ErrorMessage>{errors.avatar}</ErrorMessage>}
            </Field>

            <Button type="submit">
                {progress ? `Uploading... ${progress.percentage}%` : 'Upload Avatar'}
            </Button>
        </form>
    );
}
