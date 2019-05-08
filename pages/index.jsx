import React from 'react';
import Head from 'next/head';
import './index.less';

class Index extends React.Component {
    static async getInitialProps({ req }) {
        console.log(req.headers['user-agent']);
        return { test: 'sb' };
    }
    render() {
        return (
            <div>
                <Head>
                    <title>哈哈哈</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="xxx">
                    <p>Hello word {this.props.test}</p>
                </div>
            </div>
        );
    }
}

export default Index;
