import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./utils/schema.js",

  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_y5aLRmeGk3wQ@ep-wandering-hall-a1tgwanm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  }
}
);
