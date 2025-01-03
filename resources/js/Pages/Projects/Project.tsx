import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import {PageProps} from '@/types';
import React, {useEffect, useState} from "react";
import {Endpoint} from "@/Components/Endpoint";
import Relations from "@/Components/Relations";
import Modal from "@/Components/Modal";
import {CreateResource} from "@/Pages/Projects/Components/CreateResource";
import {
    IconBrandOpenai,
    IconDotsVertical, IconEdit, IconFileExport,
    IconPlus,
    IconTrash
} from "@tabler/icons-react";
import SecondaryButton from "@/Components/SecondaryButton";
import {CreateResourcesByAI} from "@/Pages/Projects/Components/CreateResourcesByAI";
import {Project} from "@/types/project";
import Dropdown from "@/Components/Dropdown";
import toast from "react-hot-toast";
import axios from "axios";
import {Tooltip} from "react-tooltip";
import DeleteProject from "@/Pages/Projects/Components/DeleteProject";
import UpdateProject from "@/Pages/Projects/Components/UpdateProject";
import {Export} from "@/Pages/Projects/Components/Export";
import {EndpointType} from "@/types/endpoint";
import ConnectResourceTo from "@/Pages/Projects/Components/ConnectReosurceTo";
import ResourceData from "@/Pages/Projects/Components/ResourceData";

