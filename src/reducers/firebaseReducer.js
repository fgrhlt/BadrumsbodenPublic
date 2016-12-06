import Immutable from 'seamless-immutable'
import { loadFirebaseData } from '../actions/firebaseActions'

const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'
const UPLOAD_FILES = 'UPLOAD_FILES'
const SELECT_TYPE = 'SELECT_TYPE'

const initialState = Immutable({})

export default function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIREBASE_DATA:
      return state
        .setIn(['firebaseData', action.folder], fetchData(action))
    case DELETE_FIREBASE_DATA:
      return state
        .set('firebaseDataStatus', deleteLog(action))
    case UPLOAD_FILES:
      return state
        .set('firebaseDataStatus', uploadLog(action))
    case SELECT_TYPE:
      return state
        .set('type', action.searchType)
  }
  return state
}

function fetchData(action) {
  return {
    items: action.items,
    folder: action.folder
  }
}

function deleteLog(action) {
  return {
    folder: action.folder,
    key: action.key,
    name: action.name
  }
}

function uploadLog(action) {
  return {
    folder: action.folder
  }
}
