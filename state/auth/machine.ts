import { createMachine } from "xstate";

export const authMachine = createMachine({
  id: 'auth',
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      on: {
        LOGIN: 'authenticated'
      }
    },
    authenticated: {
      on: {
        LOGOUT: 'unauthenticated'
      }
    }
  }
})