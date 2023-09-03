import { InjectRepository } from '@nestjs/typeorm';
import File from 'src/model/file.entity';
import { InsertResult, Repository } from 'typeorm';
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
    await this.s3
      .putObject({
        Bucket: 'eec',
        Key: fileName,
        ACL: 'public-read',
        Body: file.buffer,
      })
      .promise();
  }

  async uploadFileKeyVal({
    file,
    columnKey,
    idKey,
    id,
  }: {
    file: Express.Multer.File;
    columnKey: string;
    idKey: string;
    id: string | number;
  }): Promise<null | File> {
    const fileName = getKRFileName(file);
    const key = generateFileKey(fileName);
    const path = `${process.env.NAVER_CLOUD_BUCKET_PATH}/${key}`;

    await this.uploadFileToS3(file, key);

    const newFile = await this.fileRepository.insert({
      filename: fileName,
      mimetype: file.mimetype,
      path,
      [columnKey]: {
        [idKey]: id,
      },
    });

    if (newFile) {
      return newFile.raw[0];
    }

    return null;
  }

  async deleteFilesKeyVal({
    columnKey,
    idKey,
    id,
  }: {
    columnKey: string;
    idKey: string;
    id: string | number;
  }) {
    const files = await this.fileRepository.find({
      where: {
        [columnKey]: {
          [idKey]: id,
        },
      },
    });

    await Promise.all(
      files.map(async (file) => {
        await this.fileRepository.delete(file.fileId);
      }),
    );
  }

  async uploadFile({
    file,
    postId,
    classId,
    lectureId,
    lectureWithReferenceId,
  }: {
    file: Express.Multer.File;
    postId?: number;
    classId?: number;
    lectureId?: number;
    lectureWithReferenceId?: number;
  }): Promise<null | File> {
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
    } else if (lectureId) {
      newFile = await this.fileRepository.insert({
        filename: fileName,
        mimetype: file.mimetype,
        path,
        lecture: {
          lectureId,
        },
      });
    } else if (lectureWithReferenceId) {
      newFile = await this.fileRepository.insert({
        filename: fileName,
        mimetype: file.mimetype,
        path,
        lectureWithReference: {
          lectureId: lectureWithReferenceId,
        },
      });
    } else {
      newFile = await this.fileRepository.insert({
        filename: fileName,
        mimetype: file.mimetype,
        path,
      });
    }

    if (newFile) {
      const fileId = newFile.raw[0]?.fileId as string;
      if (typeof fileId !== 'string') {
        return newFile.raw[0];
      }
      return this.fileRepository.findOneBy({fileId});
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
    lectureId,
    lectureWithReferenceId,
  }: {
    postId?: number;
    classId?: number;
    lectureId?: number;
    lectureWithReferenceId?: number;
  }) {
    let files: File[] = [];

    if (postId) {
      const newFiles = await this.fileRepository.find({
        where: {
          post: {
            postId,
          },
        },
      });
      files = [...files, ...newFiles];
    }

    if (classId) {
      const newFiles = await this.fileRepository.find({
        where: {
          class: {
            classId,
          },
        },
      });
      files = [...files, ...newFiles];
    }

    if (lectureId) {
      const newFiles = await this.fileRepository.find({
        where: {
          lecture: {
            lectureId,
          },
        },
      });

      files = [...files, ...newFiles];
    }

    if (lectureWithReferenceId) {
      const newFiles = await this.fileRepository.find({
        where: {
          lectureWithReference: {
            lectureId: lectureWithReferenceId,
          },
        },
      });
      files = [...files, ...newFiles];
    }

    await Promise.all(
      files.map(async (file) => {
        await this.fileRepository.delete(file.fileId);
      }),
    );
  }

  async linkFileToParent({
    parentColumnName,
    parentIdName,
    parentId,
    fileId,
  }: {
    parentColumnName: string,
    parentIdName: string,
    parentId: string | number,
    fileId: string
  }) {
    return this.fileRepository.save({
      fileId,
      [parentColumnName]: {
        [parentIdName]: parentId
      }
    });
  }
}

export default FileService;
