import { InjectRepository } from '@nestjs/typeorm';
import File from 'src/model/file.entity';
import { InsertResult, Repository } from 'typeorm';
import { unlink } from 'fs';
import { join } from 'path';
import * as AWS from 'aws-sdk';
import { generateFileKey, getKRFileName } from 'src/lib/string';

class FileService {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {
    this.s3 = new AWS.S3({
      endpoint: process.env.NAVER_CLOUD_URL,
      region: 'kr-standard',
      credentials: {
        accessKeyId: process.env.NAVER_CLOUD_KEY,
        secretAccessKey: process.env.NAVER_CLOUD_SECRET,
      },
    });
  }

  async uploadFileToS3(file: Express.Multer.File, fileName: string) {
    await this.s3.putObject({
      Bucket: 'eec',
      Key: fileName,
      ACL: 'public-read',
      Body: file.buffer,
    }).promise();
  }

  async uploadFile({
    file,
    postId,
    classId,
  }: {
    file: Express.Multer.File;
    postId?: number;
    classId?: number;
  }) {
    let newFile: InsertResult = null;

    const fileName = getKRFileName(file);
    const key = generateFileKey(fileName);
    const path = `${process.env.NAVER_CLOUD_BUCKET_PATH}/${key}`;

    await this.uploadFileToS3(file, key);

    if (postId) {
      newFile = await this.fileRepository.insert({
        filename: fileName,
        mimetype: file.mimetype,
        path,
        post: {
          postId,
        },
      });
    } else if (classId) {
      newFile = await this.fileRepository.insert({
        filename: fileName,
        mimetype: file.mimetype,
        path,
        class: {
          classId,
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

  async removeFilesById({
    postId,
    classId,
  }: {
    postId?: number;
    classId?: number;
  }) {
    let files: File[] = [];

    if (postId) {
      files = await this.fileRepository.find({
        where: {
          post: {
            postId,
          },
        },
      });
    } else if (classId) {
      files = await this.fileRepository.find({
        where: {
          class: {
            classId,
          },
        },
      });
    }

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
