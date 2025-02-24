import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';
import { PostWithUser } from './interface/post.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<PostWithUser[]> {
    const posts = await this.postsRepository.find({ relations: ['comments'] });

  // Map over posts and replace created_by with user name
  const postsWithUserNames: PostWithUser[] = await Promise.all(
    posts.map(async (post) => {
      const user = await this.usersService.findUserById(post.created_by);
      return {
        ...post,
        created_by: user.name,
        avatar: user.avatar
      };
    })
  );

  return postsWithUserNames;
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
