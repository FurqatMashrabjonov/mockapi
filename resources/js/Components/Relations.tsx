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


export default function Relations({edgeConnections, nodeConnections}: PageProps<{
    edgeConnections: any[],
    nodeConnections: any[],
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
            connect(connection.source, connection.target);
        },
        [setEdges],
    );

    const connect = (source: string | null, destination: string | null) => {
        router.post(route('relations.connect'), {
            source: source,
            destination: destination,
        }, {
            onSuccess: () => {
                toast.success('Connected');
                location.reload()

            },
            onError: () => {
                toast.error('Failed to connect');
            }
        });
    }

    const nodeTypes = useMemo(() => ({textUpdater: CustomNode}), []);

    useEffect(() => {
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
