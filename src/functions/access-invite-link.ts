import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface AccessInviteLinkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId
}: AccessInviteLinkParams) {
  //incrementa em um o refferal:acces-count baseado na chave que é o ID do usuário que mandou o link
  await redis.hincrby('referral:access-count', subscriberId, 1)
}

//lists redis.l* []
//hashes redis.h* {}
//sorted sets redis.z* [] ordenado
