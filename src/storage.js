// /src/storage.js
import { createClient } from '@supabase/supabase-js';

// LEGGI LE VARIABILI D’AMBIENTE DI VERCEL
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const SK = 'capannone-v3'; // stessa chiave che usi nel tuo App.jsx

async function get(key) {
  const { data, error } = await supabase
    .from('app_state')
    .select('data')
    .eq('id', key)
    .single();

  if (error) {
    console.warn('Supabase GET error:', error);
    return { value: null };
  }

  return { value: data?.data ? JSON.stringify(data.data) : null };
}

async function set(key, value) {
  const obj = JSON.parse(value);

  const { error } = await supabase
    .from('app_state')
    .upsert({ id: key, data: obj });

  if (error) {
    console.error('Supabase SET error:', error);
  }

  return { ok: !error };
}

if (typeof window !== 'undefined') {
  window.storage = { get, set };
}
