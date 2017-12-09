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
   [key: string]: string | string[];
}

export interface IData {
   assignments: IAssignment;
   homework: number;
   title: string;
}

export interface IListing {
    homework: number;
    title: string;
}

export interface INavigationProps {
    data: IData[];
    setCurrent (next: number): void;
}

export interface INavigationState {
    data: IListing[];
}

export interface ITableProps {
    current: number | null;
    data: IData[];
}

export interface ITableState {
    current: number | null;
    data: IData[];
    selected: [string, string | string[]][];
    title: string;
}
