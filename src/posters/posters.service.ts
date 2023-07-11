import { Injectable } from '@nestjs/common';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { PrismaService } from 'src/prisma.services';
import * as fs from 'fs';

@Injectable()
export class PostersService {

  constructor(private prismaService: PrismaService) {}

  async create(createPosterDto: CreatePosterDto, image: Express.Multer.File) {
    createPosterDto.amount = +createPosterDto.amount
    createPosterDto.authorId = +createPosterDto.authorId
    createPosterDto.categoryId = +createPosterDto.categoryId

    const data = {...createPosterDto, image: image.filename}

    return await this.prismaService.posters.create({data});
  }

  async findAll() {
    return await this.prismaService.posters.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.posters.findUnique({where: {id}});
  }

  async findByAuthor(id: number) {
    return await this.prismaService.posters.findMany({where: {authorId: id}});
  }

  async update(id: number, updatePosterDto: UpdatePosterDto, image: Express.Multer.File) {
    const product = await this.prismaService.posters.findUnique({where: {id}})
    updatePosterDto.amount = +updatePosterDto.amount
    if(image){
      fs.unlink(`${__dirname}/../../files/${product.image}`, (err) => {
        // if(err) throw new HttpException('file could not be found', HttpStatus.NOT_FOUND);  
      }) 
      const data = {...updatePosterDto, image: image.filename}
      return await this.prismaService.posters.update({where:{id}, data,});
    }
    return await this.prismaService.posters.update({where:{id}, data:updatePosterDto,}); 
  }

  async remove(id: number) {
    const product = await this.prismaService.posters.findUnique({where: {id}})
    fs.unlink(`${__dirname}/../../files/${product.image}`, (err) => {
      // if(err) throw new HttpException('file could not be found', HttpStatus.NOT_FOUND); 
    })
      
    return await this.prismaService.posters.delete({where: {id}});
  }
}
