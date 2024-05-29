import React, {useRef, useState, FormEventHandler} from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import {useForm} from '@inertiajs/react';
import {PageProps} from "@/types";
import {Project} from "@/types/project";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UpdateProject({project, closeModal, auth}: PageProps<{
    project: Project;
    closeModal: () => void;
    auth: Object;

}>) {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        name: project.name,
    });

    const updateProject: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('projects.update', {project: project}), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {
            },
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6`}>
            <form onSubmit={updateProject} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Create Project
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Please fill out the form below to create a new project
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="name-project" value="Project Name"/>

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="..."
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        Edit
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
