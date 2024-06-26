import {FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import {PageProps} from "@/types";
import {Project, Resource} from "@/types/project";
import toast from "react-hot-toast";
import {IconPlugConnectedX} from "@tabler/icons-react";

export default function DeleteResource({resource, closeModal, onDelete, auth}: PageProps<{
    resource: Resource | null;
    closeModal: () => void;
    onDelete: (deleted: boolean) => void;
    auth: Object;

}>) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm();

    const closeDeleteModal = () => {
        closeModal();
    }

    const deleteResource: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('resources.destroy', {resource: resource}), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
                onDelete(true);
            },
            onError: () => {
               onDelete(false);
            },
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6`}>
                <form onSubmit={deleteResource} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Delete Resource
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete <span className="font-bold">{resource ? resource.name : ''}</span>?
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeDeleteModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete
                        </DangerButton>
                    </div>
                </form>
        </section>
    );
}
