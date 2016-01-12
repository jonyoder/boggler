import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {logoutAndRedirect} from '../actions';

class CoreLayout extends React.Component {

    render () {

        const {dispatch} = this.props;

        return (
            <div>
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">Boggler</Link> &nbsp;
                            <Link className="navbar-brand" to="/play">Play</Link>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(
    (state) => {
        return {
            //isAuthenticated: state.auth.isAuthenticated
        };
    }
)(CoreLayout);
