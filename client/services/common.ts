import { RootState } from "@/redux/store"

export function getBaseHost() {
  return `${window.location.protocol}//${window.location.hostname}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;
}

export function addTokenToHeader(headers: Headers, getState: () => unknown): Headers {
  const token = (getState() as RootState).auth.token
  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }
  return headers
}
