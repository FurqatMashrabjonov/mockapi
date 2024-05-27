import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge, OnConnect, Position,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {Resource} from "@/types/project";
import {PageProps} from "@/types";
import CustomNode from "@/Components/Relations/CustomNode";
type Edge = {
    id: string;
    source: string;
    animated: boolean;
    type: string;
    target: string;
};


export default function Relations({resources, edgeConnections, nodeConnections}: PageProps<{
    resources: Resource[],
    edgeConnections: [],
    nodeConnections: [],
    // project: Project,
}>) {

    const [nodes, setNodes, onNodesChange] = useNodesState(nodeConnections);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgeConnections);

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const openUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    const nodeTypes = useMemo(() => ({ textUpdater: CustomNode }), []);

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
