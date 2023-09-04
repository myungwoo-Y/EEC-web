export function getKRFileName(file: Express.Multer.File) {
  return Buffer.from(file.originalname, 'latin1').toString();
}

export function generateFileKey(fileName: string) {
  return `${Date.now()}/${fileName}`;
}