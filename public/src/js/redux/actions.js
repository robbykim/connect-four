import fetch from 'isomorphic-fetch';

const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';

function fetchGameSuccess(game) {
  return {
    game,
    type: FETCH_GAME_SUCCESS,
  };
}

const FETCH_GAME_ERROR = 'FETCH_GAME_ERROR';

function fetchGameError(error) {
  return {
    error,
    type: FETCH_GAME_ERROR,
  };
}

function fetchGame(accessCode) {
  return (dispatch) => {
    const url = `http://localhost:8080/game/${accessCode}`;
    return fetch(url).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then((game) => {
      return dispatch(fetchGameSuccess(game));
    }).catch((err) => {
      return dispatch(fetchGameError(err));
    });
  };
}

const ADD_CHIP_SUCCESS = 'ADD_CHIP_SUCCESS';

function addChipSuccess(board) {
  return {
    board,
    type: ADD_CHIP_SUCCESS,
  };
}

const ADD_CHIP_ERROR = 'ADD_CHIP_ERROR';

function addChipError(err) {
  return {
    type: ADD_CHIP_ERROR,
    error: err,
  };
}

function addChip(game) {
  return (dispatch) => {
    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    };

    const url = 'http://localhost:8080/game';
    return fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
      }

      return res.json();
    }).then((gameObj) => {
      return dispatch(addChipSuccess(gameObj));
    }).catch((err) => {
      return dispatch(addChipError(err));
    });
  };
}

exports.ADD_CHIP_SUCCESS = ADD_CHIP_SUCCESS;
exports.addChipSuccess = addChipSuccess;
exports.ADD_CHIP_ERROR = ADD_CHIP_ERROR;
exports.addChipError = addChipError;
exports.addChip = addChip;

exports.FETCH_GAME_SUCCESS = FETCH_GAME_SUCCESS;
exports.fetchGameSuccess = fetchGameSuccess;
exports.FETCH_GAME_ERROR = FETCH_GAME_ERROR;
exports.fetchGameError = fetchGameError;
exports.fetchGame = fetchGame;
