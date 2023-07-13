import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { PrismaService } from 'src/prisma.services';
import * as fs from 'fs';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class PostersService {

  constructor(private prismaService: PrismaService) {}

  async getCategory() {
    try{
      const category =  await this.prismaService.category.findMany();
      if(!category){
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST)
      }
      return {code: 200, message: "Finded category", data: category}
    }catch(err){
      throw new HttpException(err.response, err.status)  
    }
  }

  async create(createPosterDto: CreatePosterDto, image: Express.Multer.File, userId:number) {
    try{
      createPosterDto.amount = +createPosterDto.amount
      createPosterDto.categoryId = +createPosterDto.categoryId
      createPosterDto['authorId'] = +userId
  
      const data = {...createPosterDto, image: image.filename}

      const user = await this.prismaService.posters.create({data});
  
      return {code: 201, message: "Created Poster", data: user}
    }catch(err){
      throw new HttpException(err.response, err.status)  
    }
  }

  async findAll(query: QueryDto) {
    try{
      const category = +query.category || null 
      const search = query.search || ""
      const from = +query.from || 0
      const to = +query.to || 1000000000
      const page = +query.page || 1
      const limit = +query.limit || 12
  
      const poster =  await this.prismaService.posters.findMany({
        skip: (page-1) * limit,
        take: limit,
        where: {
          OR:[
            {
              title: {
                contains: search,
                mode: 'insensitive',
                startsWith: search,
              }
            },
            {
              title: {
                contains: search,
                mode: 'insensitive',
                endsWith: search,
              }
            },
          ],
          categoryId: category ? category : {},
          amount: {
            gte: from,
            lte: to, 
          },
        },
        include: {
          author: {
              select: {
                fullname: true,
                email: true,
                phone: true,
                region: true,
              },
          },
        }
      });
  
      if(!poster[0]){
        throw new HttpException('Poster not found', HttpStatus.BAD_REQUEST)
      }
      return {code: 200, message: "Finded Posters", data: poster}
    }catch(err){
      throw new HttpException(err.response, err.status)  
    }
  }

  async findOne(id: number) {
    try{
      const poster =  await this.prismaService.posters.findUnique({where: {id}});
      if(!poster){
        throw new HttpException('Poster not found', HttpStatus.BAD_REQUEST)
      }
      return {code: 200, message: "Finded Poster", data: poster}
    }catch(err){
      throw new HttpException(err.response, err.status)  
    }
  }

  async findByAuthor(id: number) {
    try{
      const poster =  await this.prismaService.posters.findMany({where: {authorId: id}});
      if(!poster[0]){
        throw new HttpException('Poster not found', HttpStatus.BAD_REQUEST)
      }
      return {code: 200, message: "Finded Poster", data: poster}
    }catch(err){
      throw new HttpException(err.response, err.status)  
    }
  }

  async update(id: number, updatePosterDto: UpdatePosterDto, image: Express.Multer.File, userId: number) {
    try{
      const product = await this.prismaService.posters.findUnique({where: {id}})
      updatePosterDto.amount = +updatePosterDto.amount
  
      if(!product){
        throw new HttpException('Poster not found', HttpStatus.BAD_REQUEST)
      }
  
      if(product.authorId !== userId){
        throw new HttpException('Not access update', HttpStatus.FORBIDDEN)
      }
  
      if(image){
        fs.unlink(`${__dirname}/../../files/${product.image}`, (err) => {
          // if(err) throw new HttpException('file could not be found', HttpStatus.NOT_FOUND);  
        }) 
        const data = {...updatePosterDto, image: image.filename}
        return await this.prismaService.posters.update({where:{id}, data,});
      }

      const updatePoster = await this.prismaService.posters.update({where:{id}, data:updatePosterDto,});

      return {code: 200, message: "Updated Poster", data: updatePoster}
    }catch(err){
      throw new HttpException(err.response, err.status)  
    }
  }

  async remove(id: number, userId:number) {
    try{
      const product = await this.prismaService.posters.findUnique({where: {id}})
  
      if(!product){
        throw new HttpException('Poster not found', HttpStatus.BAD_REQUEST)
      }
  
      if(product.authorId !== userId){
        throw new HttpException('Not access update', HttpStatus.FORBIDDEN)
      }

      fs.unlink(`${__dirname}/../../files/${product.image}`, (err) => {
        // if(err) throw new HttpException('file could not be found', HttpStatus.NOT_FOUND); 
      })
      
      const deletePoster = await this.prismaService.posters.delete({where: {id}});
        
      return  {code: 200, message: "Deleted Poster", data: deletePoster}
    }catch(err){
      throw new HttpException(err.response, err.status)  
    }
  }
}
