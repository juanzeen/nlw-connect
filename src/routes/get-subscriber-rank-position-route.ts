import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSubscriberRankingPosition } from "../functions/get-subscriber-ranking-position";

export const getSubscriberRankPositionRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/subscribers/:subscriberId/ranking/position",
    {
      schema: {
        summary: "Get subscriber ranking position",
        tags: ["referral"],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
    },

    async (req) => {
      const { subscriberId } = req.params;

      const { position } = await getSubscriberRankingPosition({ subscriberId });

      return { position };
    }
  );
};
