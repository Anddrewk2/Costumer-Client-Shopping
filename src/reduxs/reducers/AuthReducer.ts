/** @format */

import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		data: {
			accesstoken: '',
			_id: '',
		},
	},
	reducers: {
		addAuth: (state, action) => {
			state.data = action.payload;
		},
		// Đảm bảo rằng không cần payload khi gọi removeAuth
		removeAuth: (state) => {
			state.data = {
				accesstoken: '',
				_id: '',
			};
		},
	},
});


export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.data;