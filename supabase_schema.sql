-- Create profiles table to store dynamic updates/overrides
create table if not exists public.profiles (
  slug text primary key,
  name text,
  title text,
  about text,
  photo_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Allow public read access to profiles"
  on public.profiles for select
  using (true);

create policy "Allow public insert/update access to profiles"
  on public.profiles for insert
  with check (true);

create policy "Allow public update access to profiles"
  on public.profiles for update
  using (true);


-- Create social_links table linked to profiles by slug
create table if not exists public.social_links (
  id uuid default gen_random_uuid() primary key,
  profile_slug text references public.profiles(slug) on delete cascade not null,
  label text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for social_links
alter table public.social_links enable row level security;

-- Policies for social_links
create policy "Allow public read access to social_links"
  on public.social_links for select
  using (true);

create policy "Allow public insert access to social_links"
  on public.social_links for insert
  with check (true);

create policy "Allow public delete access to social_links"
  on public.social_links for delete
  using (true);
