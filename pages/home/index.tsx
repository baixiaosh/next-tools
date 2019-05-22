import React from 'react';
import Head from 'next/head';

import axios from 'axios';

interface User {
    id: number;
    username: String;
}

interface IState {
    data: [];
    user: any;
}

class Index extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            user: {}
        };
    }

    componentDidMount() {
        console.log('----', this.props);
        axios.get('/api').then(res => {
            let data = res.data;
            this.setState({
                data: data
            });
        });
        axios.post('/api/1').then(res => {
            let data = res.data;
            this.setState({
                user: data
            });
        });
    }
    render() {
        const { data, user } = this.state;
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
