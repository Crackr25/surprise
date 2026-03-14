import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    try {
        // List all blobs
        const { blobs } = await list();
        return NextResponse.json({ blobs });
    } catch (error) {
        console.error("Error fetching blobs:", error);
        return NextResponse.json(
            { error: "Failed to fetch images", blobs: [] },
            { status: 500 }
        );
    }
}
