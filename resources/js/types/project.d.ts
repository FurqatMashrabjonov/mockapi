export interface Project {
    id: number;
    name: string;
    uuid: string;
    resources: Resource[];
}

export interface Resource {
    id: number;
    name: string;
    uuid: string;
    fields: [];
    project_id: number;
    parent_id: number;

}
