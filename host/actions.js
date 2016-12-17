import { createAction } from 'redux-act'

export const openParticipantPage = createAction('open participant page')
export const start      = createAction('start')
export const destroy    = createAction('destroy')
export const match      = createAction('match')
export const setRole    = createAction('set_role', role => role)
export const setName    = createAction('set_name', name => name)
export const skip       = createAction('skip')
