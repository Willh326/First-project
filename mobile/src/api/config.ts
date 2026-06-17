// Points at the local Express backend (see backend/). Override at build time
// if the backend runs somewhere other than localhost.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';
