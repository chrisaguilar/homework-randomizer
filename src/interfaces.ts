/**
 * Interface consolidation file
 */


export interface IAppProps { }

export interface IAppState {
    current: number | null;
    data: IData[];
}

export interface IAssignment {
   [key: string]: string[];
}

export interface IData {
   assignments: IAssignment;
   homework: number;
   title: string;
}
