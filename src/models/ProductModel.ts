/** @format */

import { SupplierModel } from "./SupplierModel";


export interface ProductModel {
	_id: string;
	title: string;
	slug: string;
	description: string;
	categories: string[];
	content: String,
	images: string[];
    supplier: string[] | { name: string }[]; // Nếu supplier có thể là một mảng object.
	createdAt: string;
	updatedAt: string;
	__v: number;
	isDeleted: boolean;
	subItems: SubProductModel[];
	price: number[];
}

export interface SubProductModel {
	size: string;
	color: string;
	price: number;
	qty: number;
	productId: string;
	images: any[];
	_id: string;
	createdAt: string;
	discount?: number;
	updatedAt: string;
	__v: number;
	imgURL?: string;
	count: number;
	createdBy: string;
}

export interface AddressModel {
	name: string;
	phoneNumber: string;
	address: string;
	createdBy: string;
	isDefault: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}