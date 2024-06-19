export interface Project {
    id: number;
    name: string;
    uuid: string;
    resources: Resource[];
}

type Field = {
    name: string;
    category: string;
    type: string;
};

export interface Resource {
    id: number;
    name: string;
    uuid: string;
    fields: Field[];
    project_id: number;
    parent_id: number;

}
