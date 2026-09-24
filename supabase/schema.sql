-- IndieMakerStack v1 schema
-- Run this in the Supabase SQL editor for your project.

-- Enable UUID generation (usually already enabled on Supabase projects).
create extension if not exists "pgcrypto";

-- Categories table: a flat list of category names used to group tools.
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- Tools table: the main directory entries.
-- "category" stores the category name directly (not a foreign key) to
-- keep v1 simple; this can be normalized to a category_id later.
create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  link text not null,
  created_at timestamptz not null default now()
);

-- Helpful index for filtering tools by category.
create index if not exists tools_category_idx on tools (category);

-- Row Level Security
-- v1 has no authentication, so policies below allow public read/write.
-- Tighten these later once auth or an admin role is introduced.
alter table categories enable row level security;
alter table tools enable row level security;

-- Categories: public read-only access.
create policy "Public can read categories"
  on categories for select
  using (true);

-- Tools: public read access.
create policy "Public can read tools"
  on tools for select
  using (true);

-- Tools: public insert access (needed for the Submit Tool page).
create policy "Public can insert tools"
  on tools for insert
  with check (true);

-- Tools: public delete access (needed for the basic Admin page).
-- Since v1 has no auth, this is intentionally open. Restrict this
-- once an admin role or authentication is added.
create policy "Public can delete tools"
  on tools for delete
  using (true);
