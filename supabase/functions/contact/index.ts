
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    if (req.method === 'POST') {
      const body = await req.json()
      const { name, email, subject, message } = body

      // Validate required fields
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: 'Name, email, and message are required' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }

      // Save contact message
      const { data, error } = await supabaseClient
        .from('contact_messages')
        .insert([
          {
            name,
            email,
            subject,
            message,
          },
        ])
        .select()

      if (error) {
        console.error('Error saving contact message:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to send message' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        )
      }

      // Log successful contact form submission
      console.log('Contact form submitted:', { name, email, subject })

      return new Response(
        JSON.stringify({ 
          message: 'Message sent successfully',
          contact: data[0]
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
