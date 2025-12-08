import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { adminMiddleware } from "~/lib/auth/middleware";
import { user } from "~/lib/db/schema";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
}

/**
 * Server function to fetch all users (admin only)
 */
export const $getUsers = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }): Promise<AdminUser[]> => {
    const users = await context.db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        createdAt: user.createdAt,
      })
      .from(user)
      .orderBy(desc(user.createdAt));

    return users;
  });

/**
 * Server function to delete a user (admin only)
 */
export const $deleteUser = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(z.object({ userId: z.string().min(1, "userId is required") }))
  .handler(async ({ data, context }) => {
    await context.db.delete(user).where(eq(user.id, data.userId));
    return { success: true };
  });
