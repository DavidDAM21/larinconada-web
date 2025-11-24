import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Create Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'No signature provided' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error('Webhook signature verification failed:', error.message);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    try {
        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.client_reference_id;
            const customerId = session.customer as string;

            if (!userId) {
                console.error('No user ID found in session');
                return NextResponse.json(
                    { error: 'No user ID found' },
                    { status: 400 }
                );
            }

            // Update user profile in Supabase
            const { error } = await supabaseAdmin
                .from('profiles')
                .update({
                    is_active_member: true,
                    stripe_customer_id: customerId,
                })
                .eq('id', userId);

            if (error) {
                console.error('Error updating user profile:', error);
                return NextResponse.json(
                    { error: 'Failed to update user profile' },
                    { status: 500 }
                );
            }

            console.log(`Successfully activated membership for user ${userId}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}
