import { InjectRepository } from '@nestjs/typeorm';
import File from 'src/model/file.entity';
import { Repository } from 'typeorm';
import { FileDto } from './file.dto';

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
        postId: fileDto.postId
      }
    });
    return newFile;
  }

  async getFileByName(fileName: string) {
    const file = await this.fileRepository.findOneBy({
      path: `upload/${fileName}`
    });

    return file;
  }


}

export default FileService;