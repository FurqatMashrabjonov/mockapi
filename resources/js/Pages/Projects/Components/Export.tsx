import {PageProps} from "@/types";
import SecondaryButton from "@/Components/SecondaryButton";
import Python from "@/Components/Icons/Python";
import React from "react";
import Jetbrains from "@/Components/Icons/Jetbrains";
import Postman from "@/Components/Icons/Postman";
import Javascript from "@/Components/Icons/Javascript";
import Php from "@/Components/Icons/Php";
import Json from "@/Components/Icons/Json";
import ExportToolsContainer from "@/Components/ExportToolsContainer";

const icons = {
    languages: [
        {
            name: 'Python',
            icon: <Python width={100}/>
        },
        {
            name: 'Javascript',
            icon: <Javascript width={100}/>
        },
        {
            name: 'Php',
            icon: <Php width={100}/>
        },
    ],
    tools: [
        {
            name: 'Jetbrains',
            icon: <Jetbrains width={100}/>
        },
        {
            name: 'Postman',
            icon: <Postman width={100}/>
        },
    ]
}

export function Export({project, closeModal, auth}: PageProps<{
    project: Object,
    closeModal: () => void,
}>) {

    const closeExportModal = () => {
        closeModal();
    }

    return (
        <section className={`space-y-6`}>
            <form className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Export
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Please select the format you would like to export the project in.
                </p>

                <p className="mt-4 mb-1 text-gray-600 dark:text-gray-400">
                    Programming Languages
                </p>

                <ExportToolsContainer icons={icons.languages}  auth={auth}/>

                <p className="mt-4 mb-1 text-gray-600 dark:text-gray-400">
                    Tools
                </p>

                <ExportToolsContainer icons={icons.tools}  auth={auth}/>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeExportModal}>Cancel</SecondaryButton>
                </div>
            </form>
        </section>
    )
}
