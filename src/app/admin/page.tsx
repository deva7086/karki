import { getContent } from "@/lib/content";
import { cloudinaryConfigured } from "@/lib/cloudinary";
import { kvConfigured } from "@/lib/kv";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();
  return (
    <AdminDashboard
      initial={content}
      flags={{ cloudinary: cloudinaryConfigured(), kv: kvConfigured }}
    />
  );
}
