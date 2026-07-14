import { redirect } from "next/navigation";

// Digital Twin moved into /ai-mindset as its closing section (Meet 13:
// Francisco asked to relocate it out of its own nav item). Keep this route
// alive as a redirect so any bookmarked/shared /digital-twin link still works.
export default function Page() {
  redirect("/ai-mindset#digital-twin");
}
