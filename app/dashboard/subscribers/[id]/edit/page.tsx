"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditSubscriberPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchRecord() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) setError(error.message);
      else setRecord(data);
      setFetching(false);
    }
    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const updates: Record<string, unknown> = {
      status_page_id: formData.get("status_page_id"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      confirmed: formData.get("confirmed") === "on",
      confirmation_token: formData.get("confirmation_token"),
      subscription_type: formData.get("subscription_type"),
      unsubscribed: formData.get("unsubscribed") === "on",
    };

    const { error: updateError } = await supabase
      .from("subscribers")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/subscribers");
      router.refresh();
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-700">Subscriber not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/subscribers" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Subscribers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Subscriber</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="status_page_id" className="label">Status Page Id</label>
          <input id="status_page_id" name="status_page_id" type="text" className="input" defaultValue={String(record.status_page_id ?? "")} required />
        </div>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" name="email" type="email" className="input" defaultValue={String(record.email ?? "")} required />
        </div>
        <div>
          <label htmlFor="phone" className="label">Phone</label>
          <input id="phone" name="phone" type="text" className="input" defaultValue={String(record.phone ?? "")} />
        </div>
        <div className="flex items-center gap-3">
          <input id="confirmed" name="confirmed" type="checkbox" defaultChecked={!!record.confirmed} className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="confirmed" className="text-sm font-medium text-gray-700">Confirmed</label>
        </div>
        <div>
          <label htmlFor="confirmation_token" className="label">Confirmation Token</label>
          <input id="confirmation_token" name="confirmation_token" type="text" className="input" defaultValue={String(record.confirmation_token ?? "")} />
        </div>
        <div>
          <label htmlFor="subscription_type" className="label">Subscription Type</label>
          <input id="subscription_type" name="subscription_type" type="text" className="input" defaultValue={String(record.subscription_type ?? "")} />
        </div>
        <div className="flex items-center gap-3">
          <input id="unsubscribed" name="unsubscribed" type="checkbox" defaultChecked={!!record.unsubscribed} className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="unsubscribed" className="text-sm font-medium text-gray-700">Unsubscribed</label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Subscriber"}
          </button>
          <Link href="/dashboard/subscribers" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
