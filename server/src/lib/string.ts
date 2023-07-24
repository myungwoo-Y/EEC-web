export function getKRFileName(file: Express.Multer.File) {
  return Buffer.from(file.originalname, 'latin1').toString();
}

export function generateFileKey(fileName: string) {
  const idx = fileName.indexOf('.');

  if (idx >= 0) {
    return fileName.slice(0, idx) + '_' + Date.now() + fileName.slice(idx);
  } else {
    return `${fileName}_${Date.now()}`;
  }

}