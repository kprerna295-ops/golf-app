import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "ddoerewxgrtiluqtbhda"
const supabaseKey = "sb_publishable_CshN0F4VJu82lvZBE6S-uw_0HWt5UCt"

export const supabase = createClient(supabaseUrl, supabaseKey)
