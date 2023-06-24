import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import type { Response } from 'express';
import { createReadStream } from "fs";
import { join } from "path";
import FileService from "./file.service";

@Controller('/upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:fileName')
  public async findByEmail(
    @Res({ passthrough: true }) response,
    @Param('fileName') fileName: string,
  ) {
    console.log(fileName);
    const file = await this.fileService.getFileByName(fileName);
    console.log(file)
    const stream = createReadStream(join(process.cwd(), file.path));
    response?.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype
    });
    return new StreamableFile(stream);
  }
}