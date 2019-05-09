import React from 'react';
import { initializeStore } from '../redux';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__: string = '__NEXT_REDUX_STORE__';
declare var Window: {
    [key: string]: any; // missing index defintion
    prototype: Window;
    new (): Window;
};

function getOrCreateStore(initialState?: any) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return initializeStore(initialState);
    }

    // Create store if unavailable on the client and set it on the window object
    if (!Window[__NEXT_REDUX_STORE__]) {
        Window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
    }
    return Window[__NEXT_REDUX_STORE__];
}

export default (App: any) => {
    return class AppWithRedux extends React.Component {
        reduxStore: any;
        static async getInitialProps(appContext: any) {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            const reduxStore = getOrCreateStore();

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState()
            };
        }

        constructor(props: any) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        render() {
            return <App {...this.props} reduxStore={this.reduxStore} />;
        }
    };
};
