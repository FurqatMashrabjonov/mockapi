import {PageProps} from "@/types";
import React, {useEffect, useState} from "react";
import {useForm} from "@inertiajs/react";
import {Project} from "@/types/project";
import axios from "axios";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import toast from "react-hot-toast";

export function CreateResourcesByAI({project, closeModal, auth}: PageProps<{
    project: Project,
    closeModal: () => void,
}>) {

    const {data, setData, post, processing, errors, reset} = useForm({
        project_uuid: project.uuid,
        resource_description: 'This is a simple "' + project.name + '" app',
    });


    const generateResources = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post(route('resources.generate.ai'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
                toast.success('Resources generated successfully by AI')
            }
        });
    }

    return  (
        <form onSubmit={generateResources} className="p-6 overflow-y-scroll"
              style={{maxHeight: '100vh', overflowY: 'auto'}}>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Generate Resources by AI
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Please provide a brief description of your project below. This will help us better understand your goals
                and requirements.
            </p>
            {/*<span className="mt-1 text-sm text-gray-600 dark:text-gray-400 bg-red-100 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 border border-red-400">*/}
            {/*    Note that AI is capable of errors!*/}
            {/*</span>*/}
            <div className="mt-6">
                <InputLabel htmlFor="resource-description" value="Resource Name"/>

                <textarea
                    id="resource-description"
                    name="name"
                    value={data.resource_description}
                    onChange={(e) => setData('resource_description', e.target.value)}
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-3/4"
                    autoComplete="off"
                    placeholder="Example: users, posts, comments"
                />

                <InputError message={errors.resource_description} className="mt-2"/>
            </div>


            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                <PrimaryButton className="ms-3" disabled={processing}>
                    Generate
                </PrimaryButton>
            </div>
        </form>
    )
}
