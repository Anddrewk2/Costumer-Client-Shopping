/** @format */

import handleAPI from '@/apis/handleAPI';
import { ProductItem } from '@/components';
import { ProductModel } from '@/models/ProductModel';
import { getTreeValues } from '@/utils/getTreeValues';
import { SelectModel } from '@/models/FormModel';
import {
	Breadcrumb,
	Button,
	Checkbox,
	Empty,
	Layout,
	Pagination,
	Select,
	Skeleton,
	Space,
	Typography,
} from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { FaElementor } from 'react-icons/fa';

const { Sider, Content } = Layout;

const ShopPage = () => {

	const getdata =async () => {
		try {
			getCategories();
		} catch (error) {
			
		}
	}

	const [filterValues, setFilterValues] = useState<{
		catIds: string[];
	}>({
		catIds: [],
	});
	const [api, setApi] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<ProductModel[]>([]);
	const [categories, setcategories] = useState<SelectModel[]>([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const params = useSearchParams();
	const catId = params.get('catId');
	useEffect(() => {
		getdata();
	}, []);

	useEffect(() => {
		if (catId) {
			const items = filterValues.catIds;
			const index = items.findIndex((element) => element === catId);
			if (index !== -1) {
				items.splice(index, 1);
			} else {
				items.push(catId);
			}

			handleChangeFilterValues('catIds', items);
		}
	}, [catId]);

	useEffect(() => {
		let url = ``;
		const values: any = { ...filterValues };

		for (const i in values) {
			const val = values[i];
			if (val && val.length > 0) {
				url +=
					typeof val === 'object' ? `${i}=${val.toString()}&` : `${i}=${val}&`;
			}
		}

		url && setApi(`/products?${url}pageSize=15&page=${page}`);
	}, [filterValues, page]);

	useEffect(() => {
		api && getProductsByFilterValues();
	}, [api]);

	const handleChangeFilterValues = (key: string, vals: any) => {
		const items: any = { ...filterValues };
		items[key] = vals;

		setFilterValues(items);
	};

	const getCategories= async() => {
		const res = await handleAPI({
			url: '/categories/get-categories',
		});
		const vals = res.data ? res.data.data : [];
		const trueCategories = getTreeValues(vals , true)
		setcategories(trueCategories);
	}
	const getProductsByFilterValues = async () => {
		setIsLoading(true);
		try {
			const res = await handleAPI({ url: api });
			const { items, pageCount } = res.data.data;

			setTotalPage(pageCount);
			setProducts(items);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container-fluid'>
			<>
				<div className='row'>
					<div>
						<Breadcrumb
							items={[
								{
									key: 1,
									title: <Link href={'/'}>Home</Link>,
								},
								{
									key: 2,
									title: 'All products',
								},
							]}
						/>
					</div>
					<div className='col text-right d-block d-sm-none'>
						<Button>Filter</Button>
					</div>
				</div>

				<Layout className='bg-white mt-3 mb-4'>
					<div className='d-none d-md-block'>
						<Sider theme='light'>
							<div className="mb-4">
							<Checkbox.Group onChange={vals => console.log(vals)}
								options={categories}
								/>
								
							</div>
						</Sider>
					</div>
					{isLoading ? (
						<Skeleton />
					) : products && products.length > 0 ? (
						<Content>
							<div className='container'>
								<div className='row d-none d-md-block'>
									<div className=''>
										<Space>
											<Button
												type='text'
												icon={<FaElementor size={18} className='text-muted' />}
											/>
											<Button
												type='text'
												icon={<FaElementor size={18} className='text-muted' />}
											/>
											<Typography.Text type='secondary'>
												Showing 1 -{' '}
												{products.length > 15 ? '16' : products.length} of{' '}
												{products.length} results
											</Typography.Text>
										</Space>
									</div>
									<div className='col'>
										<Button type='text' icon={<BsArrowDown size={14} />}>
											Latest
										</Button>
									</div>
								</div>
								<div className='row'>
									{products.map((item: ProductModel) => (
										<ProductItem item={item} key={item._id} />
									))}
								</div>
								<div className='mt-4'>
									<Pagination
										align='end'
										current={page}
										total={15 * totalPage}
										onChange={(val) => setPage(val)}
										pageSize={15}
									/>
								</div>
							</div>
						</Content>
					) : (
						<Content>
							<Empty />
						</Content>
					)}
				</Layout>
			</>
		</div>
	);
};

export default ShopPage;

function getdata() {
	throw new Error('Function not implemented.');
}
