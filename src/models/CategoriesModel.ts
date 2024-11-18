export interface CategoyModel {
	_id: string;
	title: string;
	parentId: string;
	slug: string;
	description: string;
	image?: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}