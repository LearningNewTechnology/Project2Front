import { Like } from './like';

export class Post{
    id: number;
    description: string;
    postedDate: string;
    authorId: number;
    picture: string;
    like: Like[];
}