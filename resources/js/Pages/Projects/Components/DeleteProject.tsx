import {FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import {PageProps} from "@/types";
import {Project} from "@/types/project";

export default function DeleteProject({project, closeModal, auth}: PageProps<{
    project: Project | null;
    closeModal: () => void;
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

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('projects.destroy', {project: project}), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {},
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6`}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Delete Project
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete <span className="font-bold">{project ? project.name : ''}</span>?
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeDeleteModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Project
                        </DangerButton>
                    </div>
                </form>
        </section>
    );
}
