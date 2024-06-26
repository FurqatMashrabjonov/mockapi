import React, {FormEventHandler, useEffect} from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import {useForm} from '@inertiajs/react';
import {PageProps} from "@/types";
import {Project, Resource} from "@/types/project";
import toast from "react-hot-toast";
import {IconDatabase, IconDatabasePlus, IconDatabaseX, IconPlugConnectedX} from "@tabler/icons-react";
import ReactJson from "react-json-view";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ResourceData({resource, closeModal, auth}: PageProps<{
    resource: any;
    auth: Object;
    closeModal: () => void;
}>) {

    return (
        <section className="space-y-6 max-h-screen">
            <div className="p-6 max-h-screen">
                <ReactJson
                    src={resource?.data}
                    name={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    iconStyle={"circle"}
                    enableClipboard={false}
                />
            </div>


            <div className="mt-6 flex justify-end position-fixed bottom-0 left-0">
                <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
            </div>
        </section>
    );
}
