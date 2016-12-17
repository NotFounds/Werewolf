import { createAction } from 'redux-act'

export const setWait         = createAction('set_wait')
export const setName         = createAction('set_name', name => name)
export const vote            = createAction('vote', vote => vote)
export const ability         = createAction('ability', ability => ability)
export const check           = createAction('checked')
export const getResult       = createAction('result')
