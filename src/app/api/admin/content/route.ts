import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent, defaultContent, type SiteContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  let body: Partial<SiteContent>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Merge over defaults so a partial payload can never wipe required fields.
  const next: SiteContent = { ...defaultContent, ...body };

  try {
    await saveContent(next);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save." },
      { status: 500 }
    );
  }

  // Refresh every public route so edits appear immediately.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
