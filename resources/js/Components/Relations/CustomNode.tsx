import React, {memo, useState} from 'react';
import {Handle, NodeProps, NodeToolbar, Position} from 'reactflow';
import Modal from "@/Components/Modal";
import {UpdateResource} from "@/Pages/Projects/Components/UpdateResource";
import toast from "react-hot-toast";


function CustomNode({data: {resource, rest_api_doc}}: NodeProps) {

    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const openUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
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
                 onClick={openUpdateModal}>
                <Handle type="target" position={Position.Right}/>
                <div
                    style={{width: '10vh', height: '3vh'}}
                    className="inline-flex items-center px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-center text-gray-700 dark:text-gray-300 tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ">
                    {resource.data.data.length}
                </div>
                <Handle type="source" position={Position.Left}/>
            </div>

            <Modal show={showUpdateModal} onClose={closeUpdateModal} maxWidth="5xl">
                <UpdateResource resource={resource} closeModal={closeUpdateModal} restApis={rest_api_doc} auth={{}}/>
            </Modal>

        </>

    );
}

export default memo(CustomNode);
