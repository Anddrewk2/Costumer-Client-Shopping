/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/AuthReducer';
import { cartReducer } from './reducers/cartReducer';
const store = configureStore({
	reducer: {
		authReducer,
		cartReducer,
	},
});

export default store;