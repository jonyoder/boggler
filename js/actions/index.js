import {SET_SIZE, PLAY_GAME} from '../constants';
import {Boggle,Result} from '../utils/boggle';

import { pushState } from 'redux-router';
import cookie from 'react-cookie';

const MIN_WORD_LENGTH = 3;

export function setGameSize(size) {
    return {
        type: SET_SIZE,
        payload: {
            size: size
        }
    }
}

export function playGame(size, dice) {

    // Initialize new boggle game with correct size and dice
    let boggle = new Boggle((new Number(size)).valueOf(), dice);

    let results = new Array();

    // For each word in dictionary, look for a match
    for (let word of DICT) {
      if (word.length >= MIN_WORD_LENGTH) {
        let path = boggle.match(word.toLowerCase());
        if (path !== undefined) {
          let result = new Result(word, path);
          results.push(result);
        }
      } 
    }

  return {
    type: PLAY_GAME,
    payload: {
      results: results
    }
  }
}
