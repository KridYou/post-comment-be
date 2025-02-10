import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
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
