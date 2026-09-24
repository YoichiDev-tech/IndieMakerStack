import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTools } from "../hooks/useTools";
import { useCategories } from "../hooks/useCategories";
import { NewTool } from "../types";

const emptyForm: NewTool = {
  name: "",
  category: "",
  description: "",
  link: "",
};

// Submit Tool page: a controlled form that writes a new row to the
// "tools" table in Supabase via the addTool helper from useTools.
export default function SubmitTool() {
  const { addTool } = useTools();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const [form, setForm] = useState<NewTool>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof NewTool>(field: K, value: NewTool[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: submitError } = await addTool(form);

    setSubmitting(false);

    if (submitError) {
      setError(submitError);
      return;
    }

    navigate("/");
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-xl font-semibold text-gray-900">Submit a tool</h1>
      <p className="mt-1 text-sm text-gray-500">
        Share a tool or resource for other indie makers to discover.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            required
            list="category-options"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="e.g. Analytics"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
          <datalist id="category-options">
            {categories.map((category) => (
              <option key={category.id} value={category.name} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="url"
            required
            value={form.link}
            onChange={(e) => updateField("link", e.target.value)}
            placeholder="https://example.com"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit tool"}
        </button>
      </form>
    </div>
  );
}
