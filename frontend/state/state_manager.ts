import { ActionTypes } from './action_types';
import { makeVar } from '@apollo/client';

export type Action = {
  type: string;
  payload?: any;
};

// define all state here
export const Todos = makeVar([]);

// reducer
export const dispatch = (action: Action): void => {
  switch (action.type) {
    case ActionTypes.FOO: {
      // update Todos(...)
      return;
    }
    default: {
      // do nothing
    }
  }
};

// set typepolicy to always use makeVars variables
export const typePolicies = {
  Query: {
    fields: {
      Todos: {
        read() {
          return Todos();
        },
      },
    },
  },
};

// Thinking that:
// For this to work, we need a query called Todos that looks locally
// and one called GetTodos that goes to the database

// or...

// export const SOME_QUERY_LOCAL = gql`
//   query SomeQueryLocal {
//     Todos @client
//     // is this correct syntax?!
//     or is it
//     Todos {
//       id  @client
//       text  @client
//       completed @client
//     }
//     or is it
//     Todos @client {
//       id
//       text
//       completed
//     }
//   }

// and...

// export const SOME_QUERY_REMOTE = gql`
//   query SomeQueryRemote {
//     Todos {
//       id
//       text
//       completed
//     }
//   }
