import React, {FormEventHandler, useEffect} from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import {useForm} from '@inertiajs/react';
import {PageProps} from "@/types";
import {Project, Resource} from "@/types/project";
import toast from "react-hot-toast";
import {IconDatabase, IconDatabasePlus, IconDatabaseX, IconPlugConnectedX} from "@tabler/icons-react";

export default function ConnectResourceTo({resources, currentResource, connectResources, auth}: PageProps<{
    resources: Resource[];
    currentResource: Resource | null;
    connectResources: (source: string | null, destination: string | null) => void;
    auth: Object;
}>) {

    return (
        <section className={`space-y-6`}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Connect Resource
                </h2>

                <p className="mt-2 mb-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    After connecting and disconnecting resources, you will lose data!
                </p>

                <p className="mt-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Disconnect <span className="font-bold">'{currentResource?.name}'</span> and connect to root.
                </p>

                <div className="flex gap-2 flex-col mt-2 mb-4">
                    <div key={Math.random() * 1000 + 5}
                         className="flex items-center justify-between p-4 border bg-white rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-4">
                                <IconDatabaseX size={24}/>
                                <div>
                                    <p className="text-md">root</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SecondaryButton
                                disabled={currentResource === null || currentResource?.parent_id === null}
                                onClick={() => connectResources(String(currentResource?.id), null)}>Disconnect</SecondaryButton>
                        </div>
                    </div>
                </div>

                <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Connect <span className="font-bold">'{currentResource?.name}'</span> to ...
                </p>

                <div className="flex gap-2 flex-col mt-4">
                    {resources.map((resource, index) => (
                        <div key={index}
                            // style={{'opacity': currentResource?.id === resource.id ? 0.5 : 1}}
                             className="flex items-center justify-between p-4 border bg-white rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-4">
                                    <IconDatabasePlus size={24}/>
                                    <div>
                                        <p className="text-md">{resource.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <SecondaryButton
                                    disabled={currentResource?.id === resource.id ||
                                        currentResource === null ||
                                        currentResource?.parent_id === resource.id ||
                                        currentResource?.id === resource.parent_id
                                    }
                                    onClick={() => connectResources(String(currentResource?.id), String(resource.id))}>Connect</SecondaryButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
