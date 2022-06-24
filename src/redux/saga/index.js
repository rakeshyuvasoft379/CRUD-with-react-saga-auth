import { all } from "redux-saga/effects";
import usersaga from "./usersaga";

export default function* rootSaga(){
  yield  all([
        usersaga()
    ])
}