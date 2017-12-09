/**
 * Interface consolidation file
 */


export interface IAppProps { }

export interface IAppState {
    current: number | null;
    data: IData[];
    error: any;
}

export interface IAssignment {
   [key: string]: string[];
}

export interface IData {
   assignments: IAssignment;
   homework: number;
   title: string;
}

export interface IListing {
    title: string;
    homework: number;
}

export interface INavigationProps {
    data: IData[];
    setCurrent (next: number): void;
}

export interface INavigationState {
    data: IListing[];
}
