import { Reducer } from 'redux'
import { Failure, Action } from 'typescript-fsa'
import { Request, defaultRequest } from './models'
import { Actions } from './actions'
import { init, onAction, compose, withState, elevate } from 'redux-hor'

export default <P = any, S = any, E = Error>(actions: Actions<P, S, E>): Reducer<Request<E>> => {
  const started = onAction(
    actions.started,
    () => withState<Request<E>>({
      pending: true,
      success: false
    }))

  const done = onAction(
    actions.done,
    () => withState<Request<E>>({
      pending: false,
      success: true
    })
  )

  const failed = onAction(
    actions.failed,
    (action: Action<Failure<P, E>>) => withState<Request<E>>({
      pending: false,
      success: false,
      error: action.payload.error
    })
  )

  const reset = onAction(actions.reset, () => withState(defaultRequest))

  return compose(
    started,
    done,
    failed,
    reset
  )(init(defaultRequest))
}
