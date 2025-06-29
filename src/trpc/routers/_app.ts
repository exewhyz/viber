import { createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/procedures';
import { projectsRouter } from '@/modules/projects/server/procedures';

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  messages: messagesRouter
});

export type AppRouter = typeof appRouter;