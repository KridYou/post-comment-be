import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment, Post } from './entities/post.entity';
import { CreateCommentDto, CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    console.log('inside service');
    console.log('createCommentDto', createCommentDto);
    const comment = this.commentsRepository.create(createCommentDto);
    console.log('comment', comment);
    return this.commentsRepository.save(comment);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['comments'] });
  }

  // findOne(id: string): Promise<Post> {
  //   return this.postsRepository.findOne(id, { relations: ['comments'] });
  // }

  // async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
  //   await this.postsRepository.update(id, updatePostDto);
  //   return this.postsRepository.findOne(id);
  // }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
