import { redis } from "../redis/client";

interface GetSubscriberInviteCountParams {
  subscriberId: string
}

export async function getSubscriberInviteCount({
  subscriberId
}: GetSubscriberInviteCountParams) {
  //zscore só funciona com sorted sets, justamente por ser ordenado e lidar como um rank
  const count = await redis.zscore('referral:ranking', subscriberId)

  return {count: count ? Number.parseInt(count) : 0}
}
