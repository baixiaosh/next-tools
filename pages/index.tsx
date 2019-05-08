import React from 'react';
import Head from 'next/head';
import './index.less';

interface IProps {
    test: string;
}

class Index extends React.Component<IProps, {}> {
    static async getInitialProps() {
        return { test: 'sb' };
    }
    render() {
        const { test } = this.props;
        return (
            <div>
                <Head>
                    <title>哈哈哈</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="xxx">
                    <p>Hello word {test}</p>
                </div>
            </div>
        );
    }
}

export default Index;
