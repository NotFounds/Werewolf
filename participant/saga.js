import { take, put, fork, select, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { setWait, setName, vote, ability, check, getResult } from './actions'
import { fetchContents } from 'shared/actions'

function* setNameSaga(action) {
  const { payload } = action
  yield call(sendData, 'set_name', payload)
}

function* setWaitSaga() {
  yield call(sendData, 'set_wait')
}

function* voteSaga(action) {
  const { payload } = action
  yield call(sendData, 'vote', payload)
}

function* abilitySaga(action) {
  const { payload } = action
  yield call(sendData, 'ability', payload)
}

function* checkedSaga() {
  yield call(sendData, 'checked')
}

function* getResultSaga() {
  yield call(sendData, 'result')
}

function* fetchContentsSaga() {
  yield call(sendData, 'fetch contents')
}

function* saga() {
  yield fork(takeEvery, fetchContents.getType(), fetchContentsSaga)
  yield fork(takeEvery, setName.getType(), setNameSaga)
  yield fork(takeEvery, setWait.getType(), setWaitSaga)
  yield fork(takeEvery, vote.getType(), voteSaga)
  yield fork(takeEvery, ability.getType(), abilitySaga)
  yield fork(takeEvery, check.getType(), checkedSaga)
  yield fork(takeEvery, getResult.getType(), getResultSaga)
}

export default saga
