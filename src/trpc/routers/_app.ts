import { createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/procedures';
import { projectsRouter } from '@/modules/projects/server/procedures';
import { usageRouter } from '@/modules/usage/server/procedures';

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  messages: messagesRouter,
  usage: usageRouter
});

export type AppRouter = typeof appRouter;