import { Post } from './post';

export class User{
    id: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    postList: Post[];
}