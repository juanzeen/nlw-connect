import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSubscriberInviteClicks } from "../functions/get-subscriber-invite-clicks";
import { getRanking } from "../functions/get-ranking";

export const getRankingRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/ranking",
    {
      schema: {
        summary: "Get the top 3 in the rank",
        tags: ["rank"],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },

    async (req) => {

      const { rankingWithScore } = await getRanking();

      return { ranking: rankingWithScore };
    }
  );
};
