import {Link, useForm} from '@inertiajs/react';
import {PageProps} from '@/types';
import React, {useState} from "react";
import {Avatar} from "@/Components/avatar";
import {IconDotsVertical, IconEdit, IconFileExport, IconTrash} from "@tabler/icons-react";
import Dropdown from "@/Components/Dropdown";
import Modal from "@/Components/Modal";
import DeleteProject from "@/Pages/Projects/Components/DeleteProject";
import UpdateProject from "@/Pages/Projects/Components/UpdateProject";
import {Project} from "@/types/project";


export default function Projects({projects, auth}: PageProps<{
    projects: Array<any>
}>) {

    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false)
    const [showEditProject, setShowEditProject] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)


    const openEditProjectModal = (project: Project) => {
        setSelectedProject(project)
        setShowEditProject(true)
    }

    const openShowDeleteProjectModal = (project: Project) => {
        setSelectedProject(project)
        setShowDeleteProjectModal(true)
    }

    const closeShowDeleteProjectModal = () => {
        setShowDeleteProjectModal(false)
    }

    const closeEditProjectModal = () => {
        setShowEditProject(false)
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-2">
                {projects.map((project, i) => (
                    <div key={i}
                        // onClick={() => selected(icon.name)}
                         className="p-1 cursor-pointer flex items-center justify-between border rounded-lg border-gray-300 hover:shadow-md transition duration-200">
                        <Link className="flex items-center ml-2"
                        href={route('projects.show', {project: project})}
                        >
                            <div className="">
                                <Avatar auth={auth} avatar={project.avatar}/>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-lg">{project.name}</div>
                            </div>
                        </Link>

                        <div className="mr-4">
                            <Dropdown>
                                <div data-tooltip-id="project-actions" data-tooltip-content="Project actions">
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex hover:shadow-md items-center px-3 py-2 border border-gray-400 text-sm leading-4 font-medium rounded-full dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <IconDotsVertical size="20" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                </div>
                                <Dropdown.Content>
                                    <Dropdown.Button onClick={() => openEditProjectModal(project)}>
                                        <IconEdit size="20" /> <h6 className="ml-2">Edit</h6>
                                    </Dropdown.Button>
                                    <hr className="m-1"/>
                                    <Dropdown.Button onClick={() => openShowDeleteProjectModal(project)}>
                                        <IconTrash size="20" color="red" /> <h6 className="ml-2">Delete</h6>
                                    </Dropdown.Button>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showDeleteProjectModal} onClose={closeShowDeleteProjectModal} maxWidth="xl">
                <DeleteProject project={selectedProject} closeModal={closeShowDeleteProjectModal} auth={auth}/>
            </Modal>

            <Modal show={showEditProject} onClose={closeEditProjectModal} maxWidth="2xl">
                <UpdateProject project={selectedProject} closeModal={closeEditProjectModal} auth={auth}/>
            </Modal>
        </>
    );
}
