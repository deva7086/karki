import { NextResponse } from "next/server";
import { cloudinary, cloudinaryConfigured } from "@/lib/cloudinary";

/** Permanently removes an uploaded asset from Cloudinary. */
export async function POST(req: Request) {
  if (!cloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 }
    );
  }

  let publicId = "";
  let resourceType: "image" | "video" = "image";
  try {
    const body = await req.json();
    publicId = typeof body?.publicId === "string" ? body.publicId : "";
    if (body?.resourceType === "video") resourceType = "video";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!publicId) {
    return NextResponse.json({ error: "Missing publicId." }, { status: 400 });
  }

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to delete asset." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
