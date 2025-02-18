import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
//zod é uma ferramenta usada para validações, usaremos ele para
//tratar os dados provenientes do frontend (validacao) e também para
//serializar os dados que serão enviados ao front (serializacao)
import { z } from "zod";
import {fastifySwagger} from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { env } from "./env";
import { accesInviteLinkRoute } from "./routes/access-invite-link-route";

//confiura o server com fastify e especifica que vai lidar com o type provider do zod
const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//cors configura qual frontend vai ter acesso a nossa API
app.register(fastifyCors, {
  //origin é o front que acessará a API
  //podemos deixar como true para nao restringir ninguem ou nao passar nenhum objeto
  origin: true,
});

//configura a api para seguir o padrao openapi
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1'
    }
  },
  transform: jsonSchemaTransform
  //o transform integra a validacao e serializacao das rotas na documentacao automaticamente
})

//configuramos o prefixo da UI do swagger, que é onde fica nossa doc da API
app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(subscribeToEventRoute)
app.register(accesInviteLinkRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log("Executando o server na porta 8080");
});
