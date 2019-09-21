import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

class Index extends React.Component<any, {}> {
  static async getInitialProps({ query }: any) {
    console.log(query);
    return { query };
  }
  componentDidMount() {
    // console.log('--case--', this.props);
    console.log('--case--', this.props.beta);
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

export default connect(state => state)(Index);
