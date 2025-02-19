import { redis } from "../redis/client";

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId
}: GetSubscriberRankingPositionParams) {
  //retorna o indice da pessoa no rank (zero-based)
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank == null) {
    return {position: null}
  }

  return {position: rank + 1}
}
