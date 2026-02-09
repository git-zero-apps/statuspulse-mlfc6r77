"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditStatusPagePage() {
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
        .from("status_pages")
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
      page_name: formData.get("page_name"),
      page_slug: formData.get("page_slug"),
      logo_url: formData.get("logo_url"),
      brand_color: formData.get("brand_color"),
      custom_domain: formData.get("custom_domain"),
      header_text: formData.get("header_text"),
      timezone: formData.get("timezone"),
      show_branding: formData.get("show_branding") === "on",
      is_public: formData.get("is_public") === "on",
    };

    const { error: updateError } = await supabase
      .from("status_pages")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/status-pages");
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
        <p className="text-sm text-red-700">Status Page not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/status-pages" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Status Pages
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Status Page</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="page_name" className="label">Page Name</label>
          <input id="page_name" name="page_name" type="text" className="input" defaultValue={String(record.page_name ?? "")} required />
        </div>
        <div>
          <label htmlFor="page_slug" className="label">Page Slug</label>
          <input id="page_slug" name="page_slug" type="text" className="input" defaultValue={String(record.page_slug ?? "")} required />
        </div>
        <div>
          <label htmlFor="logo_url" className="label">Logo Url</label>
          <input id="logo_url" name="logo_url" type="url" className="input" defaultValue={String(record.logo_url ?? "")} />
        </div>
        <div>
          <label htmlFor="brand_color" className="label">Brand Color</label>
          <input id="brand_color" name="brand_color" type="text" className="input" defaultValue={String(record.brand_color ?? "")} />
        </div>
        <div>
          <label htmlFor="custom_domain" className="label">Custom Domain</label>
          <input id="custom_domain" name="custom_domain" type="text" className="input" defaultValue={String(record.custom_domain ?? "")} />
        </div>
        <div>
          <label htmlFor="header_text" className="label">Header Text</label>
          <input id="header_text" name="header_text" type="text" className="input" defaultValue={String(record.header_text ?? "")} />
        </div>
        <div>
          <label htmlFor="timezone" className="label">Timezone</label>
          <input id="timezone" name="timezone" type="text" className="input" defaultValue={String(record.timezone ?? "")} />
        </div>
        <div className="flex items-center gap-3">
          <input id="show_branding" name="show_branding" type="checkbox" defaultChecked={!!record.show_branding} className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="show_branding" className="text-sm font-medium text-gray-700">Show Branding</label>
        </div>
        <div className="flex items-center gap-3">
          <input id="is_public" name="is_public" type="checkbox" defaultChecked={!!record.is_public} className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="is_public" className="text-sm font-medium text-gray-700">Is Public</label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Status Page"}
          </button>
          <Link href="/dashboard/status-pages" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
