'use client';

import { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { Button } from '@/components/ui/Button';

export function UpgradeButton() {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const { url } = await createCheckoutSession();
            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Error al crear la sesión de pago. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleUpgrade}
            disabled={loading}
            variant="primary"
        >
            {loading ? 'Procesando...' : 'Actualizar a Socio Activo - €49/año'}
        </Button>
    );
}
