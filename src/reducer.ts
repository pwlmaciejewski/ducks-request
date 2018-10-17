import { Reducer } from 'redux'
import { Failure, Action, Success } from 'typescript-fsa'
import { Request, defaultRequest } from './models'
import { Actions } from './actions'
import { init, onAction, compose, withState, merge } from 'redux-hor'

export default <P = any, R = any, E = Error>(
  actions: Actions<P, R, E>,
  saveResult: boolean = false
): Reducer<Request<R, E>> => {
  const started = onAction(
    actions.started,
    () => merge<Request<R, E>>({
      pending: true,
      success: false,
      error: undefined
    }))

  const done = onAction(
    actions.done,
    (action: Action<Success<P, R>>) => withState<Request<R, E>>({
      pending: false,
      success: true,
      result: saveResult ? action.payload.result : undefined
    })
  )

  const failed = onAction(
    actions.failed,
    (action: Action<Failure<P, E>>) => merge<Request<R, E>>({
      pending: false,
      success: false,
      error: action.payload.error
    })
  )

  const reset = onAction(actions.reset, () => withState<Request<R, E>>(defaultRequest))

  return compose(
    started,
    done,
    failed,
    reset
  )(init(defaultRequest))
}
