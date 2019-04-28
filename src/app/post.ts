import { Like } from './like';

export class Post{
    id: number;
    description: string;
    postedDate: string;
    authorId: number;
    picture: string;
    likedBy: Like[];
}