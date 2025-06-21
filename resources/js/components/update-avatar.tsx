import {useForm, usePage} from '@inertiajs/react';
import {FormEventHandler} from "react";
import type {SharedData} from "@/types";

import { Avatar } from '@/components/ui/avatar';
import { Field, ErrorMessage, Label } from '@/components/ui/fieldset';
import {Button} from "@/components/ui/button";
import { Upload } from '@/components/ui/upload';
import { Heading, Subheading } from '@/components/ui/heading';

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
        <div className="space-y-6">
            <Heading>Avatar</Heading>
            <Subheading>Upload image to use as your avatar.</Subheading>

            <form onSubmit={submit} encType="multipart/form-data">
                {auth.user.avatar && (
                    <Avatar className="size-15 mb-6" src={`/storage/${auth.user.avatar}`} />
                )}

                <Field>
                    <Upload
                        id="avatar"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setData('avatar', file);
                        }}
                    />
                    {errors.avatar && <ErrorMessage>{errors.avatar}</ErrorMessage>}
                </Field>

                <div className="pt-6">
                    <Button type="submit">
                        {progress ? `Uploading... ${progress.percentage}%` : 'Upload Avatar'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
