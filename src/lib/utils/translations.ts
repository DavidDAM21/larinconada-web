// Utility to translate common Supabase error messages to Spanish
export function translateSupabaseError(errorMessage: string): string {
    const translations: Record<string, string> = {
        // Auth errors
        'Invalid login credentials': 'Credenciales de inicio de sesión inválidas',
        'Email not confirmed': 'Email no confirmado',
        'User already registered': 'El usuario ya está registrado',
        'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
        'Unable to validate email address: invalid format': 'Formato de email inválido',
        'Signup requires a valid password': 'El registro requiere una contraseña válida',
        'User not found': 'Usuario no encontrado',
        'Email rate limit exceeded': 'Límite de envío de emails excedido',
        'Invalid email or password': 'Email o contraseña inválidos',
        'Email link is invalid or has expired': 'El enlace de email es inválido o ha expirado',
        'Token has expired or is invalid': 'El token ha expirado o es inválido',
        'New password should be different from the old password': 'La nueva contraseña debe ser diferente de la anterior',

        // Database errors
        'Failed to create checkout session': 'Error al crear la sesión de pago',
        'Error creating checkout session': 'Error al crear la sesión de pago',
        'Error fetching blog posts': 'Error al cargar las noticias',
        'Error updating user profile': 'Error al actualizar el perfil de usuario',
        'Error processing webhook': 'Error al procesar el webhook',
        'Error creating profile': 'Error al crear el perfil',
        'Not authenticated': 'No autenticado',

        // Generic errors
        'Network request failed': 'Error de conexión',
        'An error occurred': 'Ha ocurrido un error',
        'Something went wrong': 'Algo salió mal',
    };

    // Check for exact matches first
    if (translations[errorMessage]) {
        return translations[errorMessage];
    }

    // Check for partial matches
    for (const [english, spanish] of Object.entries(translations)) {
        if (errorMessage.includes(english)) {
            return errorMessage.replace(english, spanish);
        }
    }

    // If no translation found, return original message
    return errorMessage;
}
