import { RateLimiterPrisma } from "rate-limiter-flexible";
import { prisma } from "../../../lib/db";
import { auth } from "@clerk/nextjs/server";

const CLIENT = prisma;
const TABLE_NAME = "Usage";
const PRO_POINTS = 100;
const FREE_POINTS = 5;
const DURATION = 30 * 24 * 60 * 60; // 30 days
const GENERATION_COST = 1;

export async function getUsageTracker() {

    const { has } = await auth();

    const hasProAccess = has({
        plan: 'pro'
    });

    const usageTracker = new RateLimiterPrisma({
        storeClient: CLIENT,
        tableName: TABLE_NAME,
        points: hasProAccess ? PRO_POINTS : FREE_POINTS,
        duration: DURATION,
    });

    return usageTracker;
}

export async function consumeCredits() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('User is not authenticated');
    }

    const usageTracker = await getUsageTracker();
    const result = await usageTracker.consume(userId, GENERATION_COST);

    return result;
}

export async function getUsageStatus() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('User is not authenticated');
    }

    const usageTracker = await getUsageTracker();
    const result = await usageTracker.get(userId);

    return result;
}