import { z } from "zod";
import {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'

export const subscribeToEvent: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: 'Subscribe someone to the event',
        tags: ['create'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (req, res) => {
      const { name, email } = req.body;

      return res.status(201).send({ name, email });
    }
  )
}
  ;
