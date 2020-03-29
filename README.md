# 🔥 firestore-fp &middot; [![Build Status](https://img.shields.io/travis/com/mobily/firestore-fp.svg?style=flat-square)](https://travis-ci.com/mobily/firestore-fp) [![npm](https://img.shields.io/npm/v/@mobily/firestore-fp.svg?style=flat-square)](https://www.npmjs.com/package/@mobily/firestore-fp)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/mobily/firestore-fp/blob/master/LICENSE)

> Functional helpers for convenient work with Firestore.

<img src="https://raw.githubusercontent.com/mobily/firestore-fp/master/assets/example.gif" alt="firestore-fp example" width="640">

## Features

- build complex queries with ease by combining helpers with `pipe`
- improve the developer experience by defining default collection data type
- compatible with [`firebase (web)`](https://github.com/firebase/firebase-js-sdk), [`firebase-admin (node)`](https://github.com/firebase/firebase-admin-node) and [`react-native-firebase`](https://github.com/invertase/react-native-firebase)
- all functions are [curried](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983)
- [tiny size](https://bundlephobia.com/result?p=@mobily/firestore-fp)

## Getting started

### Installation

```shell
yarn add @mobily/firestore-fp
```

or with `npm`

```shell
npm install @mobily/firestore-fp --save
```

### Prerequisites

Create a new function by using a `query` factory function to consume your Firestore queries.

`firebase-admin`

```typescript
import { firestore } from 'firebase-admin'
import { query } from '@mobily/firestore-fp'

export const q = query(firestore)
```

`firebase`

```typescript
import firebase from 'firebase'
import 'firebase/firestore'
import { query } from '@mobily/firestore-fp'

export const q = query(firebase.firestore)
```

`react-native-firebase@v6`

```typescript
import firestore from '@react-native-firebase/firestore'
import { query } from '@mobily/firestore-fp'

export const q = query(firestore)
```

If you use more than one Firebase app in your project you have to define a `q` function per app:

```typescript
import { firestore } from 'firebase-admin'
import { query } from '@mobily/firestore-fp'

export const q = query(() => firestore({ /* app config */ }))
```

### Examples

Reusable `where` helper.

```typescript
import { collection, where, get } from '@mobily/firestore-fp'
import { q } from './utils'

interface Task {
  name: string
  isDone: boolean
  userId: string
}

interface Message {
  text: string
  userId: string
}

interface Room {
  name: string
}

const tasks = collection<Task>('tasks')
const messages = collection<Message>('messages')
const rooms = collection<Room>('rooms')

const userIdEq = where('userId', '==')

// return Promise<QuerySnapshot<Task>>
const takeUserTasks = (userId: string) => q(tasks, userIdEq(userId), get)

// return Promise<QuerySnapshot<Message>>
const takeUserMessages = (userId: string) => q(messages, userIdEq(userId), get)

// return Promise<QuerySnapshot<Room>>
const takeUserRooms = (userId: string) =>
  q(rooms, userIdEq(userId) /* error, property 'userId' doesn't exist on type 'Room' */, get)
```

Combine `collection` and `doc` helpers.

```typescript
import { collection, doc, get, update, add, pipe } from '@mobily/firestore-fp'
import { q } from './utils'

interface Task {
  name: string
  isDone: boolean
  userId: string
}

const tasks = collection<Task>('tasks')
const tasksDoc = (id: string) => pipe(tasks, doc(id))

// return Promise<DocumentSnapshot<Task>>
const takeTask = (id: string) => q(tasksDoc(id), get)

// return Promise<void>
const toggleTaskDone = (id: string, isDone: boolean) =>
  q(tasksDoc(id), update({ isDone } /* ◀️ Partial<Task> */))

// return Promise<DocumentReference<Task>>
const addTask = (task: Task) => q(tasks, add(task))
```

Compound queries.

```typescript
import { collection, where, orderBy, limit, get, pipe } from '@mobily/firestore-fp'
import { q } from './utils'

interface Task {
  name: string
  isDone: boolean
  userId: string
  createdAt: number
}

const tasks = collection<Task>('tasks')
const whereIsDone = where('isDone', '==')
const orderByCreatedAt = orderBy('createdAt')

// return Promise<QuerySnapshot<Task>>
const takeCompletedTasks = () =>
  q(tasks, whereIsDone(true), orderByCreatedAt('asc'), get)

const last10Completed = pipe(
  whereIsDone(true),
  orderByCreatedAt('desc'),
  limit(10)
)

// return Promise<QuerySnapshot<Task>>
const takeLast10CompletedTasks = () => q(tasks, last10Completed, get)
```

Query subcollections.

```typescript
import { collection, doc, get } from '@mobily/firestore-fp'
import { q } from './utils'

interface Room {
  name: string
}

interface Message {
  userId: string
  text: string
}

const rooms = collection<Room>('rooms')
const messages = collection<Message>('messages')

// return Promise<QuerySnapshot<Message>>
const takeRoomMessages = (roomId: string) =>
  q(rooms, doc(roomId), messages, get)
```

Convert data by using `withConverter`.

```typescript
import { O } from 'ts-toolbelt'
import { collection, withConverter, get, DataConverter } from '@mobily/firestore-fp'
import { q } from './utils'

interface Task {
  name: string
  isDone: boolean
  userId: string
  createdAt: number
}

type ConvertedTask = O.Merge<{ createdAt: Date }, Task>

const tasks = collection<Task>('tasks')

const taskConverter: DataConverter<Task, ConvertedTask> = {
  toFirestore: data => data,
  fromFirestore: data => {
    return {
      ...data,
      createdAt: new Date(date.createdAt),
    }
  },
}

// return Promise<QuerySnapshot<ConvertedTask>>
const takeAllTasks = () =>
  q(tasks, withConverter(taskConverter), get)
```

## Api Reference

`firestore-fp` follows the [official Firebase reference](https://firebase.google.com/docs/reference/js/firebase.firestore).

The current status is available [here](STATUS.md).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/__marcin_"><img src="https://avatars1.githubusercontent.com/u/1467712?v=4" width="100px;" alt="Marcin Dziewulski"/><br /><sub><b>Marcin Dziewulski</b></sub></a><br /><a href="https://github.com/mobily/firestore-fp/commits?author=mobily" title="Code">💻</a> <a href="https://github.com/mobily/firestore-fp/commits?author=mobily" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

The MIT License.

See [LICENSE](LICENSE)
