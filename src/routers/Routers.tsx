/** @format */

import handleAPI from '@/apis/handleAPI';
import HeaderComponent from '@/components/HeaderComponent';
import { localDataNames } from '@/constants/appInfos';
import { addAuth, authSelector } from '@/reduxs/reducers/AuthReducer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Content, Footer, Header } = Layout;

import { Layout, Spin } from 'antd';

const Routers = ({ Component, pageProps }: any) => {
	const [isLoading, setIsLoading] = useState(false);

	const path = usePathname();
	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	useEffect(() => {
		getData();
	}, []);



	const getData = async () => {
		const Res = localStorage.getItem(localDataNames.authData);
		if (Res) {
			try {
				const parsedData = JSON.parse(Res);
				dispatch(addAuth(parsedData));
			} catch (error) {
				console.error("Invalid JSON format in authData:", error);
				// Xử lý trường hợp JSON không hợp lệ tại đây, ví dụ xóa key authData khỏi localStorage
				localStorage.removeItem(localDataNames.authData);
			}
		}
	};
	
	


	return isLoading ? (
		<Spin />
	) : !auth || !auth.accesstoken ? (
		<Layout className='bg-white'>
			<Component pageProps={pageProps} />
		</Layout>
	) : (
		<Layout className='bg-white'>
			<HeaderComponent />
			<Content>
				<Component pageProps={pageProps} />
			</Content>
		</Layout>
	);
};

export default Routers;