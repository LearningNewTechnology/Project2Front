import { Post } from './post';

export class User{
    id: number;
    username: String;
    password: String;
    email: String;
    firstName: String;
    lastName: String;
    postList: Post[];
}