/**
 * Table Component
 */

import * as React from 'react';

import { ITableProps, ITableState } from './interfaces';

type relation = [string, string | string[]];

export class Table extends React.Component<ITableProps, ITableState> {
    public constructor (props: any) {
        super(props);

        this.state = { data: [], selected: [], current: null, title: '' };

        this.sortInstructors = this.sortInstructors.bind(this);
        this.sortStudents = this.sortStudents.bind(this);
        this.makeRows = this.makeRows.bind(this);
    }

    private makeRows (data: (string | string[])[], index: number) {
            const instructor = data[0];
            const students = data[1];

            const studentRows = (students.slice(1) as string[]).map((student, i) => (
                <tr key={ i }>
                    <td>{ student }</td>
                </tr>
            ));

            return (
                <React.Fragment key={ index }>
                    <tr>
                        <th scope='row' rowSpan={ students.length }>
                            { instructor }
                        </th>
                        <td>{ students[0] }</td>
                    </tr>
                    { studentRows }
                </React.Fragment>
            );
    }

    private setSelected () {
        for (const homework of this.state.data) {
            if (homework.homework === this.state.current) {
                this.setState({ selected: Object.entries(homework.assignments), title: homework.title });
            }
        }
    }

    private sortInstructors (a: relation, b: relation) {
        return (a === b ? 0 : a < b ? -1 : 1);
    }

    private sortStudents (data: relation) {
        const instructor = data[0];
        const students = (data[1] as string[]).sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));

        return [instructor, students];
    }

    public componentWillReceiveProps (nextProps: ITableProps) {
        const { current, data } = nextProps;
        this.setState({ current, data }, this.setSelected);
    }

    public render () {
        if (!this.state.title) return <h3>Select an Assignment</h3>;

        const rows = this.state.selected
            .sort(this.sortInstructors)
            .map(this.sortStudents)
            .map(this.makeRows);

        return (
            <table className='table table-bordered table-sm'>
                <thead>
                    <tr>
                        <th scope='col' colSpan={ 2 }>
                            { this.state.title }
                        </th>
                    </tr>
                    <tr>
                        <th scope='col'>Instructor</th>
                        <th scope='col'>Student</th>
                    </tr>
                </thead>
                <tbody>{ rows }</tbody>
            </table>
        );
    }
}
