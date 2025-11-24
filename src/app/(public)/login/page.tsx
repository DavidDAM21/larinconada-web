'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { translateSupabaseError } from '@/lib/utils/translations';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handlePasswordReset = async () => {
        if (!email) {
            setMessage({
                type: 'error',
                text: 'Por favor, introduce tu email primero'
            });
            return;
        }

        setResetLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setMessage({
                type: 'success',
                text: '¡Email enviado! Revisa tu bandeja de entrada para restablecer tu contraseña.'
            });
            setShowPasswordReset(false);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error al enviar el email';
            setMessage({
                type: 'error',
                text: translateSupabaseError(errorMessage)
            });
        } finally {
            setResetLoading(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setShowPasswordReset(false);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) {
                    // Check if it's an invalid credentials error
                    if (error.message.includes('Invalid login credentials')) {
                        setShowPasswordReset(true);
                    }
                    throw error;
                }

                setMessage({ type: 'success', text: '¡Inicio de sesión exitoso!' });
                router.push('/dashboard');
                router.refresh();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;

                setMessage({
                    type: 'success',
                    text: '¡Cuenta creada! Por favor, verifica tu email para activar tu cuenta. Revisa tu bandeja de entrada y la carpeta de spam.'
                });

                // Switch to login mode after showing message
                setTimeout(() => {
                    setIsLogin(true);
                    setEmail('');
                    setPassword('');
                }, 4000);
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
            setMessage({
                type: 'error',
                text: translateSupabaseError(errorMessage)
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
                        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </h1>
                    <p className="mt-2 text-stone-600">
                        {isLogin
                            ? 'Accede a tu cuenta de socio'
                            : 'Únete a nuestra comunidad'}
                    </p>
                </div>

                <Card>
                    <CardContent>
                        <form onSubmit={handleAuth} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                                    Contraseña
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

                            {showPasswordReset && isLogin && (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                    <p className="text-sm text-amber-900 mb-3">
                                        ¿Olvidaste tu contraseña? Te enviaremos un email para restablecerla.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handlePasswordReset}
                                        disabled={resetLoading}
                                        className="w-full px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                    >
                                        {resetLoading ? 'Enviando...' : 'Enviar email de recuperación'}
                                    </button>
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading
                                    ? 'Procesando...'
                                    : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setMessage(null);
                                }}
                                className="text-amber-800 hover:text-amber-900 text-sm font-medium"
                            >
                                {isLogin
                                    ? '¿No tienes cuenta? Regístrate'
                                    : '¿Ya tienes cuenta? Inicia sesión'}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
