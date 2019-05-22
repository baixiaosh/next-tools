import React from 'react';
import Head from 'next/head';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
});

interface User {
    id: number;
    username: String;
}

interface IProps {
    data: [];
    user: any;
}

class Index extends React.Component<IProps, {}> {
    static async getInitialProps() {
        // console.log('store-1-', res);
        let list = await instance.get('/api');
        let user = await instance.post('/api/1');
        return {
            data: list.data,
            user: user.data
        };
    }

    componentDidMount() {
        console.log('----', this.props);
    }
    render() {
        const { data = [], user } = this.props;
        return (
            <div>
                <Head>
                    <title>home</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="xxx">
                    <p className="color">Hello home</p>
                </div>
                <div>
                    {data.map((item: User) => (
                        <div key={item.id}>
                            <span>id:{item.id}</span>---
                            <span>username:{item.username}</span>
                        </div>
                    ))}
                </div>
                <div>getById:1 ===== {user.username}</div>
            </div>
        );
    }
}

export default Index;
