import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import transactionReducer from './reducers/transactionReducer';
import categoryReducer from './reducers/categoryReducer';
import budgetReducer from './reducers/budgetReducer';
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import userReducer from "./reducers/userReducer";
import roleReducer from "./reducers/roleReducer";
import statisticsReducer from "./reducers/statisticsReducer";
import messageReducer from "./reducers/messageReducer";
import notificationReducer from "./reducers/notificationReducer";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    transaction: transactionReducer,
    auth: authReducer,
    category: categoryReducer,
    budget: budgetReducer,
    user: userReducer,
    role: roleReducer,
    statistics: statisticsReducer,
    message: messageReducer,
    notification: notificationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)