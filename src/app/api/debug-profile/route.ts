import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Not authenticated', authError }, { status: 401 });
    }

    // 1. Try to fetch existing profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    let creationResult = null;
    let envCheck = {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    };

    // 2. If missing, try to create using Admin Client
    if (!profile) {
        try {
            const supabaseAdmin = createAdminClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!,
                {
                    auth: {
                        autoRefreshToken: false,
                        persistSession: false
                    }
                }
            );

            const { data: newProfile, error: createError } = await supabaseAdmin
                .from('profiles')
                .insert({
                    id: user.id,
                    is_active_member: false
                })
                .select()
                .single();

            creationResult = { success: !createError, newProfile, createError };
        } catch (e: any) {
            creationResult = { success: false, error: e.message };
        }
    }

    return NextResponse.json({
        user: { id: user.id, email: user.email },
        envCheck,
        existingProfile: profile,
        profileError,
        creationAttempt: creationResult
    });
}
