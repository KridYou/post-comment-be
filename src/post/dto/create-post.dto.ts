// create-post.dto.ts
export class CreatePostDto {
  content: string;
  created_by: string;
}

// create-comment.dto.ts
export class CreateCommentDto {
  postId: string;
  content: string;
  created_by: string;
}
