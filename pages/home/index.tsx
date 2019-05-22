import React from 'react';
import Head from 'next/head';

import axios from 'axios';

interface IState {
    data: [];
}

interface User {
    id: number;
    username: String;
}

class Index extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: []
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
    }
    render() {
        const { data } = this.state;
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
            </div>
        );
    }
}

export default Index;
