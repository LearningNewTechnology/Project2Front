import { Like } from './like';
import { User } from './user';

export class Post{
    id: number;
    description: string;
    postedDate: string;
    author: User;
    picture: string;
    likedBy: Like[];
}