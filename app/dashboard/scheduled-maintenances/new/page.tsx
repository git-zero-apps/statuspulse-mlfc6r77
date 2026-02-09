"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewScheduledMaintenancePage() {
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
      status_page_id: formData.get("status_page_id"),
      title: formData.get("title"),
      description: formData.get("description"),
      scheduled_start: formData.get("scheduled_start"),
      scheduled_end: formData.get("scheduled_end"),
      status: formData.get("status"),
      auto_update_status: formData.get("auto_update_status") === "on",
      created_by: formData.get("created_by"),
    };

    const { error: insertError } = await supabase.from("scheduled_maintenances").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/scheduled-maintenances");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/scheduled-maintenances" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Scheduled Maintenances
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Scheduled Maintenance</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="status_page_id" className="label">Status Page Id</label>
          <input id="status_page_id" name="status_page_id" type="text" className="input" placeholder="Enter status page id" required />
        </div>
        <div>
          <label htmlFor="title" className="label">Title</label>
          <input id="title" name="title" type="text" className="input" placeholder="Enter title" required />
        </div>
        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea id="description" name="description" rows={4} className="input" placeholder="Enter description" />
        </div>
        <div>
          <label htmlFor="scheduled_start" className="label">Scheduled Start</label>
          <input id="scheduled_start" name="scheduled_start" type="datetime-local" className="input" placeholder="Enter scheduled start" required />
        </div>
        <div>
          <label htmlFor="scheduled_end" className="label">Scheduled End</label>
          <input id="scheduled_end" name="scheduled_end" type="datetime-local" className="input" placeholder="Enter scheduled end" required />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" placeholder="Enter status" />
        </div>
        <div className="flex items-center gap-3">
          <input id="auto_update_status" name="auto_update_status" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="auto_update_status" className="text-sm font-medium text-gray-700">Auto Update Status</label>
        </div>
        <div>
          <label htmlFor="created_by" className="label">Created By</label>
          <input id="created_by" name="created_by" type="text" className="input" placeholder="Enter created by" required />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Scheduled Maintenance"}
          </button>
          <Link href="/dashboard/scheduled-maintenances" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
