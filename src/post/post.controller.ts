import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedRequest } from './interface/authenticate-request.interface';

@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  @ApiOperation({ summary: 'Create a new post' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Create post successfully' })
  createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    const email: string = req.user.email;
    console.log('email', email);
    if (!email) {
      throw new UnauthorizedException(
        'Invalid or missing token: email not found',
      );
    }
    createPostDto.created_by = email;
    return this.postsService.createPost(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Create comment successfully' })
  createComment(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    const email: string = req.user.email;
    console.log('email', email);
    if (!email) {
      throw new UnauthorizedException(
        'Invalid or missing token: email not found',
      );
    }
    createCommentDto.created_by = email;
    console.log('createCommentDto', createCommentDto);
    return this.postsService.createComment(createCommentDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
