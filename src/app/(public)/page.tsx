import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// MAINTENANCE MODE: Change to true to activate maintenance page
const MAINTENANCE_MODE = true;

export default function HomePage() {
    // Show maintenance page if enabled
    if (MAINTENANCE_MODE) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="mb-8">
                        <svg className="w-24 h-24 mx-auto text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-amber-200 mb-4">
                        Web en Mantenimiento
                    </h1>
                    <p className="text-xl text-stone-300 mb-8">
                        Estamos trabajando para mejorar tu experiencia.
                    </p>
                    <p className="text-stone-400">
                        Volveremos pronto.
                    </p>
                </div>
            </div>
        );
    }

    // Original homepage content

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section with Losacio Image */}
            <section
                className="relative bg-cover bg-center text-white py-32 md:py-40"
                style={{ backgroundImage: 'url(/losacio-hero.png)' }}
            >
                {/* Elegant overlay matching logo colors */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-stone-800/75 to-amber-800/80"></div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl text-amber-50">
                            Asociación Cultural
                        </h1>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-2xl text-stone-100">
                            La Rinconnada
                        </h2>
                        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-lg font-medium text-amber-100">
                            Preservando las tradiciones y organizando las fiestas de Losacio, Zamora.
                            Cultura, comunidad y celebración desde el corazón del pueblo.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link href="/login">
                                <Button variant="white" className="text-lg shadow-xl">
                                    Únete a la Asociación
                                </Button>
                            </Link>
                            <Link href="/blog">
                                <button className="border-2 border-amber-100 text-amber-50 hover:bg-amber-50/20 px-6 py-3 rounded-lg font-medium transition-all text-lg backdrop-blur-sm">
                                    Ver Noticias
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-amber-900">
                            Nuestra Misión
                        </h2>
                        <p className="text-xl text-stone-700 max-w-3xl mx-auto">
                            Somos el corazón de las celebraciones de Losacio. Organizamos, planificamos y hacemos realidad
                            las fiestas patronales y eventos que unen a nuestro pueblo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-t-4 border-amber-700 hover:shadow-xl transition-shadow bg-white">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <svg className="w-16 h-16 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <CardTitle className="text-center text-amber-900">Fiestas Patronales</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-stone-600">
                                Organizamos las fiestas patronales con actividades para todas las edades.
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-orange-600 hover:shadow-xl transition-shadow bg-white">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <svg className="w-16 h-16 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                    </svg>
                                </div>
                                <CardTitle className="text-center text-orange-800">Música y Baile</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-stone-600">
                                Orquestas, verbenas y música tradicional para celebrar juntos.
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-red-700 hover:shadow-xl transition-shadow bg-white">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <svg className="w-16 h-16 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div>
                                <CardTitle className="text-center text-red-800">Gastronomía</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-stone-600">
                                Comidas populares y tradiciones culinarias de nuestro pueblo.
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-yellow-700 hover:shadow-xl transition-shadow bg-white">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <svg className="w-16 h-16 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <CardTitle className="text-center text-yellow-900">Actividades</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-stone-600">
                                Juegos, concursos y actividades para disfrutar en familia.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-amber-900">
                            Beneficios de ser Socio
                        </h2>
                        <p className="text-xl text-stone-700">
                            Forma parte activa de la asociación y disfruta de ventajas exclusivas
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <svg className="w-14 h-14 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <CardTitle className="text-center text-amber-900">Acceso Prioritario</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-stone-700">
                                Reserva anticipada para eventos y actividades especiales de las fiestas.
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-stone-50 to-amber-50 border-2 border-stone-200 hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <svg className="w-14 h-14 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <CardTitle className="text-center text-stone-900">Participa en Decisiones</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-stone-700">
                                Vota y propón ideas para las actividades y eventos del pueblo.
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <svg className="w-14 h-14 text-orange-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <CardTitle className="text-center text-orange-900">Información Exclusiva</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-stone-700">
                                Recibe noticias, programas y novedades antes que nadie.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        ¿Listo para unirte?
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 text-amber-100">
                        Crea tu cuenta gratuita y sé parte de la asociación que mantiene vivas las tradiciones de Losacio
                    </p>
                    <Link href="/login">
                        <Button variant="white" className="text-xl px-8 py-4">
                            Crear Cuenta Gratuita
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
