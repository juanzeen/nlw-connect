import type { Config } from "drizzle-kit";
import { env } from "./src/env";

//configurando o ORM
//basicamente falamos que todos os arquivos dentro de schemas são tabelas
//além de especificar que a saída do que for feito pelo banco deve ser colocado em migrations
//especificamos dialeto do postgres, passamos de onde deve ser resgatado a url do banco e ainda tipamos nossa config
//npx drizzle-kit generate cria migration
//npx drizzle-kit migrate roda a migration
export default {
  schema: "./src/drizzle/schema/*",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config;
