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
        <section className="space-y-6 p-6 max-h-lvh overscroll-y-auto">
            <div className="h-100">
                <ReactJson
                    src={resource?.data?.data}
                    name={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    iconStyle={"circle"}
                    enableClipboard={false}
                />
            </div>


            <div className="flex justify-end">
                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
            </div>
        </section>
    );
}
