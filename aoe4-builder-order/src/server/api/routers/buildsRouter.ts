import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const buildRouter = createTRPCRouter({



  createBuild: publicProcedure
    .input(z.object({ civilization: z.string(), build: z.string(), typee: z.string(), desc: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const build = await ctx.prisma.buildOrder.create({
        data: {
          ...input,
        },
      });
      return build;

    }),



  getBuilds: publicProcedure
  .query(async ({ctx}) => {
    const all_builds = await ctx.prisma.buildOrder.findMany();
    return all_builds;
  }),

});
