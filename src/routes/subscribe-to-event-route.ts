import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../functions/subscribe-to-event";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe someone to the event",
        tags: ["create"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string()
          }),
        },
      },
    },
    async (req, res) => {
      const { name, email } = req.body;
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
      });
      return res.status(201).send({ subscriberId});
    }
  );
};
