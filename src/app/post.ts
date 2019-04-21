import { Like } from './like';

export class Post{
    id: number;
    description: String;
    postedDate: Date;
    author_id: number;
    picture: String;
    likeList: Like[];
}