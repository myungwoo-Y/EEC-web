export async function getBlobFromUrl(path: string) {
  const data = await fetch(path).then((r) => r.blob());
  return data;
}

export async function getFileFromUrl(path: string, fileName: string) {
  const data = await getBlobFromUrl(path);
  const file = new File([data], fileName);
  return file;
}

export async function downloadFile(path: string, fileName: string) {
  const data = await getBlobFromUrl(path);
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}
