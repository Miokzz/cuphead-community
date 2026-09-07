const FALLBACK_URL = "https://spheksbyqardvuzxjqzu.supabase.co";
const FALLBACK_PUBLISHABLE_KEY = "sb_publishable_9lO3Erc_Qv_A9kIIYDXBKw_7NHs28gQ";

export function getSupabaseEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY
  };
}

export function hasSupabaseEnv() {
  const { url, publishableKey } = getSupabaseEnv();
  return Boolean(url && publishableKey);
}
