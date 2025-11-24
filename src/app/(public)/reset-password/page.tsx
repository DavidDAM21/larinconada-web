'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { translateSupabaseError } from '@/lib/utils/translations';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage({
                type: 'error',
                text: 'Las contraseñas no coinciden'
            });
            return;
        }

        if (password.length < 6) {
            setMessage({
                type: 'error',
                text: 'La contraseña debe tener al menos 6 caracteres'
            });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setMessage({
                type: 'success',
                text: '¡Contraseña actualizada con éxito! Redirigiendo...'
            });

            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: translateSupabaseError(error.message || 'Error al actualizar la contraseña')
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-900">
                        Restablecer Contraseña
                    </h1>
                    <p className="mt-2 text-stone-600">
                        Introduce tu nueva contraseña
                    </p>
                </div>

                <Card>
                    <CardContent>
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                                    Nueva Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700 mb-2">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>

                            {message && (
                                <div
                                    className={`p-4 rounded-lg ${message.type === 'error'
                                        ? 'bg-red-50 text-red-800 border border-red-200'
                                        : 'bg-green-50 text-green-800 border border-green-200'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
