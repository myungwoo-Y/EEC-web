import { InjectRepository } from '@nestjs/typeorm';
import File from 'src/model/file.entity';
import { Repository } from 'typeorm';
import { FileDto } from './file.dto';
import { unlink } from 'fs';
import { join } from 'path';

class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async saveLocalFileData(fileDto: FileDto) {
    const newFile = await this.fileRepository.create(fileDto);
    console.log(fileDto.postId);
    await this.fileRepository.insert({
      filename: fileDto.filename,
      mimetype: fileDto.mimetype,
      path: fileDto.path,
      post: {
        postId: fileDto.postId,
      },
    });
    return newFile;
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
