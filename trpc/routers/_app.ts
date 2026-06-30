import { baseProcedure, createTRPCRouter } from "../init";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  /**
   * Health check — verify tRPC is working.
   * FEATURE 4: Zod input validation example below.
   */
  health: baseProcedure.query(async () => {
    return { status: "Ok", code: 200 };
  }),

  /**
   * Zod validation example:
   * Input is validated automatically — throws BAD_REQUEST if invalid.
   */
  greet: baseProcedure
    .input(z.object({ name: z.string().min(1, "Name is required") }))
    .query(({ input }) => {
      return { message: `Hello, ${input.name}! tRPC is working.` };
    }),

});

export type AppRouter = typeof appRouter;
