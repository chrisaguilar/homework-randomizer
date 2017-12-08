/**
 * Main App Component
 */

import axios from 'axios';
import * as React from 'react';

import { IAppProps, IAppState } from './interfaces';
import { Navigation } from './Navigation';
import { Table } from './Table';

export class App extends React.Component<IAppProps, IAppState> {
    public constructor (props: IAppProps) {
        super(props);
        this.state = {
            data: [],
            current: null
        };
        this.setCurrent = this.setCurrent.bind(this);
    }

    public async componentDidMount () {
        const { data } = await axios('assets/data.json');
        this.setState({ data });
    }

    public setCurrent (current: number) {
        this.setState({ current });
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
}
