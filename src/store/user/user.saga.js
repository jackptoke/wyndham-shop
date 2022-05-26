import { takeLatest, all, call, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signOutFailed,
  signOutSuccess,
  signUpSuccess,
  signUpFailed,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithUsersEmailAndPassword,
  signOutUser,
} from "../../utility/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo = {}) {
  try {
    console.log("getSnapshotFromUserAuth::: ", userAuth, additionalInfo);
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    console.log("Snapshot >>", userSnapshot.data());
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* googleSignIn() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    console.log("Google sign in: ", user);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithUsersEmailAndPassword,
      email,
      password
    );
    console.log("Email sign in: ", user);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    console.log("Sign up result: ", user);
    //trigger the signUpSuccess
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUpSuccess({
  payload: { user, additionalInfo },
}) {
  console.log("Sign in after sign up success >>> ", user, additionalInfo);
  yield call(getSnapshotFromUserAuth, user, additionalInfo);
}

export function* onCheckUserSessionStart() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUpSuccess);
}

export function* onSignOut() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSessionStart),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOut),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
