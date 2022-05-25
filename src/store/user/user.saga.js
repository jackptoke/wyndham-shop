import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  signUpSuccess,
  signUpFailed,
} from "./user.action";

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  getCurrentUser,
  signOutUser,
  signInWithUsersEmailAndPassword,
  signInWithGooglePopup,
} from "../../utility/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    // console.log("UserAuth: ", userAuth);
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

//USER Sign Out
export function* signOutUserFromAuth() {
  try {
    console.log("Signing user out...");
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* signUpUser({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    console.log("Sign Up 1/2 complete. ", user, displayName);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithUsersEmailAndPassword,
      email,
      password
    );
    console.log("Sign in xxx", user);
    // yield put(signInSuccess(user));
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
  yield call(getSnapshotFromUserAuth, user, additionalInfo);
}

export function* onUserSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export function* onUserSignOutStart() {
  console.log("Start signing out...");
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutUserFromAuth);
}

export function* onUserSignInWithGooglePopUp() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onUserSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
}

export function* onUserSignInWithEmailAndPassword() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onUserSignOutStart),
    call(onUserSignUpStart),
    call(onUserSignUpSuccess),
    call(onUserSignInWithEmailAndPassword),
    call(onUserSignInWithGooglePopUp),
  ]);
}
