/** @format */

import { Section, TabbarComponent } from '@/components';
import HeadComponent from '@/components/Headcomponent';
import { Button, Carousel, Space, Typography } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const { Title } = Typography;



const HomePage = () => {



	const catSlideRef = useRef<CarouselRef>(null);
	const router = useRouter();
	useEffect(() => {
		window.addEventListener('resize', (event) => {
			const width = window.innerWidth;
			const index = width <= 480 ? 2 : width <= 768 ? 3 : 4;

		});

		return () => window.removeEventListener('resize', () => {});
	}, []);



	return (
		<>
			<HeadComponent title='Home' />
			<div
				className='container-fluid d-none d-md-block'
				style={{ backgroundColor: '#f3f3f3' }}>
			</div>
			<div className='container'>
			<Section>
					<TabbarComponent title='Shop by categories' />
				</Section>
				<Section>
					<TabbarComponent title='Shop by promotions' />
				</Section>
				<Section>
					<TabbarComponent title='Our Bestseller' />
				</Section>
			</div>
		</>
	);
};

export default HomePage;