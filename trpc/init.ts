import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { ZodError } from "zod";



/**
 * Context — available in every procedure via ctx.*
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = cache(async (opts?: { headers?: Headers }) => {
  // Add your auth here, e.g.:
  // Clerk:   const { userId } = await auth(); // import from "@clerk/nextjs/server"
  // NextAuth: const session = await getServerSession();
  return { userId: null as string | null, headers: opts?.headers ?? new Headers() };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  /**
   * FEATURE 3: Global error formatter
   * Zod validation errors are formatted into readable field errors.
   * @see https://trpc.io/docs/server/error-formatting
   */
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const createTRPCRouter    = t.router;
export const createCallerFactory = t.createCallerFactory;

/** Public — no auth required */
export const baseProcedure = t.procedure;

/**
 * Protected — throws UNAUTHORIZED if user is not signed in.
 * Usage: protectedProcedure.query(({ ctx }) => { ctx.userId ... })
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be signed in to perform this action",
    });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});
