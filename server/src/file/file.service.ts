import { InjectRepository } from '@nestjs/typeorm';
import File from 'src/model/file.entity';
import { InsertResult, Repository } from 'typeorm';
import { FileDto } from './file.dto';
import { unlink } from 'fs';
import { join } from 'path';

class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async saveLocalFileData(fileDto: FileDto) {
    let newFile: InsertResult = null;
    if (fileDto.postId) {
      newFile = await this.fileRepository.insert({
        filename: fileDto.filename,
        mimetype: fileDto.mimetype,
        path: fileDto.path,
        post: {
          postId: fileDto.postId,
        },
      });
    } else if (fileDto.classId) {
      newFile = await this.fileRepository.insert({
        filename: fileDto.filename,
        mimetype: fileDto.mimetype,
        path: fileDto.path,
        class: {
          classId: fileDto.classId,
        },
      });
    }
    
    if (newFile) {
      return newFile.raw[0];
    }
    
    return null;
  }

  async getFileByName(fileName: string) {
    const file = await this.fileRepository.findOneBy({
      path: `upload/${fileName}`,
    });

    return file;
  }

  async removeFilesByPostId(postId) {
    const files = await this.fileRepository.find({
      where: {
        post: {
          postId,
        },
      },
    });
    await Promise.all(
      files.map(async (file) => {
        await this.fileRepository.delete(file.fileId);
        // remove file from path
        unlink(join(process.cwd(), `/upload/${file.path}`), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }),
    );
  }
}

export default FileService;
