import { RootState } from "@/redux/store"

export function getBaseHost() {
  return `${window.location.protocol}//${window.location.hostname}:8080`;
}

export function addTokenToHeader(headers: Headers, getState: () => unknown): Headers {
  const token = (getState() as RootState).auth.token
  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }
  return headers
}
