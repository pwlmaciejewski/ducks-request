import { Reducer } from 'redux'
import createActions, { Actions } from './actions'
import { Request } from './models'
import createReducer from './reducer'

export * from './models'

export interface RequestModule<P, S, E> extends Actions<P, S, E> {
  reducer: Reducer<Request<S, E>>
}

export default <P = any, S = any, E = Error>(
  name: string,
  saveResult: boolean = false
): RequestModule<P, S, E> => {
  const actions = createActions<P, S, E>(name)
  const reducer = createReducer<P, S, E>(actions, saveResult)
  return {
    ...actions,
    reducer
  }
}
