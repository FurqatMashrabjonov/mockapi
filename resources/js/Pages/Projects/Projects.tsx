import {Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import React from "react";
import {BentoGrid, BentoGridItem} from "@/Components/ui/bento-grid";
import {Avatar} from "@/Components/avatar";
import Dropdown from "@/Components/Dropdown";
import {IconDotsVertical, IconEdit, IconFileExport, IconTrash} from "@tabler/icons-react";
import {Tooltip} from "react-tooltip";

export default function Projects({projects, auth}: PageProps<{
    projects: Array<any>
}>) {

    return (
        <>
                {projects.map((project, i) => (
                    <Link href={route('projects.show', {project: project})} key={i} className="m-1" >
                        <BentoGridItem
                            key={i}
                            title={project.name}
                            description={project.created_at_human}
                            header={<Avatar avatar={project.avatar} auth={auth}/>}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
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
                                <Dropdown.Button>
                                    <IconEdit size="20" /> <h6 className="ml-2">Edit</h6>
                                </Dropdown.Button>
                                <Dropdown.Button >
                                    <IconFileExport size="20" /> <h6 className="ml-2">Export Postman</h6>
                                </Dropdown.Button>
                                <hr className="m-1"/>
                                <Dropdown.Button >
                                    <IconTrash size="20" color="red" /> <h6 className="ml-2">Delete</h6>
                                </Dropdown.Button>
                            </Dropdown.Content>
                        </Dropdown>
                        <Tooltip
                            id="project-actions"
                            style={{backgroundColor: '#1f2937', color: 'white'}}
                            place="bottom"
                        />
                    </Link>
                ))}
        </>
    );
}
