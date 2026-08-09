-- Site-wide settings (currently just social links), editable from /admin without a deploy.
-- Single-row table: id is always 1.

create table if not exists public.site_settings (
  id int primary key default 1,
  youtube_url text,
  linkedin_url text,
  tiktok_url text,
  twitter_url text,
  contact_email text,
  updated_at timestamptz default now(),
  constraint site_settings_single_row check (id = 1)
);

insert into public.site_settings (id, youtube_url, linkedin_url, tiktok_url, twitter_url, contact_email)
values (
  1,
  'https://www.youtube.com/@HerballoCo',
  'https://www.linkedin.com/company/herballo/',
  'https://www.tiktok.com/@Herballo',
  'https://x.com/princeo43022643',
  'info@herballo.co'
)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

-- Public (anon) can read — the live site's footer needs this to show the links.
-- All writes go through the /api/admin/settings server route using the
-- service-role key, which bypasses RLS entirely, so no write policy is needed
-- (or wanted) here.
create policy "Public can read site settings"
  on public.site_settings for select
  using (true);
