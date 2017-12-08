/**
 * Table Component
 */

import * as React from 'react';

function makeRow ([name, students]: [string, string[]]) {
    const studentRows = students.slice(1).map((student, i) => (
        <tr key={ i }>
            <td>{ student }</td>
        </tr>
    ));

    return (
        <React.Fragment>
            <tr>
                <th scope='row' rowSpan={ students.length } style={ { verticalAlign: 'middle' } }>
                    { name }
                </th>
                <td>{ students[0] }</td>
            </tr>
            { studentRows }
        </React.Fragment>
    );
}

function sortInstructors (a: [string, any], b: [string, any]) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;

    return 0;
}

function sortStudents ([instructor, students]: [string, string[]]) {
    return [instructor, students.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1))];
}

export class Table extends React.Component<any, any> {
    public constructor (props: any) {
        super(props);
        this.state = { data: [], selected: {}, current: null, title: '' };
    }

    public componentWillReceiveProps (nextProps) {
        const { current, data } = nextProps;

        this.setState({ current, data }, this.setSelected);
    }

    public render () {
    if (!this.state.title) return <h3>Select an Assignment</h3>;

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
                <tbody>
                    { Object.entries(this.state.selected)
                        .sort(sortInstructors)
                        .map(sortStudents)
                        .map(makeRow) }
                </tbody>
            </table>
        );
    }

    public setSelected () {
        for (const homework of this.state.data) {
            if (homework.homework === this.state.current) {
                this.setState({ selected: homework.assignments, title: homework.title });
            }
        }
    }
}
