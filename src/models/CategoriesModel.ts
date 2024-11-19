
export interface CategoyModel {
	_id: string;
	title: string;
	parentId: string;
	slug: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	image?: string;
	children: CategoyModel[];
	__v: number;
}