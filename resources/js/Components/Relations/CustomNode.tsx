import React, {memo, useState} from 'react';
import {Handle, NodeProps, NodeToolbar, Position} from 'reactflow';
import Modal from "@/Components/Modal";
import {UpdateResource} from "@/Pages/Projects/Components/UpdateResource";
import {
    IconDatabase,
    IconEdit,
    IconHierarchy2,
    IconPlugConnected,
    IconPlugConnectedX,
    IconTrash
} from "@tabler/icons-react";
import DeleteResource from "@/Pages/Projects/Components/DeleteResource";


function CustomNode({data: {resource, rest_api_doc, onDeleteResource, onResourceSelected, showData, auth}}: NodeProps) {

    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const openUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <NodeToolbar
                isVisible={true}
                position={Position.Top}
            >
                <div className="flex justify-between">
                    <span className="block font-semibold text-md text-center text-gray-700 dark:text-gray-300">{resource.name}</span>
                </div>
            </NodeToolbar>
            <div className="cursor-pointer"
                 onMouseEnter={() => setIsToolbarVisible(true)}
                 onMouseLeave={() => setIsToolbarVisible(false)}
                 >
                <Handle
                    style={{}}
                    type="target"
                    position={Position.Right}/>
                <div
                    style={{width: '12vh', height: '4vh'}}
                    className="inline-flex justify-between items-center px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-center text-gray-700 dark:text-gray-300 tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ">
                    <div>{resource.data.data.length}</div>
                    <div className="flex gap-1">
                        <IconDatabase
                            className="hover:border rounded-full"
                            style={{display: isToolbarVisible ? 'block' : 'none'}} size={17}
                            onClick={() => showData(resource)}
                        />
                        <IconPlugConnected
                            className="hover:border rounded-full"
                            style={{display: isToolbarVisible ? 'block' : 'none'}} size={17}
                            onClick={() => onResourceSelected(resource)}
                        />
                        <IconEdit
                            className="hover:border rounded-full"
                            style={{display: isToolbarVisible ? 'block' : 'none'}} size={17}
                            onClick={openUpdateModal}
                        />
                        <IconTrash
                            className="hover:border hover:border-red rounded-full"
                            style={{display: isToolbarVisible ? 'block' : 'none'}} color="red" size={17}
                            onClick={openDeleteModal}
                        />
                    </div>
                </div>
                <Handle type="source" position={Position.Left}/>
            </div>

            <Modal show={showUpdateModal} onClose={closeUpdateModal} maxWidth="5xl">
                <UpdateResource resource={resource} closeModal={closeUpdateModal} restApis={rest_api_doc} auth={auth}/>
            </Modal>

            <Modal show={showDeleteModal} onClose={closeDeleteModal} maxWidth="xl">
                <DeleteResource onDelete={onDeleteResource} resource={resource} closeModal={closeDeleteModal} auth={auth}/>
            </Modal>

        </>

    );
}

export default memo(CustomNode);
