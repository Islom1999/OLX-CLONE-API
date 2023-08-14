import {HttpException, HttpStatus } from "@nestjs/common";
import * as path from "path";

export const editedFileName = (req: any, file: any, callback: any) => {
    try {
        const name = file.originalname.split('.')[0];
        const fileExtName = path.extname(file.originalname);
        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
        // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    } catch (error) {
        throw new HttpException('Image file upload error', HttpStatus.BAD_REQUEST)
    }
}

export const imageFileFilter = (req, file, callback) => { 
    try {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    } catch (error) {
        throw new HttpException('Image file upload error', HttpStatus.BAD_REQUEST) 
    }
};