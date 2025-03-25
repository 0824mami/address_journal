import { createClient } from '@supabase/supabase-js'

// ↓ここを process.env から読み込むように変更
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase