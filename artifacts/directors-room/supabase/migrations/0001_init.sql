-- Enable UUID generation
create extension if not exists "pgcrypto";

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null default 'Untitled project',
  created_at timestamptz not null default now()
);

create table if not exists shots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  "order" integer not null default 1,
  title text not null default 'Untitled shot',
  prompt text not null default '',
  reference_images text[] not null default '{}',
  camera_rig text not null default 'static',
  duration integer not null default 4,
  resolution text not null default '1080p',
  aspect_ratio text not null default '16:9',
  provider text not null default 'kling',
  status text not null default 'draft',
  output_url text,
  continuity_notes text,
  created_at timestamptz not null default now()
);

alter table projects enable row level security;
alter table shots enable row level security;

create policy "Users manage their own projects"
  on projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage shots on their projects"
  on shots for all
  using (
    exists (select 1 from projects p where p.id = shots.project_id and p.user_id = auth.uid())
  )
  with check (
    exists (select 1 from projects p where p.id = shots.project_id and p.user_id = auth.uid())
  );

-- Storage bucket for uploads (run once)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Authenticated users upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
