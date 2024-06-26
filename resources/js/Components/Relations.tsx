import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { router } from '@inertiajs/react'
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    OnConnect,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {PageProps} from "@/types";
import CustomNode from "@/Components/Relations/CustomNode";
import toast from "react-hot-toast";

type Edge = {
    id: string;
    source: string;
    animated: boolean;
    type: string;
    target: string;
};


export default function Relations({edgeConnections, nodeConnections, connectResources, deleteResource, setCurrentResource, showResourceData}: PageProps<{
    edgeConnections: any[],
    nodeConnections: any[],
    deleteResource: (deleted: boolean) => void,
    setCurrentResource: (resource: any) => void,
    connectResources: (source: string | null, destination: string | null) => void,
    showResourceData: (resource: any) => void,
    // project: Project,
}>) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const openUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const onConnect: OnConnect = useCallback(
        (connection) => {
            connectResources(connection.source, connection.target);
        },
        [setEdges],
    );


    const nodeTypes = useMemo(() => ({textUpdater: CustomNode}), []);

    useEffect(() => {
        for (let i = 0; i < nodeConnections.length; i++) {
            nodeConnections[i].data['onDeleteResource'] = deleteResource;
            nodeConnections[i].data['onResourceSelected'] = setCurrentResource;
            nodeConnections[i].data['showData'] = showResourceData;
        }

        setNodes(nodeConnections);
        setEdges(edgeConnections);
    }, [nodeConnections, edgeConnections]);

    return (
        <div className="cursor-pointer" style={{width: '100hv', height: '60vh'}}>
            <ReactFlow
                className="cursor-default"
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                panOnScroll={false}
                panOnDrag={false}
                attributionPosition="bottom-left"
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                zoomOnScroll={false}
                minZoom={1.5}
                maxZoom={1.5}
                translateExtent={[
                    [0, 0],
                    [500, 500]
                ]}
            >
                <Controls
                    showZoom={false}
                    showInteractive={true}
                    showFitView={false}
                    onZoomIn={() => {
                    }}
                    onZoomOut={() => {
                    }}
                    onFitView={() => {
                    }}
                    onInteractiveChange={() => {
                    }}
                />
                {/*<MiniMap/>*/}
            </ReactFlow>
        </div>
    );
}
