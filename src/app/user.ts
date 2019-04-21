import { Post } from './post';

export class User{
    id: number;
    username: String;
    password: String;
    email: String;
    firstname: String;
    lastname: String;
    postList: Post[];
}