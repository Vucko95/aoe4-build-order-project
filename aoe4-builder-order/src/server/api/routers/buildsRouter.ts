import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const buildRouter = createTRPCRouter({
  createBuild: publicProcedure
    .input(z.object({ civilization: z.string(), build: z.string() }))
    .mutation(async ({ input, ctx }) => {

      const build = await ctx.prisma.buildOrder.create({
        data: {
          ...input,
        },
      });
      return build;

    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
