/**
 * Main App Component
 */

import axios from 'axios';
import * as React from 'react';

import { Navigation } from './Navigation';
import { Table } from './Table';

export interface IAssignment {
    [key: string]: string[];
}
export interface IData {
    assignments: IAssignment;
    homework: number;
    title: string;
}
export interface IAppState {
    current: number | null;
    data: IData[];
}
export class App extends React.Component<any, IAppState> {
    public constructor (props: any) {
        super(props);
        this.state = { data: [], current: null };

        this.setCurrent = this.setCurrent.bind(this);
    }

    public async componentDidMount () {
        const { data } = await axios('assets/data.json');
        this.setState({ data });
    }

    public render () {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <Navigation data={ this.state.data } setCurrent={ this.setCurrent }/>
                    </div>
                    <div className='col-6'>
                        <Table data={ this.state.data } current={ this.state.current } />
                    </div>
                </div>
            </div>
        );
    }

    public setCurrent (current: number) {
        this.setState({ current });
    }
}
