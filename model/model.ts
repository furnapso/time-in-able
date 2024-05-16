export interface BaseModel {
    id?: string;
}

export interface Client extends BaseModel {
    firstName: string,
    lastName: string,
}

export interface Task extends BaseModel {
    name: string;
}