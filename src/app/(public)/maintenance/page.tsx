export default function MaintenancePage() {
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
