export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is required');
}

export const API_TESTING_TOKEN = process.env.NEXT_PUBLIC_TESTING_TOKEN;
