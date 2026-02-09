"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewIncidentUpdatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const record: Record<string, unknown> = {
      incident_id: formData.get("incident_id"),
      status: formData.get("status"),
      message: formData.get("message"),
      created_by: formData.get("created_by"),
    };

    const { error: insertError } = await supabase.from("incident_updates").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/incident-updates");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/incident-updates" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Incident Updates
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Incident Update</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="incident_id" className="label">Incident Id</label>
          <input id="incident_id" name="incident_id" type="text" className="input" placeholder="Enter incident id" required />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" placeholder="Enter status" required />
        </div>
        <div>
          <label htmlFor="message" className="label">Message</label>
          <input id="message" name="message" type="text" className="input" placeholder="Enter message" required />
        </div>
        <div>
          <label htmlFor="created_by" className="label">Created By</label>
          <input id="created_by" name="created_by" type="text" className="input" placeholder="Enter created by" required />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Incident Update"}
          </button>
          <Link href="/dashboard/incident-updates" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
