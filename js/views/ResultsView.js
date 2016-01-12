import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class ResultsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log("Rendering Results");
    if (this.props.results !== undefined)
        return (
            <select>
              {this.props.results.map((result) => 
                <option key={result.word}>{result.word}</option>
              )}
            </select>
        );
    else
        return (
            <div/>
        );
  }
}

const mapStateToProps = (state) => ({
  results : state.data.results
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsView);
