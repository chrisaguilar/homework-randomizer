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
            current: null,
            data: [],
            error: null
        };

        this.setCurrent = this.setCurrent.bind(this);
    }

    public async componentDidMount () {
        try {
            const { data } = await axios('assets/data.json');
            this.setState({ data });
        } catch (e) {
            this.setState({ error: <h1>There was an error! 😞 Please reload!</h1> });
        }
    }

    public setCurrent (next: number) {
        this.setState({ current: next });
    }

    public render () {
        return this.state.error ? (
            this.state.error
        ) : (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <Navigation data={ this.state.data } setCurrent={ this.setCurrent } />
                    </div>
                    <div className='col-6'>
                        <Table data={ this.state.data } current={ this.state.current } />
                    </div>
                </div>
            </div>
        );
    }
}
