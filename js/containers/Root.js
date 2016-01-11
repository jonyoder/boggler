import React from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

import routes from '../routes';
import DevTools from '../containers/DevTools';

export default class Root extends React.Component {

    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <div>
                        <ReduxRouter>
                            {routes}
                        </ReduxRouter>
                        <DevTools />
                    </div>
                </Provider>
            </div>
        );
    }
}

Root.propTypes = {
    store: React.PropTypes.object.isRequired
};
