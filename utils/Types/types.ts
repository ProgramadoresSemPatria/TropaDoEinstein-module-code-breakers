interface Prerequisite { 
    title: string; 
    description: string; 
    link: string; 
} 

export interface ProblemType { 
    id: number; 
    name: string; 
    difficulty: string; 
    problemLink: string; 
    solutionLink: string; 
} 

export interface TopicType { 
    id: number; 
    title: string; 
    prerequisites: Prerequisite[]; 
    problems: ProblemType[]; 
} 

export interface GraphType { 
    [key: string]: TopicType; 
}

export interface TableDataType { 
    id: number;
    isStatusChecked: boolean;
    isStarChecked: boolean;
    name: string;
    difficulty: string;
    problemLink: string;
    solutionLink: string;
} 

export interface PrerequisitesType {
    title: string;
    description: string;
    link: string;
}

export interface UserDataFromDBType {
    problemId: number;
    nodeId: number;
    isStarChecked: boolean;
    isStatusChecked: boolean;
    progressBarValue: number;
    totalStatusChecked: number;
}

export type UserDataFromDBArrayType = UserDataFromDBType[];

export interface ProgressBarInfoType {
    nodeId: number,
    progressBarValue: number;
    totalStatusChecked: number;
}

export interface UserDataFromStorageType {
    [key: string]: UserDataFromDBType[]
}