import usersReducer from "./users"

import {combineReducers} from "redux"

const rootReducer = combineReducers({
    users: usersReducer,
})

export default rootReducer