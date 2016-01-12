import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {ResultsView} from './ResultsView';
import {getRandomInt} from '../utils/index';
import * as actionCreators from '../actions';

export class PlayView extends React.Component {

  constructor(props) {
    super(props);

    // Bindings
    this._sizeChange = this._sizeChange.bind(this);
    this._solve = this._solve.bind(this);
    this._inputChange = this._inputChange.bind(this);

    // Initialize dice array
    this._initDice(this.props.size);
  }

  _solve(event) {

    // Timestamp to record processing time
    let start = new Date();

    // Initialize new boggle game with correct size and dice
    console.log(this.dice);
    this.props.actions.playGame(this.props.size, this.dice);

    // Log processing time
    let end = new Date();
    console.log(`Milliseconds to Solve Game: ${end - start}`);
  }

  _inputChange(event) {

    // Replace existing value of die with new upper case value
    let letter = event.target.value;
    let newValue = letter.substring(letter.length - 1).toUpperCase();
    this.setState({value: newValue});

    // Save to dice array
    let index = event.target.id.substring(5);
    this.dice[index] = newValue;
  }

  _sizeChange(event) {

    // Update state with new game size
    this.props.actions.setGameSize(event.target.value);

    // Initialize dice array
    this._initDice(event.target.value);
  }

  _initDice(size) {
    let sze = (new Number(size)).valueOf();
    this.dice = new Array();
    for (let i=0; i<sze*sze; i++) {
      this.dice[i] = String.fromCharCode(getRandomInt(65, 90));
    }
  }

  renderGame(size) {
    let sze = (new Number(size)).valueOf();
    let ary = [...Array(sze)];

    return (
      <div className="game">
        {ary.map((x, i) =>
          <div key={i} className="row">
            {ary.map((x, j) =>
              <div key={j} className="cell">
                <input key={(i*sze+j)} id={"dice_"+((i*sze)+j)} onChange={this._inputChange} value={this.dice[(i*sze)+j]} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  render () {
    return (
      <div>
        Game Size:
        <select defaultValue={this.props.size} onChange={this._sizeChange}>
          {[...Array(3)].map((x, i) => 
            <option key={i}>{i+4}</option>
          )}
        </select>
        <div>
          {this.renderGame(this.props.size)}
          <div className="clear">&nbsp;</div>
        </div>
        <button onClick={this._solve}>Solve</button>
        {this.renderResults()}
      </div>
    );
  }

  renderResults() {
    if (this.props.results !== null)
        return (
          <div className="results">
            <div>Results</div>
            <select size="20">
              {this.props.results.map((result) => 
                <option key={result.word}>{result.word}</option>
              )}
            </select>
          </div>
        );
    else
        return (
            <div/>
        );
  }

}

const mapStateToProps = (state) => ({
  size    : state.data.size,
  results : state.data.results
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayView);

