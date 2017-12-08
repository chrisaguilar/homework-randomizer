/**
 * Navigation Component
 */

import * as React from 'react';

export class Navigation extends React.Component<any, any> {
    public constructor (props: any) {
        super(props);
        this.state = {
            data: this.props.data.map(({ title, homework, assignments }) => ({ title, homework }))
        };
    }

    public componentWillReceiveProps (nextProps) {
        const { data } = nextProps;
        this.setState({ data });
    }

    public render () {
        const links = this.state.data.map(({ title, homework }) => (
            <li key={ homework } className='nav-item'>
                <a href='#' className='nav-link' onClick={ this.props.setCurrent.bind(null, homework) }>
                    { title }
                </a>
            </li>
        ));

        return <ul className='nav flex-column'>{ links }</ul>;
    }
}
