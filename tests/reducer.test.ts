import 'jest'
import createActions from '../src/actions'
import createReducer from '../src/reducer'
import { Request } from '../src/models'

describe('reducer', () => {
  interface Params {
    foo: string
  }

  interface Result {
    bar: number
  }

  const actions = createActions<Params, Result, Error>('foo')
  const params: Params = { foo: 'bar' }
  const result: Result = { bar: 2 }

  describe('without saving results', () => {
    const reducer = createReducer(actions)

    it('should set pending on started action', () => {
      const previousState: Request<any, Error> = {
        pending: false,
        success: false,
        error: new Error('some error')
      }
      const newState = reducer(previousState, actions.started(params))
      const expectedState: Request<any, Error> = {
        pending: true,
        success: false
      }
      expect(newState).toEqual(expectedState)
    })

    it('should set successand reset error on done action', () => {
      const action = actions.done({
        params,
        result
      })
      const previousState: Request<Result, Error> = {
        pending: true,
        success: false,
        error: new Error('some error')
      }
      const newState = reducer(previousState, action)
      const expectedState: Request<Result, Error> = {
        pending: false,
        success: true
      }
      expect(newState).toEqual(expectedState)
    })

    it('should set error on failed action', () => {
      const error = new Error('some error')
      const action = actions.failed({
        params,
        error
      })
      const previousState: Request<any, Error> = {
        pending: false,
        success: true
      }
      const newState = reducer(previousState, action)
      const expectedState: Request<any, Error> = {
        pending: false,
        success: false,
        error
      }
      expect(newState).toEqual(expectedState)
    })

    it('should set initial state on reset action', () => {
      const action = actions.reset(params)
      const previousState: Request<any, Error> = {
        pending: false,
        success: true,
        error: new Error('some error')
      }
      const newState = reducer(previousState, action)
      const expectedState: Request<any, Error> = {
        pending: false,
        success: false
      }
      expect(newState).toEqual(expectedState)
    })
  })

  describe('saving results', () => {
    const reducer = createReducer(actions, true)

    it('should save result on done', () => {
      const action = actions.done({
        params,
        result
      })
      const previousState: Request<Result, Error> = {
        pending: true,
        success: false
      }
      const newState = reducer(previousState, action)
      const expectedState: Request<Result, Error> = {
        pending: false,
        success: true,
        result
      }
      expect(newState).toEqual(expectedState)
    })

    it('should not erase the result on started', () => {
      const action = actions.started(params)
      const previousState: Request<Result, Error> = {
        pending: false,
        success: true,
        result
      }
      const newState = reducer(previousState, action)
      const expectedState: Request<Result, Error> = {
        pending: true,
        success: false,
        result
      }
      expect(newState).toEqual(expectedState)
    })

    it('should not erase the result on failed', () => {
      const error = new Error('some error')
      const action = actions.failed({
        params,
        error
      })
      const previousState: Request<Result, Error> = {
        pending: false,
        success: true,
        result
      }
      const newState = reducer(previousState, action)
      const expectedState: Request<Result, Error> = {
        pending: false,
        success: false,
        result,
        error
      }
      expect(newState).toEqual(expectedState)
    })
  })

})
