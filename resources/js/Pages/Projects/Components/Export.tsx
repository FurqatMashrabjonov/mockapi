import {PageProps} from "@/types";
import SecondaryButton from "@/Components/SecondaryButton";
import Python from "@/Components/Icons/Python";
import React, {useEffect} from "react";
import Jetbrains from "@/Components/Icons/Jetbrains";
import Postman from "@/Components/Icons/Postman";
import Javascript from "@/Components/Icons/Javascript";
import Php from "@/Components/Icons/Php";
import Json from "@/Components/Icons/Json";
import ExportToolsContainer from "@/Components/ExportToolsContainer";
import CodeViewer from "@/Components/CodeViewer";
import {Project} from "@/types/project";
import {router} from "@inertiajs/react";


const icons = {
    languages: [
        // {
        //     name: 'Python',
        //     icon: <Python width={100}/>
        // },
        // {
        //     name: 'Javascript',
        //     icon: <Javascript width={100}/>
        // },
        // {
        //     name: 'Php',
        //     icon: <Php width={100}/>
        // },
    ],
    tools: [
        {
            name: 'Postman',
            icon: <Postman width={100}/>
        },
        {
            name: 'Jetbrains',
            icon: <Jetbrains width={100}/>
        },
        {
            name: 'Json',
            icon: <Json width={100}/>
        }
    ]
}

export function Export({project, closeModal, auth}: PageProps<{
    project: Project,
    closeModal: () => void,
}>) {

    const [selectedExportTool, setSelectedExportTool] = React.useState<string>('');

    const code = 'log("Hello World")';
    const closeExportModal = () => {
        closeModal();
    }

    const selected = (name: string) => {
        location.href = route('projects.export',
            {
                project: project.uuid,
                tool: name.toLowerCase()
            });
        setSelectedExportTool(name);
    }

    return (
        <section className={`space-y-6`}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Export
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Please select the format you would like to export the project in.
                    </p>

                    {/*<p className="mt-4 mb-1 text-gray-600 dark:text-gray-400">*/}
                    {/*    Programming Languages*/}
                    {/*</p>*/}

                    {/*<ExportToolsContainer icons={icons.languages} selected={selected} auth={auth}/>*/}

                    <p className="mt-4 mb-1 text-gray-600 dark:text-gray-400">
                        Tools
                    </p>

                    <ExportToolsContainer icons={icons.tools} selected={selected} auth={auth}/>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeExportModal}>Cancel</SecondaryButton>
                    </div>
                </div>

        </section>
    )
}
