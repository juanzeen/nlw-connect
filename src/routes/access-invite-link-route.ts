import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from "../redis/client";

export const accesInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/invites/:subscriberId",
    {
      schema: {
        summary: "Register someone based on link and redirect",
        tags: ["referral"],
        params: z.object({
          subscriberId: z.string()
        }),
        response: {
          201: z.object({
            subscriberId: z.string()
          }),
        },
      },
    },
    async (req, res) => {
      const { subscriberId } = req.params;

      await accessInviteLink({ subscriberId })

      console.log(await redis.hgetall('referral:access-count'))

      const redirectUrl = new URL(env.WEB_URL)

      //define um searchparam na url para conseguir referenciar o usuário que enviou o convite
      redirectUrl.searchParams.set('referrer', subscriberId)

      //301 -> redirect permanente
      //302 -> redirect temporário
      return res.redirect(redirectUrl.toString(), 302);
    }
  );
};
