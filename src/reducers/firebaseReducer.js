import Immutable from 'seamless-immutable'
import { loadFirebaseData } from '../actions/firebaseActions'

const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'
const UPLOAD_FILES = 'UPLOAD_FILES'
const FILTER_AND_FETCH_FIREBASE_PRODUCTS = 'FILTER_AND_FETCH_FIREBASE_PRODUCTS'
const SEARCH_AND_FETCH_FIREBASE_PRODUCTS = 'SEARCH_AND_FETCH_FIREBASE_PRODUCTS'

const initialState = Immutable({})

export default function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIREBASE_DATA:
      return state
        .setIn(['firebaseData', action.folder], fetchData(action))
    case FILTER_AND_FETCH_FIREBASE_PRODUCTS:
      return state
        .setIn(['firebaseData', 'sortedProducts'], filterAndFetchData(action))
    case SEARCH_AND_FETCH_FIREBASE_PRODUCTS:
      return state
        .setIn(['firebaseData', 'searchResults'], searchAndFetchData(action))
    case DELETE_FIREBASE_DATA:
      return state
        .set('firebaseDataStatus', deleteLog(action))
    case UPLOAD_FILES:
      return state
        .set('firebaseDataStatus', uploadLog(action))
  }
  return state
}

function fetchData(action) {
  return {
    items: action.items,
    folder: action.folder
  }
}

function filterAndFetchData(action) {
  return {
    items: action.items,
  }
}

function searchAndFetchData(action) {
  return {
    items: action.items,
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
