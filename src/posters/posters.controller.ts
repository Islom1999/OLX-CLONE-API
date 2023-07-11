import { Controller, Get, Post, Body, Patch, Param,ValidationPipe, UseInterceptors, UploadedFile, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editedFileName } from 'src/utils/fileUpload';
import { PostersService } from './posters.service';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editedFileName
      })
    })  
  )
  create(
    @Body() createPosterDto: CreatePosterDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.postersService.create(createPosterDto, image);
  }

  @Get()
  findAll() {
    return this.postersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postersService.findOne(+id);
  }

  @Get('/author/:id')
  findByAuthor(@Param('id') id: string) {
    return this.postersService.findByAuthor(+id);
  }


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
    @Body() updatePosterDto: UpdatePosterDto, 
    image: Express.Multer.File
  ) {
    return this.postersService.update(+id, updatePosterDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postersService.remove(+id);
  }
}
