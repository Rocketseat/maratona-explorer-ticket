import { Redis } from "@upstash/redis";
import crypto from 'node:crypto';

export const redisConnection = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

interface UserData {
  name: string;
  roleOrCompany?: string;
  githubUsername?: string;
  avatarUrl: string;
}

export async function createUser(data: UserData) {
  const userId = crypto.randomUUID();
  
  await redisConnection.hsetnx('users', userId, data);

  return userId;
}

export async function getUser(userId: string) {
  const userRaw = await redisConnection.hget<UserData>('users', userId);

  if (!userRaw) {
    return null;
  }

  return userRaw;
}