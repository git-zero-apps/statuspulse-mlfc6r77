"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewComponentUptimePage() {
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
      component_id: formData.get("component_id"),
      date: formData.get("date"),
      uptime_percentage: formData.get("uptime_percentage") ? Number(formData.get("uptime_percentage")) : null,
    };

    const { error: insertError } = await supabase.from("component_uptime").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/component-uptime");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/component-uptime" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Component Uptime
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Component Uptime</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="component_id" className="label">Component Id</label>
          <input id="component_id" name="component_id" type="text" className="input" placeholder="Enter component id" required />
        </div>
        <div>
          <label htmlFor="date" className="label">Date</label>
          <input id="date" name="date" type="text" className="input" placeholder="Enter date" required />
        </div>
        <div>
          <label htmlFor="uptime_percentage" className="label">Uptime Percentage</label>
          <input id="uptime_percentage" name="uptime_percentage" type="number" className="input" placeholder="Enter uptime percentage" step="0.01" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Component Uptime"}
          </button>
          <Link href="/dashboard/component-uptime" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
