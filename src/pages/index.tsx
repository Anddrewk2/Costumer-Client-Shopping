/** @format */
import { authSelector } from '@/reduxs/reducers/AuthReducer';
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './auth/login';
import { appInfo } from '@/constants/appInfos';
import HomePage from './HomePage';

const Home = (data: any) => {
	const pageProps = data.pageProps;

	const auth = useSelector(authSelector);

	return auth.accesstoken ? <HomePage {...pageProps} /> : <Login />;
};

export default Home;
