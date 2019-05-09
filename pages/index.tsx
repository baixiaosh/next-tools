import React from 'react';
import Head from 'next/head';
import * as http from 'http';
import { Store, Dispatch } from 'redux';
import { connect } from 'react-redux';
import betaAction from '../redux/action/beta';
import './index.less';

interface IProps {
    beta: any;
    dispatch: Dispatch;
}
interface IInitProps {
    reduxStore: Store;
    req: http.IncomingMessage;
}

class Index extends React.Component<IProps, {}> {
    static getInitialProps({ reduxStore, req }: IInitProps) {
        console.log('store-1-', reduxStore.getState());
        reduxStore.dispatch(betaAction.betaChange());
        console.log('store-2-', reduxStore.getState());
        return reduxStore.getState();
    }
    componentDidMount() {
        console.log('----', this.props);
    }
    handleClick() {
        // console.log(this.props);
        this.props.dispatch(betaAction.betaChange());
    }
    render() {
        const { beta } = this.props;
        console.log('22----', this.props);
        return (
            <div>
                <Head>
                    <title>哈哈哈</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="xxx">
                    <p>Hello {beta.text}</p>
                    <button onClick={this.handleClick.bind(this)}>click</button>
                    <p>{beta.text}</p>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(Index);
