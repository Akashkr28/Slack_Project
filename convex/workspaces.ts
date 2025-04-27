import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";


export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId) {
            throw new Error("User is not authenticated");
        }

        // TODO: Create a proper method later
        const joinCode = "123456"

        const workspaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joinCode
        });

        return workspaceId;
    }
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("workspaces").collect();
    }
})

export const getById = query({
    args: {
        id: v.id("workspaces") },
        handler: async (ctx, args) => {
            const userId = await getAuthUserId(ctx);

            if(!userId) {
                throw new Error("Unauthorised");
            }
        return await ctx.db.get(args.id);
    },
});