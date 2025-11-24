'use server';

import { stripe } from '@/lib/stripe/config';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function createCheckoutSession() {
    const supabase = await createClient();

    // Get the current user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    try {
        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Membresía La Rinconada',
                            description: 'Acceso completo a todos los beneficios de socio',
                        },
                        unit_amount: 4900, // €49.00
                        recurring: {
                            interval: 'year',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
            client_reference_id: user.id,
            customer_email: user.email,
        });

        return { url: session.url };
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        throw new Error('Failed to create checkout session');
    }
}
