import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as http from 'http';
import { Store, Dispatch } from 'redux';
import { connect } from 'react-redux';

import 'react-quill/dist/quill.snow.css';
import './index.less';
import Loading from '../components/Loading';

import betaAction from '../redux/action/beta';

interface IProps {
  beta: any;
  dispatch: Dispatch;
}
interface IInitProps {
  reduxStore: Store;
  res: http.IncomingMessage;
  req: http.IncomingMessage;
}

class Index extends React.Component<IProps, any> {
  static getInitialProps({ reduxStore, res, req }: IInitProps) {
    // console.log('store-1-', res);
    reduxStore.dispatch(betaAction.betaChange());
    console.log('store-2-', reduxStore.getState());
    return reduxStore.getState();
  }
  public ReactQuill: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      text: ''
    };
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill');
    }
  }
  componentDidMount() {
    console.log('----', this.props);
  }
  handleChange(val: string) {
    this.setState({ text: val });
    console.log('val: ', val);
  }
  handleClick() {
    // console.log(this.props);
    this.props.dispatch(betaAction.betaChange());
  }
  render() {
    // console.log('22----', this.props, this.state);
    console.log('22----', this.props.beta, this.state);
    const { beta } = this.props;
    const { text } = this.state;
    const ReactQuill = this.ReactQuill;
    return (
      <div>
        <Head>
          <title>哈哈哈</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="xxx">
          <p className="color">Hello {beta.text}</p>
          <button onClick={this.handleClick.bind(this)}>click</button>
          <p>{beta.text}</p>
        </div>

        <Link href="/home">
          <a>home</a>
        </Link>
        <Link href="/case?id=2" as="/case/2">
          <a>case/2</a>
        </Link>

        {ReactQuill && <ReactQuill className="editor" placeholder="请输入内容" onChange={this.handleChange.bind(this)} value={text} />}

        <Loading />
      </div>
    );
  }
}

export default connect(state => state)(Index);
