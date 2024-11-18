/** @format */

import handleAPI from '@/apis/handleAPI';
import { authSelector, removeAuth } from '@/reduxs/reducers/AuthReducer';
import { VND } from '@/utils/handleCurrency';
import {
	Affix,
	Avatar,
	Badge,
	Button,
	Card,
	Divider,
	Drawer,
	Dropdown,
	List,
	Menu,
	Space,
	Typography,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineTransaction } from 'react-icons/ai';
import { BiCart, BiPowerOff } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoHeartOutline, IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const HeaderComponent = () => {
	const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
	const [visibleModalTransationProduct, setVisibleModalTransationProduct] =
		useState(false);

	const auth = useSelector(authSelector);
	const dispatch = useDispatch();
	const router = useRouter();

	// Logout handler
	const handleLogout = () => {
		// Xóa token và thông tin người dùng khỏi Redux và localStorage
		dispatch(removeAuth()); // Gọi action removeAuth để reset Redux store
		localStorage.removeItem('authToken'); // Xóa token trong localStorage
		localStorage.removeItem('userId'); // Xóa userId trong localStorage
		// Điều hướng đến trang login
		localStorage.clear();
		router.push('/auth/login');
	};

	return (
		<Affix offsetTop={0}>
			<div className="container-fluid bg-white">
				<div className="p-3">
					<div className="row">
						<div className="d-none d-sm-block d-md-none">
							<Button
								type="text"
								icon={<GiHamburgerMenu size={22} />}
								onClick={() => setIsVisibleDrawer(true)}
							/>
						</div>
						<div className="col d-none d-md-block">
							<img src="https://firebasestorage.googleapis.com/v0/b/project-8592240410215207885.appspot.com/o/DH-Hoa-Sen-Main-Icon.png?alt=media&token=22e62305-6796-4db1-b63e-543fe8a001cd" style={{ width: 40 }} alt="" />
						</div>
						<div className="col d-none d-md-block text-center">
							<Menu
								style={{ border: 'none' }}
								mode="horizontal"
								items={[
									{
										label: <Link href={'/'}>Home</Link>,
										key: 'home',
									},
									{
										label: <Link href={'/shop'}>Shop</Link>,
										key: 'shop',
									},
									{
										label: <Link href={'/story'}>Our story</Link>,
										key: 'story',
									},
									{
										label: <Link href={'/blog'}>Blog</Link>,
										key: 'blog',
									},
									{
										label: <Link href={'/contact'}>Contact Us</Link>,
										key: 'contact',
									},
								]}
							/>
						</div>
						<div className="col text-right">
							<Space>
								<Button icon={<IoSearch size={24} />} type="text" />
								<Button icon={<IoHeartOutline size={24} />} type="text" />
								{auth.accesstoken && auth._id ? (
									<Button
										onClick={handleLogout} // Logout handler được gọi khi nhấn logout
										danger
										type="text"
										icon={<BiPowerOff size={23} />}
									/>
								) : (
									<Button
										type="primary"
										onClick={() => router.push('/')}
										href={``}>
										Login
									</Button>
								)}
							</Space>
						</div>
					</div>
				</div>
			</div>
		</Affix>
	);
};

export default HeaderComponent;
