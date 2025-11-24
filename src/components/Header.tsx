import Link from 'next/link';
import Image from 'next/image';

export function Header() {
    return (
        <header className="bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50 shadow-lg border-b-2 border-amber-800/20">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            <Image
                                src="/logo-rinconnada.jpg"
                                alt="La Rinconnada Losacio"
                                width={60}
                                height={60}
                                className="rounded-full shadow-md"
                            />
                            <div className="hidden md:block">
                                <div className="text-xl font-bold text-amber-900">La Rinconnada</div>
                                <div className="text-xs text-stone-600 -mt-1">Losacio - Zamora</div>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-stone-700 hover:text-amber-800 transition-colors font-medium">
                            Inicio
                        </Link>
                        <Link href="/blog" className="text-stone-700 hover:text-amber-800 transition-colors font-medium">
                            Noticias
                        </Link>
                        <Link href="/dashboard" className="text-stone-700 hover:text-amber-800 transition-colors font-medium">
                            Área Socios
                        </Link>
                        <Link
                            href="/login"
                            className="bg-amber-800 text-amber-50 px-5 py-2.5 rounded-lg hover:bg-amber-900 transition-colors font-semibold shadow-md"
                        >
                            Acceder
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
