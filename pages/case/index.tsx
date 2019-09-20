import React from 'react';
import Head from 'next/head';

class Index extends React.Component<any, {}> {
  static async getInitialProps({ query }: any) {
    console.log(query);
    return { query };
  }
  componentDidMount() {
    console.log('--case--', this.props);
  }
  render() {
    return (
      <div>
        <Head>
          <title>case</title>
        </Head>
        <div className="xxx">
          <p className="color">case page</p>
        </div>
      </div>
    );
  }
}

export default Index;
