import axios from 'axios';

export async function downloadFile(path: string, fileName: string) {
  axios({
    url: `http://localhost:8080/${path}`,
    method: 'GET',
    responseType: 'blob'
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  });
}