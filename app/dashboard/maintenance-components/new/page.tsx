"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewMaintenanceComponentPage() {
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
      maintenance_id: formData.get("maintenance_id"),
      component_id: formData.get("component_id"),
    };

    const { error: insertError } = await supabase.from("maintenance_components").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/maintenance-components");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/maintenance-components" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Maintenance Components
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Maintenance Component</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="maintenance_id" className="label">Maintenance Id</label>
          <input id="maintenance_id" name="maintenance_id" type="text" className="input" placeholder="Enter maintenance id" required />
        </div>
        <div>
          <label htmlFor="component_id" className="label">Component Id</label>
          <input id="component_id" name="component_id" type="text" className="input" placeholder="Enter component id" required />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Maintenance Component"}
          </button>
          <Link href="/dashboard/maintenance-components" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
