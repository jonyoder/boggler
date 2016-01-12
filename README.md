# Boggler 

## Notes

This is a simple Boggle solver that supports a 4x4 to 6x6 Boggle grid (to simulate Boggle, Big Boggle, and Super Big Boggle). The application's boilerplate code is based on a example from the Redux project, and is written in ES2015/ES6 and transcompiled by Babel. The dictionary is included in 'words.js'. No server-side code is required.

The application includes the redux-devtools project, which displays a docked tool window to the right of the application. You can use this tool to monitor the current Redux applications state. Of particular interest is the *state.data* object.

The following source files are probably of most interest:
- words.js (the dictionary; copied from /usr/share/dict/words)
- js/actions/index.js (see the 'playGame' method)
- js/utils/boggle.js (builds a Map of Maps for easy recursion to solve a puzzle)
- js/views/PlayView.js (the game view)

## Known issues

There are a number of relatively easy improvements that would be nice to add to this app.

- Enforce character selection to alpha characters only
- Enforce character select to the actual dice values included with Boggle
- Treat the character 'Q' as 'Qu' to more closely simulate a real Boggle game
- Invalidate results when the game board is changed
- Upon selecting a result, highlight the word in the board above
- Provide a "New Game" link to randomize the board (you can currently switch to the home page and back to accomplish this)
- Provide a better binding between ReactJS and the game board (the current implementation is hackish)
- Provide a better dictionary that includes plurals and other variations
- Efficiency improvements
  - Multi-threaded server-side solver 
  - Dictionary indexing to support solving multiple words at once (for example, the words "artifact", "art", "fact", "act" could all be solved in a single recursion

## Thanks to
- Dictionary complements of: /usr/share/dict/words
- Redux: http://http://redux.js.org/
- Babel: http://babeljs.io/
- ReactJS: https://facebook.github.io/react/
- Flux: https://facebook.github.io/flux/
- Gulp: http://gulpjs.com/
- WebPack: https://webpack.github.io/