export default function Dashboard({project, max_fields, max_resources, endpoint, auth}: PageProps<{
    fields: Object,
    max_fields: number,
    max_resources: number,
    project: Project,
    endpoint: EndpointType,
}>) {
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false)
    const [showExportModal, setShowExportModal] = useState(false)
    const [showAIGenerateModal, setShowAIGenerateModal] = useState(false)
    const [showEditProject, setShowEditProject] = useState(false)
    const [showConnectResourceTo, setShowConnectResourceTo] = useState(false)
    const [resources, setResources] = useState([])
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [currentResource, setCurrentResource] = useState(null)
    const [showResourceData, setShowResourceData] = useState(false)
    const [showCodeExamples, setShowCodeExamples] = useState(false)
    const {data, setData, post, processing, errors, reset} = useForm({
        project_uuid: project.uuid,
        resource_description: 'this is simple shopping list app',
    });

    const closeModal = () => {
        setShowModal(false)
        getResources()
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
        getResources()
    }

    const closeShowDeleteProjectModal = () => {
        setShowDeleteProjectModal(false)
    }

    const closeEditProjectModal = () => {
        setShowEditProject(false)
    }

    const openExportModal = () => {
        setShowExportModal(true)
    }

    const closeExportModal = () => {
        setShowExportModal(false)
    }

    const openConnectResourceTo = () => {
        setShowConnectResourceTo(true)
    }

    const closeConnectResourceTo = () => {
        setShowConnectResourceTo(false)
    }

    const currentResourceSelected = (resource: any) => {
        setCurrentResource(resource)
        openConnectResourceTo()
    }

    const openResourceData = () => {
        setShowResourceData(true)
    }

    const closeResourceData = () => {
        setShowResourceData(false)
    }

    const openCodeExamples = () => {
        setShowCodeExamples(true)
    }

    // const closeCodeExamples = () => {
    //     setShowCodeExamples(false)
    // }

    const setResourceData = (resource: any) => {
        setCurrentResource(resource)
        openResourceData()
    }

    const onDeleteResource = (deleted: boolean) => {
        if (deleted) {
            toast.success('Resource deleted successfully')
            getResources()
        }else {
            toast.error('Failed to delete resource')
        }
    }

    const getResources = () => {
        axios.get(route('resources.index', {project: project}))
            .then(r => {
                setResources(r.data.data.resources)
                setNodes(r.data.data.nodes)
                setEdges(r.data.data.edges)
            })
    }

    const connectResources = (source: string | null, destination: string | null) => {
        router.post(route('relations.connect'), {
            source: source,
            destination: destination,
        }, {
            onSuccess: () => {
                toast.success('Connected')
                getResources()
                closeConnectResourceTo()
            },
            onError: () => {
                toast.error('Failed to connect');
            }
        });
    }

    useEffect(() => {
        getResources()
    }, [])

    const generateAll = () => {
        try {
            post(route('data.generate-all', {project: project}), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Resources generated successfully')
                    getResources()
                },
                onError: () => {
                    toast.error('Error generating ')
                }
            });
        } catch (e) {
            toast.error('Error generating data')
        }
    }

    const resetAll = () => {
        post(route('data.reset-all', {project: project}), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Resources reset successfully')
                getResources()
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                <div className="flex items-center">
                    <div>
                        Projects /
                    </div>
                    <div className="ml-2">
                        {project.name}
                    </div>
                    <div className="ml-2">
                        <Dropdown>
                            <div data-tooltip-id="project-actions"  data-tooltip-content="Project actions">
                                <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-gray-400 text-sm leading-4 font-medium rounded-full dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <IconDotsVertical size="20" />
                                            </button>
                                        </span>
                                </Dropdown.Trigger>

                            </div>
                            <Dropdown.Content>
                                <Dropdown.Button onClick={() => setShowEditProject(true)}>
                                    <IconEdit size="20" /> <h6 className="ml-2">Edit</h6>
                                </Dropdown.Button>
                                <Dropdown.Button onClick={openExportModal}>
                                    <IconFileExport size="20" /> <h6 className="ml-2">Export</h6>
                                </Dropdown.Button>
                                {/*<Dropdown.Button onClick={openCodeExamples}>*/}
                                {/*    <IconCode size="20" /> <h6 className="ml-2">Code Examples</h6>*/}
                                {/*</Dropdown.Button>*/}
                                <hr className="m-1"/>
                                <Dropdown.Button onClick={() => setShowDeleteProjectModal(true)}>
                                    <IconTrash size="20" color="red" /> <h6 className="ml-2">Delete</h6>
                                </Dropdown.Button>
                            </Dropdown.Content>
                        </Dropdown>
                        <Tooltip
                            id="project-actions"
                            style={{backgroundColor: '#1f2937', color: 'white'}}
                            place="bottom"
                        />
                    </div>
                </div>

            </h2>}
        >
            <Head title={project.name}/>

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto whitespace-nowrap mx-auto">
                            <Endpoint projectUUID={project.uuid} endpoint={endpoint} auth={auth}/>
                            <div className="flex justify-end mt-2">
                                <SecondaryButton type="button" onClick={generateAll}>
                                    Generate All
                                </SecondaryButton>

                                <SecondaryButton type="button" onClick={resetAll} className="ml-2">
                                    Reset All
                                </SecondaryButton>
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
                                <SecondaryButton disabled={resources.length >= max_resources} onClick={() => setShowModal(true)}>
                                    <IconPlus size={15}/> &nbsp; Create ({max_resources - resources.length})
                                </SecondaryButton>
                                <SecondaryButton className="ml-2" disabled={resources.length == 5} onClick={openAIGenerateModal}>
                                    <IconBrandOpenai size={15}/> &nbsp; Generate With AI
                                </SecondaryButton>
                            </div>
                        </div>
                        <div className="pl-6 pr-6 text-gray-900 dark:text-gray-100">
                            {resources.length === 0 &&
                                <div className="text-center">
                                    <p className="text-lg font-medium">No resource found</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Create a new resource to get
                                        started</p>
                                </div>
                            }
                            <Relations
                                auth={auth}
                                nodeConnections={nodes}
                                edgeConnections={edges}
                                deleteResource={onDeleteResource}
                                setCurrentResource={currentResourceSelected}
                                connectResources={connectResources}
                                showResourceData={setResourceData}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={closeModal} maxWidth="5xl">
                <CreateResource project={project} maxFields={max_fields} auth={auth} closeModal={closeModal}/>
            </Modal>

            <Modal show={showAIGenerateModal} onClose={closeAIGenerateModal} maxWidth="5xl">
                <CreateResourcesByAI project={project} closeModal={closeAIGenerateModal} auth={auth}/>
            </Modal>

            <Modal show={showDeleteProjectModal} onClose={closeShowDeleteProjectModal} maxWidth="xl">
                <DeleteProject project={project} closeModal={closeShowDeleteProjectModal} auth={auth}/>
            </Modal>

            <Modal show={showEditProject} onClose={closeEditProjectModal} maxWidth="2xl">
                <UpdateProject project={project} closeModal={closeEditProjectModal} auth={auth}/>
            </Modal>

            <Modal show={showExportModal} onClose={closeExportModal} maxWidth="4xl">
                <Export project={project} closeModal={closeExportModal} auth={auth}/>
            </Modal>

            {/*<Modal show={showCodeExamples} onClose={closeCodeExamples} maxWidth="4xl">*/}
            {/*    <CodeExamples project={project} closeModal={closeCodeExamples} auth={auth}/>*/}
            {/*</Modal>*/}

            <Modal show={showConnectResourceTo} onClose={closeConnectResourceTo} maxWidth="xl">
                <ConnectResourceTo resources={resources} currentResource={currentResource} connectResources={connectResources} auth={auth}/>
            </Modal>

            <Modal show={showResourceData} onClose={closeResourceData} maxWidth="xl">
                <ResourceData closeModal={closeResourceData} resource={currentResource} auth={auth} />
            </Modal>

        </AuthenticatedLayout>
    );
}
