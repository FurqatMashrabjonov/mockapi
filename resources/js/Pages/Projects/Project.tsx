import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {PageProps} from '@/types';
import React, {useEffect, useState} from "react";
import {Endpoint} from "@/Components/Endpoint";
import Relations from "@/Components/Relations";
import Modal from "@/Components/Modal";
import {CreateResource} from "@/Pages/Projects/Components/CreateResource";
import {IconBrandOpenai, IconPlus} from "@tabler/icons-react";
import SecondaryButton from "@/Components/SecondaryButton";
import {CreateResourcesByAI} from "@/Pages/Projects/Components/CreateResourcesByAI";
import {Project} from "@/types/project";
import Dropdown from "@/Components/Dropdown";
import {UpdateResource} from "@/Pages/Projects/Components/UpdateResource";

export default function Dashboard({project, maxFields, auth, edges, nodes}: PageProps<{
    project: Project,
    fields: Object,
    maxFields: number,
    edges: Array<any>,
    nodes: Array<any>,
}>) {
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showAIGenerateModal, setShowAIGenerateModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }

    const openModal = () => {
        setShowModal(true)
    }

    const closeUpdateModal = () => {
        setShowUpdateModal(false)
    }

    const openUpdateModal = () => {
        setShowUpdateModal(true)
    }

    const openAIGenerateModal = () => {
        setShowAIGenerateModal(true)
    }

    const closeAIGenerateModal = () => {
        setShowAIGenerateModal(false)
    }

    const {data, setData, post, processing, errors, reset} = useForm({
        project_uuid: project.uuid,
        resource_description: 'this is simple shopping list app',
    });

    const generateAI = (e: React.FormEvent<HTMLFormElement>) => {

        post(route('resources.generate.ai'), {
            preserveScroll: true
        });
    }

    const generateAll = () => {
        post(route('data.generate-all', {project: project}), {
            preserveScroll: true
        });
    }

    const resetAll = () => {
        post(route('data.reset-all', {project: project}), {
            preserveScroll: true
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Projects / {project.name}

            </h2>}
        >
            <Head title={project.name}/>

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto whitespace-nowrap mx-auto">
                            <Endpoint projectUUID={project.uuid} auth={auth}/>
                            <div className="flex justify-end">
                                <SecondaryButton onClick={generateAll}>
                                    Generate All
                                </SecondaryButton>

                                <SecondaryButton onClick={resetAll} className="ml-2">
                                    Reset All
                                </SecondaryButton>

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md ml-2">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                Export

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="m-6 flex justify-between">
                            <h2 className="font-semibold mb-2 text-lg dark:text-gray-800">
                                Resources
                            </h2>
                            <div>
                                <SecondaryButton onClick={openModal}>
                                    <IconPlus size={15}/> &nbsp; Create
                                </SecondaryButton>
                                <SecondaryButton className="ml-2" onClick={openAIGenerateModal}>
                                    <IconBrandOpenai size={15}/> &nbsp; Generate With AI
                                </SecondaryButton>
                            </div>
                        </div>
                        <div className="pl-6 pr-6 text-gray-900 dark:text-gray-100">
                            {project.resources.length === 0 &&
                                <div className="text-center">
                                    <p className="text-lg font-medium">No resource found</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Create a new resource to get
                                        started</p>
                                </div>
                            }
                            <Relations resources={project.resources} auth={auth} nodeConnections={nodes} edgeConnections={edges}/>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={closeModal} maxWidth="5xl">
                <CreateResource project={project} maxFields={maxFields} auth={auth} closeModal={closeModal}/>
            </Modal>

            <Modal show={showAIGenerateModal} onClose={closeAIGenerateModal} maxWidth="5xl">
                <CreateResourcesByAI project={project} closeModal={closeAIGenerateModal} auth={auth}/>
            </Modal>
        </AuthenticatedLayout>
    );
}
