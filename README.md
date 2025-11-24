# La Rinconada - Web de Asociación con Zona de Socios

Aplicación Next.js 14+ con autenticación de Supabase y pagos con Stripe para gestionar una asociación de socios.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Pagos**: Stripe (Checkout + Webhooks)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (public)/              # Páginas públicas
│   │   ├── page.tsx           # Landing page
│   │   ├── blog/              # Blog
│   │   │   ├── page.tsx       # Lista de posts
│   │   │   └── [slug]/        # Detalle de post
│   │   ├── login/             # Autenticación
│   │   └── layout.tsx         # Layout público
│   ├── (private)/             # Páginas protegidas
│   │   └── dashboard/         # Dashboard de socios
│   ├── actions/               # Server Actions
│   │   └── stripe.ts          # Checkout de Stripe
│   ├── api/
│   │   └── webhooks/
│   │       └── stripe/        # Webhook de Stripe
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Estilos globales
├── components/
│   ├── ui/                    # Componentes UI reutilizables
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── Header.tsx             # Navegación
│   └── Footer.tsx             # Pie de página
├── lib/
│   ├── supabase/              # Clientes de Supabase
│   │   ├── server.ts          # Cliente servidor
│   │   └── client.ts          # Cliente navegador
│   ├── stripe/
│   │   └── config.ts          # Configuración Stripe
│   └── types/
│       └── database.types.ts  # Tipos TypeScript
└── middleware.ts              # Protección de rutas
```

## 🛠️ Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve al **SQL Editor** y ejecuta el contenido de `supa-schema.sql`
3. Copia las credenciales del proyecto

### 3. Configurar Stripe

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Obtén las API keys del dashboard (modo test)
3. Configura el webhook endpoint (ver sección de Webhooks)

### 4. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_tu-secret-key
STRIPE_WEBHOOK_SECRET=whsec_tu-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu-publishable-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔐 Configuración de Webhooks de Stripe

### Desarrollo Local

1. Instala el [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Inicia sesión: `stripe login`
3. Reenvía webhooks a tu local:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Copia el webhook secret que aparece y añádelo a `.env.local` como `STRIPE_WEBHOOK_SECRET`

### Producción

1. Ve al Dashboard de Stripe → Developers → Webhooks
2. Añade un endpoint: `https://tu-dominio.com/api/webhooks/stripe`
3. Selecciona el evento: `checkout.session.completed`
4. Copia el webhook secret y añádelo a las variables de entorno de producción

## 📊 Base de Datos

El schema de Supabase incluye:

- **profiles**: Perfiles de usuario con estado de membresía
- **blog_posts**: Posts del blog con datos de ejemplo
- **Trigger automático**: Crea un perfil cuando un usuario se registra
- **RLS Policies**: Seguridad a nivel de fila

## 🎯 Funcionalidades

### Públicas
- ✅ Landing page con beneficios de la asociación
- ✅ Blog con posts de ejemplo
- ✅ Sistema de autenticación (login/registro)

### Privadas (Dashboard)
- ✅ Verificación de membresía activa
- ✅ Contenido exclusivo para socios activos
- ✅ Flujo de actualización con Stripe Checkout
- ✅ Gestión de sesión (logout)

### Integración de Pagos
- ✅ Checkout de Stripe para suscripción anual (€49)
- ✅ Webhook para activar membresía automáticamente
- ✅ Actualización de estado en Supabase

## 🧪 Testing Manual

1. **Registro**: Crea una cuenta en `/login`
2. **Dashboard gratuito**: Accede a `/dashboard` - verás contenido limitado
3. **Upgrade**: Click en "Actualizar a Socio Activo"
4. **Pago de prueba**: Usa la tarjeta `4242 4242 4242 4242`
5. **Verificación**: Tras el pago, el dashboard mostrará contenido exclusivo

## 🔒 Seguridad

- Middleware protege rutas privadas
- RLS en Supabase para acceso a datos
- Verificación de firma en webhooks de Stripe
- Variables de entorno para secretos

## 📝 Notas Importantes

- El proyecto usa **Server Components** por defecto
- **Client Components** solo donde es necesario (formularios, interactividad)
- TypeScript estricto habilitado
- Manejo de errores con try/catch en todas las rutas de API

## 🚀 Despliegue

### Vercel (Recomendado)

1. Push a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Añade las variables de entorno
4. Despliega
5. Configura el webhook de Stripe con la URL de producción

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Soporte

Para problemas o preguntas, revisa:
- La documentación de cada servicio
- Los logs de la consola del navegador
- Los logs del servidor Next.js
- Los eventos en el dashboard de Stripe

---

**Desarrollado con Next.js 14+, Supabase y Stripe** 🚀
