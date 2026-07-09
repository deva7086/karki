import { NextResponse } from "next/server";
import { cloudinary, cloudinaryConfigured, CLOUDINARY_UPLOAD_FOLDER } from "@/lib/cloudinary";

/**
 * Returns a short-lived signature so the browser can upload a file straight to
 * Cloudinary (the secret never leaves the server, and large videos don't pass
 * through the serverless function).
 */
export async function POST(req: Request) {
  if (!cloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 }
    );
  }

  let folder = CLOUDINARY_UPLOAD_FOLDER;
  try {
    const body = await req.json();
    if (typeof body?.folder === "string" && body.folder.trim()) {
      folder = `${CLOUDINARY_UPLOAD_FOLDER}/${body.folder.replace(/[^a-z0-9/_-]/gi, "")}`;
    }
  } catch {
    // no body — use default folder
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({
    signature,
    timestamp,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
