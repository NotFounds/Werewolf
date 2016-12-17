import { take, put, fork, select, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { start, destroy, match, setRole, setName, skip } from './actions'
import { fetchContents } from 'shared/actions'

function* fetchContentsSaga() {
  yield call(sendData, 'fetch contents')
}

function* startSaga() {
  yield call(sendData, 'start')
}

function* destroySaga() {
  yield call(sendData, 'destroy')
}

function* matchingSaga() {
  yield call(sendData, 'match')
}

function* setRoleSaga(action) {
  const { payload } = action
  yield call(sendData, 'set_role', payload)
}

function* setNameSaga(action) {
  const { payload } = action
  yield call(sendData, 'set_villageName', payload)
}

function* skipMeetingSaga() {
  yield call(sendData, 'skip_meeting')
}

function* saga() {
  yield fork(takeEvery, fetchContents.getType(), fetchContentsSaga)
  yield fork(takeEvery, start.getType(), startSaga)
  yield fork(takeEvery, destroy.getType(), destroySaga)
  yield fork(takeEvery, match.getType(), matchingSaga)
  yield fork(takeEvery, setRole.getType(), setRoleSaga)
  yield fork(takeEvery, setName.getType(), setNameSaga)
  yield fork(takeEvery, skip.getType(), skipMeetingSaga)
}

export default saga
