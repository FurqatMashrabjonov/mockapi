import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import {PageProps} from '@/types';
import React, {useState} from "react";
import Projects from "@/Pages/Projects/Projects";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import {cn} from "@/utils/cn";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {IconPlus} from "@tabler/icons-react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Dashboard({auth, projects}: PageProps<{
    projects: Array<any>
}>) {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
    });

    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
        reset('name');
    };

    const openModal = () => {
        setShowModal(true);
    }


    const createProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('projects.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2
                className="flex font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}>
            <Head title="Projects"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-end">
                            <SecondaryButton onClick={openModal} disabled={showModal} className="rounded-full m-4">
                                <IconPlus className={cn("mr-2")}/> Create
                            </SecondaryButton>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 h-[30rem]">
                            {projects.length === 0 && (
                                <div className="text-center">
                                    <p className="text-lg font-medium">No projects found</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Create a new project to get
                                        started</p>
                                </div>
                            )}
                            <Projects projects={projects} auth={auth}/>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={createProject} className="p-6">
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
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>


        </AuthenticatedLayout>
    );
}
