// app/api/liveblocks-auth/route.ts
import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  try {
    // Get authentication info
    const user = await currentUser();
    const authResult = await auth();

    if (!authResult || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Initialize Convex client with URL
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Get auth token - properly await the auth() call first
    const token = await authResult.getToken({ template: "convex" });
    if (!token) {
      return new Response("Authentication failed", { status: 401 });
    }

    // Set auth header for subsequent requests
    convex.setAuth(token);

    // Extract room ID from request
    const { room } = await request.json();
    if (!room) {
      return new Response("Room ID required", { status: 400 });
    }

    // Get orgId from authorization
    const orgId = authResult.orgId;
    if (!orgId) {
      return new Response("Organization ID required", { status: 400 });
    }

    // Fetch the specific board directly
    let board;
    try {
      board = await convex.query(api.board.getBoardById, { id: room });
    } catch (error) {
      console.error("Convex query failed:", error);
      return new Response("Failed to fetch board", { status: 500 });
    }

    if (!board || board.orgId !== orgId) {
      return new Response("Unauthorized access to board", { status: 403 });
    }

    // Prepare user info for Liveblocks
    const userInfo = {
      name: user.firstName || user.username || "Teammate",
      picture: user.imageUrl || "",
    };

    // Create and authorize session
    const session = liveblocks.prepareSession(user.id, { userInfo });
    session.allow(room, session.FULL_ACCESS);

    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.error("Liveblocks Auth Error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}