import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import type { Response } from 'express';
import { createReadStream } from "fs";
import { join } from "path";
import FileService from "./file.service";

@Controller('/upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}
}