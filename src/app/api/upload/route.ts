import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
        return NextResponse.json(
            { error: "Filename is required" },
            { status: 400 }
        );
    }

    if (!request.body) {
        return NextResponse.json(
            { error: "Request body is required" },
            { status: 400 }
        );
    }

    try {
        const blob = await put(filename, request.body, {
            access: "public",
            // We don't want to use standard upload tokens for this simple private app,
            // server-side put uses the BLOB_READ_WRITE_TOKEN environment variable automatically.
        });

        return NextResponse.json(blob);
    } catch (error) {
        console.error("Error uploading to Blob:", error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}
