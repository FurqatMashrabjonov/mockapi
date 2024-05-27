import {Link} from '@inertiajs/react';
import {PageProps} from '@/types';
import React from "react";
import {BentoGrid, BentoGridItem} from "@/Components/ui/bento-grid";
import {Avatar} from "@/Components/avatar";
import Modal from "@/Components/Modal";

export default function Projects({projects, auth}: PageProps<{
    projects: Array<any>
}>) {

    return (
        <>
                {projects.map((project, i) => (
                    <Link href={route('projects.show', {project: project})} key={i} className="m-1" >
                        <BentoGridItem
                            key={i}
                            title={project.name}
                            description={project.created_at_human}
                            header={<Avatar avatar={project.avatar} auth={auth}/>}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
                    </Link>
                ))}
        </>
    );
}
