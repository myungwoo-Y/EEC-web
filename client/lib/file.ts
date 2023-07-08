export function createFileList(data: File | File[]) {
  const dataTransfer = new DataTransfer();
  if (Array.isArray(data)) {
    data.forEach((file) => {
      dataTransfer.items.add(file);
    });
  } else {
    dataTransfer.items.add(data);
  }

  return dataTransfer.files;
}
