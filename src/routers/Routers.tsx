

/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSeletor, AuthState } from '../reduxs/reducers/AuthReducer';
import AuthRouter from './Authrouter';
import Mainrouter from './Mainrouter';
import { useEffect, useState } from 'react';
import { localDataNames } from '../constants/appInfos';
import { Spin } from 'antd';

const Routers = () => {
	const [isLoading, setIsLoading] = useState(false);

	const auth: AuthState = useSelector(authSeletor); 
	// Lay du lieu tu auth . hook useSelector lay trang thai authentication tu authSelector
	const dispatch = useDispatch();

	useEffect(() => {
		getData(); // chay ham getData 
	}, []);

	const getData = async () => {
		const res = localStorage.getItem(localDataNames.authData);
		// lay du lieu tu localStorage 
		res && dispatch(addAuth(JSON.parse(res)));

	};

	return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <Mainrouter />;
};

export default Routers;