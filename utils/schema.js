import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: timestamp('createdAt').defaultNow(), // Optional: Use timestamp for dates
  mockId: varchar('mockId').notNull(),
});