import { Controller, Get, Post, Body, Patch, Param,ValidationPipe, UseInterceptors, UploadedFile, Delete, UsePipes, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editedFileName, imageFileFilter } from 'src/utils/fileUpload';
import { PostersService } from './posters.service';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId } from 'src/decorators/getUserId';
import { QueryDto } from './dto/query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Posters")
@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get('/category')
  getCategory() {
    return this.postersService.getCategory();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editedFileName
      }),
      fileFilter: imageFileFilter
    })  
  )
  create(
    @Body() createPosterDto: CreatePosterDto,
    @GetCurrentUserId() userId: number,
    @UploadedFile() image: Express.Multer.File 
  ) {
    return this.postersService.create(createPosterDto, image, userId);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.postersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postersService.findOne(+id);
  }

  @Get('/author/:id')
  findByAuthor(@Param('id') id: string) {
    return this.postersService.findByAuthor(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editedFileName
      })
    })  
  )
  update(
    @Param('id') id: string, 
    @GetCurrentUserId() userId: number,
    @Body() updatePosterDto: UpdatePosterDto, 
    image: Express.Multer.File
  ) {
    return this.postersService.update(+id, updatePosterDto, image, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUserId() userId: number,) {
    return this.postersService.remove(+id, userId);
  }
}
