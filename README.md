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
export const barRequest = createRequest('bar', true)  // second argument `tru` it will preserve the request result in the reducer
```

#### 2. Combine the reducers:

```typescript
// reducers.js

import { fooRequest, barRequest } from './requests'
import { combineReducers } from 'redux'

export combineReducers(
  fooRequest,
  barRequest
)
```

#### 3. Use them in components

```typescript
// component.js

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
  {}
)
```
