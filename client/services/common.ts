export function getBaseHost() {
  return `${window.location.protocol}//${window.location.hostname}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;
}
