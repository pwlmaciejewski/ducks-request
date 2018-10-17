Ducks Request
-----

Request reducer and actions creator


## Installation

```
yarn add ducks-request
```

## Usage

#### 1. Import the creator function and execute it to create new named request

```typescript
// requests.js

import createRequest from 'ducks-request'

export const fooRequest = createRequest('foo')
export const barRequest = createRequest('bar', true)  // second argument `true` will preserve the request result in the reducer
```

`createRequest` returns a [ducks](https://github.com/erikras/ducks-modular-redux) module with action creators and reducer:

```typescript
{
  started: ActionCreator<P>
  done: ActionCreator<Success<R, S>>
  failed: ActionCreator<Failure<R, E>>
  reset: ActionCreator<P>
  reducer: Reducer<Request<R, E>>
}
```

#### 2. Combine the reducers:

```typescript
// reducers.js

import { fooRequest, barRequest } from './requests'
import { combineReducers } from 'redux'

export default combineReducers({
  fooRequest.reducer,
  barRequest.reducer
})
```

#### 3. Use them in components

```typescript
// component.jsx

import * as React from 'react'
import { connect } from 'react-redux'
import { barRequest } from './requests'

const MyComponent = props => {
  const { result, pending } = props.barRequest
  return (
    <div>
      {pending && (
        <p>Loading...</p>
      )}

      {result && (
        <p>{result}</p>
      )}
    </div>
  )
}

export default connect(
  state => ({
    barRequest: state.barRequest
  }),
  {
    barRequest.started
  }
)
```
