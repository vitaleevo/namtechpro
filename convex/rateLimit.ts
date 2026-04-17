import { MutationCtx } from "./_generated/server";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const defaultConfig: Record<string, RateLimitConfig> = {
  createLead: { windowMs: 60000, maxRequests: 5 },
  createAppointment: { windowMs: 60000, maxRequests: 3 },
  sendMessage: { windowMs: 30000, maxRequests: 10 },
};

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(
  ctx: MutationCtx,
  action: string
): Promise<void> {
  const config = defaultConfig[action];
  if (!config) return;

  const now = Date.now();
  const key = `${action}`;
  
  const current = rateLimitStore.get(key);
  
  if (current && current.resetTime > now) {
    if (current.count >= config.maxRequests) {
      throw new Error("Too many requests. Please try again later.");
    }
    current.count++;
  } else {
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
  }
}