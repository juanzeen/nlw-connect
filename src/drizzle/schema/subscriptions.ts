import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const subscriptions = pgTable('subscriptions', {
  //referencia no codigo: tipo(nome no banco)
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})
