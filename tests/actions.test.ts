import 'jest'
import createActions, { prefix } from '../src/actions'

describe('actions', () => {
  interface Params {
    foo: string
  }

  interface Result {
    bar: number
  }

  const actions = createActions<Params, Result, Error>('foo')

  it('should create started action', () => {
    const params: Params = { foo: 'bar' }
    const action = actions.started(params)
    expect(action.type).toBe(`${prefix}/FOO_STARTED`)
    expect(action.payload).toEqual(params)
  })

  it('should create done action', () => {
    const params: Params = { foo: 'bar' }
    const result: Result = { bar: 2 }
    const action = actions.done({
      params: params,
      result
    })
    expect(action.type).toBe(`${prefix}/FOO_DONE`)
    expect(action.payload).toEqual({
      params: params,
      result
    })
  })

  it('should create failed action', () => {
    const params: Params = { foo: 'bar' }
    const error: Error = new Error('some error')
    const action = actions.failed({
      params: params,
      error
    })
    expect(action.type).toBe(`${prefix}/FOO_FAILED`)
    expect(action.payload).toEqual({
      params: params,
      error
    })
  })

  it('should create reset action', () => {
    const params: Params = { foo: 'bar' }
    const action = actions.reset(params)
    expect(action.type).toBe(`${prefix}/FOO_RESET`)
    expect(action.payload).toEqual(params)
  })
})
