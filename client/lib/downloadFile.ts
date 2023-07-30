export async function getBlobFromUrl(path: string) {
  const data = await fetch(path, {
}).then((r) => r.blob());
  return data;
}

export async function getFileFromUrl(path: string, fileName: string) {
  const data = await getBlobFromUrl(path);
  const file = new File([data], fileName);
  return file;
}

export async function downloadFile(data: string | File, fileName = '') {
  const link = document.createElement('a');
  if (typeof data === 'string') {
    const fileData = await getBlobFromUrl(data);
    const url = window.URL.createObjectURL(new Blob([fileData]));
    link.href = url;
    link.setAttribute('download', fileName);
  } else {
    const url = window.URL.createObjectURL(data);
    link.href = url;
    link.setAttribute('download', data.name);
  }
  
  document.body.appendChild(link);
  link.click();
}