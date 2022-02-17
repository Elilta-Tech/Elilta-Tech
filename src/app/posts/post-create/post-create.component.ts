import { PostsService } from './../../Services/posts.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
	postForm!: FormGroup;

	submitForm(): void {
		if (this.postForm.valid) {
			this.postService.createPost(
				this.postForm.value.title,
				this.postForm.value.content,
			);
			this.message.create('success', `New Post Created Successfully!!`);
			this.postForm.reset();
		} else {
			Object.values(this.postForm.controls).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity({ onlySelf: true });
				}
			});
		}
	}

	constructor(
		private fb: FormBuilder,
		private postService: PostsService,
		private message: NzMessageService,
	) {}

	ngOnInit(): void {
		this.postForm = this.fb.group({
			title: [null, [Validators.required]],
			content: [null, [Validators.required]],
		});
	}
}
