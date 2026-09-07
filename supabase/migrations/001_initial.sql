-- Initial production schema for Cup Club.
-- Apply to a dedicated Supabase project after review.

create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (char_length(username) between 3 and 24),
  display_name text not null check (char_length(display_name) between 1 and 50),
  bio text not null default '' check (char_length(bio) <= 300),
  avatar_path text,
  banner_path text,
  level integer not null default 1 check (level between 1 and 100),
  xp bigint not null default 0 check (xp >= 0),
  presence text not null default 'offline' check (presence in ('online','idle','dnd','offline')),
  custom_status text check (char_length(custom_status) <= 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null default 'discussion' check (kind in ('text','image','gallery','poll','guide','fan_art','achievement','speedrun','challenge','meme','discussion','question')),
  body text not null check (char_length(body) between 1 and 5000),
  is_spoiler boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.friendships (
  requester_id uuid not null references public.profiles(id) on delete cascade,
  addressee_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted','declined','blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (requester_id, addressee_id),
  check (requester_id <> addressee_id)
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  rarity text not null check (rarity in ('common','uncommon','rare','epic','legendary','secret')),
  xp_reward integer not null default 0 check (xp_reward >= 0),
  icon text,
  created_at timestamptz not null default now()
);

create table public.user_achievements (
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  progress numeric(5,2) not null default 0 check (progress between 0 and 100),
  unlocked_at timestamptz,
  primary key (user_id, achievement_id)
);

create index posts_author_created_idx on public.posts(author_id, created_at desc);
create index posts_created_idx on public.posts(created_at desc);
create index comments_post_created_idx on public.comments(post_id, created_at asc);
create index comments_author_idx on public.comments(author_id);
create index comments_parent_idx on public.comments(parent_id);
create index post_likes_user_idx on public.post_likes(user_id);
create index user_achievements_achievement_idx on public.user_achievements(achievement_id);
create index friendships_addressee_status_idx on public.friendships(addressee_id, status);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.comments enable row level security;
alter table public.friendships enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

create policy "profiles are publicly readable"
on public.profiles for select
to anon, authenticated
using (true);

create policy "users update own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "posts publicly readable"
on public.posts for select
to anon, authenticated
using (true);

create policy "users create own posts"
on public.posts for insert
to authenticated
with check ((select auth.uid()) = author_id);

create policy "users update own posts"
on public.posts for update
to authenticated
using ((select auth.uid()) = author_id)
with check ((select auth.uid()) = author_id);

create policy "users delete own posts"
on public.posts for delete
to authenticated
using ((select auth.uid()) = author_id);

create policy "likes readable"
on public.post_likes for select
to anon, authenticated
using (true);

create policy "users manage own likes insert"
on public.post_likes for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "users manage own likes delete"
on public.post_likes for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "comments readable"
on public.comments for select
to anon, authenticated
using (true);

create policy "users create own comments"
on public.comments for insert
to authenticated
with check ((select auth.uid()) = author_id);

create policy "users update own comments"
on public.comments for update
to authenticated
using ((select auth.uid()) = author_id)
with check ((select auth.uid()) = author_id);

create policy "users delete own comments"
on public.comments for delete
to authenticated
using ((select auth.uid()) = author_id);

create policy "friendships visible to participants"
on public.friendships for select
to authenticated
using ((select auth.uid()) in (requester_id, addressee_id));

create policy "users create outgoing friendship request"
on public.friendships for insert
to authenticated
with check ((select auth.uid()) = requester_id);

create policy "friendship participants update"
on public.friendships for update
to authenticated
using ((select auth.uid()) in (requester_id, addressee_id))
with check ((select auth.uid()) in (requester_id, addressee_id));

create policy "friendship participants delete"
on public.friendships for delete
to authenticated
using ((select auth.uid()) in (requester_id, addressee_id));

create policy "achievements readable"
on public.achievements for select
to anon, authenticated
using (true);

create policy "user achievement readable"
on public.user_achievements for select
to anon, authenticated
using (true);

-- Achievement writes should be performed by trusted server-side logic,
-- not directly by clients.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  desired_username text;
begin
  desired_username := lower(regexp_replace(coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)), '[^a-zA-Z0-9_]+', '', 'g'));
  if length(desired_username) < 3 then
    desired_username := 'player_' || substr(new.id::text, 1, 8);
  end if;
  if exists (select 1 from public.profiles where username = desired_username) then
    desired_username := left(desired_username, 15) || '_' || substr(new.id::text, 1, 6);
  end if;

  insert into public.profiles (id, username, display_name)
  values (new.id, desired_username, coalesce(nullif(new.raw_user_meta_data ->> 'display_name',''), desired_username));
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
