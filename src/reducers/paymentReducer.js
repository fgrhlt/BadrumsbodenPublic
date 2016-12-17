import Immutable from 'seamless-immutable'

const COLLECT_DATA = 'COLLECT_DATA'

const initialState = Immutable({})

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case COLLECT_DATA:
      return state
        .set(('data'), action.data)
  }
  return state
}
