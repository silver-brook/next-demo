import { db } from "@/db";
import { demo } from "@/db/schema";

export async function dbSelect() {
  return db.select().from(demo);
}

export async function dbInsert() {
  const demoData: typeof demo.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };
  return await db.insert(demo).values(demoData);
}
