import { postModel } from './../Models/post-interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private Posts: postModel[] = [];
	postUpdateListener = new Subject<postModel[]>();

	getPost() {
		this.http
			.get<{ message: string; posts: postModel[] }>(
				'http://localhost:3000/api/posts',
			)
			.subscribe((postData) => {
				this.Posts = postData.posts;
				this.postUpdateListener.next(this.Posts.slice());
			});
	}

	createPost(title: string, content: string) {
		const newPost = {
			id: '',
			title,
			content,
		};

		this.http
			.post('http://localhost:3000/api/posts', newPost)
			.subscribe((response) => {
				console.log(response);
				this.Posts.unshift(newPost);
				this.postUpdateListener.next(this.Posts.slice());
			});
	}

	constructor(private http: HttpClient) {}
}
