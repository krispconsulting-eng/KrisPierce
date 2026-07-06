-- Wellness Wheel persistence schema.
-- Run this in the Supabase SQL editor (or via `supabase db push`) once a
-- real project is connected. Pairs with src/persistence.js, which falls
-- back to local storage automatically when Supabase env vars aren't set.

create table if not exists public.wellness_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.wellness_state enable row level security;

-- Each caregiver can only ever read or write their own saved progress.
create policy "Users manage their own wellness state"
  on public.wellness_state
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
