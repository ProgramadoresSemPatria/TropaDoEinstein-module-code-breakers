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
    name: string; 
    isStarChecked: boolean; 
    problemLink: string; 
    difficulty: string; 
    solutionLink: string;
} 