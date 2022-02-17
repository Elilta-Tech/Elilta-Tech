import { PostsService } from './../../Services/posts.service';
import { postModel } from './../../Models/post-interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
	posts: postModel[] = [];
	// postSubscription: Subscription;

	constructor(private PostsService: PostsService) {}

	ngOnInit(): void {
		this.PostsService.getPost();

		// this.postSubscription =
		this.PostsService.postUpdateListener.subscribe(
			(posts) => (this.posts = posts),
		);
	}

	ngOnDestroy(): void {
		// this.postSubscription.unsubscribe();
	}
}
