import {PageProps} from "@/types";
import SecondaryButton from "@/Components/SecondaryButton";
import Python from "@/Components/Icons/Python";
import React, {useState} from "react";
import Javascript from "@/Components/Icons/Javascript";
import Php from "@/Components/Icons/Php";
import CodeViewer from "@/Components/CodeViewer";
import {Project} from "@/types/project";
import axios from "axios";

type Icon = {
    name: string;
    icon: any;
}

const icons: Icon[] = [

    {
        name: 'python',
        icon: <Python width={100}/>
    },
    {
        name: 'javascript',
        icon: <Javascript width={100}/>
    },
    {
        name: 'php',
        icon: <Php width={100}/>
    },
]


export function CodeExamples({project, closeModal, auth}: PageProps<{
    project: Project,
    closeModal: () => void,
}>) {

    const [lang, setLang] = useState('');
    const [code, setCode] = React.useState<string>('');

    const closeExportModal = () => {
        closeModal();
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

                {code && <CodeViewer code={code} language={lang} auth={auth}/>}
                {!code && (
                    <div className="grid grid-cols-4 gap-1">
                        {/*{icons.map((icon, index) => (*/}
                        {/*    <div key={index}*/}
                        {/*         onClick={() => languageSelected(icon.name)}*/}
                        {/*         className="p-1 cursor-pointer flex flex-col border rounded-lg border-gray-300 hover:shadow-lg transition duration-200">*/}
                        {/*        <div className="flex justify-center">*/}
                        {/*            {icon.icon}*/}
                        {/*        </div>*/}
                        {/*        <p className="mt-1 text-center  text-gray-600 dark:text-gray-400">*/}
                        {/*            {icon.name}*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*))}*/}


                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeExportModal}>Cancel</SecondaryButton>
                </div>
            </div>

        </section>
    )
}
