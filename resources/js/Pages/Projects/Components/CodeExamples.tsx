import {PageProps} from "@/types";
import SecondaryButton from "@/Components/SecondaryButton";
import Python from "@/Components/Icons/Python";
import React from "react";
import Javascript from "@/Components/Icons/Javascript";
import Php from "@/Components/Icons/Php";
import ExportToolsContainer from "@/Components/ExportToolsContainer";
import CodeViewer from "@/Components/CodeViewer";
import {Project} from "@/types/project";
import axios from "axios";
import {useForm} from "@inertiajs/react";


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
}


export function CodeExamples({project, closeModal, auth}: PageProps<{
    project: Project,
    closeModal: () => void,
}>) {

    const [selectedLanguage, setSelectedLanguage] = React.useState<string>('');
    const [code, setCode] = React.useState<string>('');
    const {data, setData, post, processing, errors, reset} = useForm({
        project: project,
        language: selectedLanguage
    });

    const closeExportModal = () => {
        closeModal();
    }

    const selected = (language: string) => {
        setSelectedLanguage(String(language).toLowerCase())
        data.language = selectedLanguage
        getCode(selectedLanguage)

    }

    const getCode = (language: string) => {
        post(route('projects.code-example'), {
            onSuccess: (response) => {
                console.log(response)
            }
        },)
    }

    return (
        <section className={`space-y-6`}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Code Examples
                </h2>

                <p className="mt-1 mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Please select the format you would like to see the code examples in.
                </p>

                {code && <CodeViewer code={code} language={selectedLanguage} auth={auth}/>}
                {!code && <ExportToolsContainer icons={icons.languages} selected={selected} auth={auth}/>}

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeExportModal}>Cancel</SecondaryButton>
                </div>
            </div>

        </section>
    )
}
