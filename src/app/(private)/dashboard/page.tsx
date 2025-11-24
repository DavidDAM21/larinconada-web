import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { UpgradeButton } from './UpgradeButton';
import { LogoutButton } from './LogoutButton';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
    const params = await searchParams;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch user profile
    let { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // Fallback: If profile is missing (RLS issue?), try fetching with Admin Client
    if (!profile) {
        console.log('Profile not found with user token, trying Admin Client...');
        const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data: adminProfile } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (adminProfile) {
            console.log('Profile found with Admin Client');
            profile = adminProfile;
        } else {
            // Self-healing: Create profile if it really doesn't exist
            console.log('Profile truly missing, creating new profile for:', user.email);
            const { data: newProfile, error: createError } = await supabaseAdmin
                .from('profiles')
                .insert({
                    id: user.id,
                    is_active_member: false
                })
                .select()
                .single();

            if (createError) {
                console.error('Error creating profile:', createError);
            } else {
                profile = newProfile;
            }
        }
    }

    const isActiveMember = profile?.is_active_member || false;

    return (
        <div className="min-h-screen py-12 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-amber-900">Panel de Socios</h1>
                        <p className="text-stone-600 mt-2">Bienvenido, {user.email}</p>
                    </div>
                    <LogoutButton />
                </div>

                {/* Success/Cancel Messages */}
                {params.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                        ¡Pago procesado con éxito! Tu membresía ha sido activada.
                    </div>
                )}
                {params.canceled && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                        El pago fue cancelado. Puedes intentarlo de nuevo cuando quieras.
                    </div>
                )}

                {/* Membership Status */}
                <div className="mb-8">
                    <Card className={isActiveMember ? 'border-amber-500 border-2' : 'border-stone-300'}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-amber-900">
                                    {isActiveMember ? '✓ Socio Activo' : 'Cuenta Gratuita'}
                                </CardTitle>
                                {isActiveMember && (
                                    <span className="px-4 py-2 bg-amber-100 text-amber-900 rounded-full text-sm font-semibold">
                                        Activo
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isActiveMember ? (
                                <p className="text-stone-700">
                                    Tienes acceso completo a todos los beneficios de la asociación. ¡Gracias por ser parte de nuestra comunidad!
                                </p>
                            ) : (
                                <div>
                                    <p className="text-stone-700 mb-4">
                                        Tu cuenta es gratuita. Actualiza a socio activo para acceder a todos los beneficios exclusivos.
                                    </p>
                                    <UpgradeButton />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Actualizaciones para Socios */}
                {isActiveMember ? (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-amber-900">Actualizaciones para Socios</h2>

                        {/* Latest News */}
                        <Card className="border-amber-200">
                            <CardHeader>
                                <CardTitle className="text-amber-900 flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    Últimas Noticias
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border-l-4 border-amber-500 pl-4 py-2">
                                    <h3 className="font-semibold text-stone-900 mb-1">Programa de Fiestas 2025 - ¡Ya Disponible!</h3>
                                    <p className="text-sm text-stone-600 mb-2">
                                        Ya puedes consultar el programa completo de las fiestas patronales. Este año tendremos orquestas, verbenas y actividades para toda la familia.
                                    </p>
                                    <span className="text-xs text-stone-500">Publicado hace 2 días</span>
                                </div>

                                <div className="border-l-4 border-orange-500 pl-4 py-2">
                                    <h3 className="font-semibold text-stone-900 mb-1">Asamblea General - 15 de Diciembre</h3>
                                    <p className="text-sm text-stone-600 mb-2">
                                        Convocamos a todos los socios a la asamblea general donde votaremos las propuestas para el próximo año. Tu participación es importante.
                                    </p>
                                    <span className="text-xs text-stone-500">Publicado hace 5 días</span>
                                </div>

                                <div className="border-l-4 border-red-700 pl-4 py-2">
                                    <h3 className="font-semibold text-stone-900 mb-1">Nuevo Convenio con Comercios Locales</h3>
                                    <p className="text-sm text-stone-600 mb-2">
                                        Los socios ahora tienen descuentos exclusivos en comercios del pueblo. Consulta la lista completa en tu área de socios.
                                    </p>
                                    <span className="text-xs text-stone-500">Publicado hace 1 semana</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Active Polls */}
                        <Card className="border-amber-200">
                            <CardHeader>
                                <CardTitle className="text-amber-900 flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                    Encuestas Activas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                    <h3 className="font-semibold text-stone-900 mb-3">¿Qué tipo de música prefieres para las verbenas?</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="poll1" className="text-amber-600" />
                                                <span className="text-stone-700">Orquesta tradicional</span>
                                            </label>
                                            <span className="text-sm text-stone-500">45%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="poll1" className="text-amber-600" />
                                                <span className="text-stone-700">DJ moderno</span>
                                            </label>
                                            <span className="text-sm text-stone-500">30%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="poll1" className="text-amber-600" />
                                                <span className="text-stone-700">Ambos</span>
                                            </label>
                                            <span className="text-sm text-stone-500">25%</span>
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors">
                                        Enviar Voto
                                    </button>
                                </div>

                                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                                    <h3 className="font-semibold text-stone-900 mb-3">¿Qué actividades te gustaría ver en las fiestas?</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="text-amber-600" />
                                            <span className="text-stone-700">Concursos infantiles</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="text-amber-600" />
                                            <span className="text-stone-700">Torneos deportivos</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="text-amber-600" />
                                            <span className="text-stone-700">Cena popular</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="text-amber-600" />
                                            <span className="text-stone-700">Fuegos artificiales</span>
                                        </label>
                                    </div>
                                    <button className="mt-4 w-full bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors">
                                        Enviar Respuestas
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card className="hover:shadow-lg transition-shadow border-amber-100">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <svg className="w-12 h-12 mx-auto mb-3 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <h3 className="font-semibold text-stone-900 mb-2">Calendario</h3>
                                        <p className="text-sm text-stone-600">Ver próximos eventos</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow border-amber-100">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <svg className="w-12 h-12 mx-auto mb-3 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <h3 className="font-semibold text-stone-900 mb-2">Foro</h3>
                                        <p className="text-sm text-stone-600">Participa en debates</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow border-amber-100">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <svg className="w-12 h-12 mx-auto mb-3 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h3 className="font-semibold text-stone-900 mb-2">Galería</h3>
                                        <p className="text-sm text-stone-600">Fotos de eventos</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto mb-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">Contenido Exclusivo para Socios</h2>
                        <p className="text-stone-600 mb-6 max-w-md mx-auto">
                            Hazte socio activo para acceder a las últimas noticias, encuestas y contenido exclusivo de la asociación.
                        </p>
                        <UpgradeButton />
                    </div>
                )}
            </div>
        </div>
    );
}
