# 📊 Configuración de Google Analytics para MAS Landing Page

## 🎯 Guía Completa de Instalación

### Paso 1: Obtener tu ID de Medición de Google Analytics

#### Si ya tienes una cuenta de Google Analytics:
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Selecciona tu propiedad o crea una nueva
4. Ve a **Admin** (engranaje en la parte inferior izquierda)
5. En la columna **Property**, haz clic en **Data Streams**
6. Selecciona tu stream web o crea uno nuevo
7. Copia tu **Measurement ID** (formato: `G-XXXXXXXXXX`)

#### Si NO tienes una cuenta de Google Analytics:
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Haz clic en "Start measuring"
3. Crea una cuenta:
   - **Account Name**: MAS - Melgoza Advanced Solutions
   - Acepta los términos
4. Crea una propiedad:
   - **Property Name**: MAS Landing Page
   - **Reporting Time Zone**: Tu zona horaria
   - **Currency**: Tu moneda
5. Agrega detalles de tu negocio:
   - **Industry**: Technology / Software
   - **Business Size**: Small
6. Selecciona **Web** como plataforma
7. Configura tu stream:
   - **Website URL**: tu-dominio.com
   - **Stream Name**: Landing Page Principal
8. Copia tu **Measurement ID** (formato: `G-XXXXXXXXXX`)

---

### Paso 2: Configurar el ID en tu Landing Page

#### Opción A: Editar directamente el archivo HTML
1. Abre el archivo `index.html`
2. Busca las líneas que contienen `G-XXXXXXXXXX` (hay 3 ocurrencias)
3. Reemplaza `G-XXXXXXXXXX` con tu ID real
4. Guarda el archivo

**Ubicación en el código:**
```html
<!-- En el <head> del HTML -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TU-ID-AQUI"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', 'G-TU-ID-AQUI', {
        'page_title': 'MAS - Melgoza Advanced Solutions',
        'page_location': window.location.href,
        'send_page_view': true
    });
    
    gtag('config', 'G-TU-ID-AQUI', {
        'allow_enhanced_conversions': true,
        'allow_google_signals': true,
        'allow_ad_personalization_signals': true
    });
</script>
```

#### Opción B: Usar búsqueda y reemplazo
```bash
# En la terminal, desde la carpeta del proyecto:
sed -i 's/G-XXXXXXXXXX/G-TU-ID-REAL/g' index.html
```

---

### Paso 3: Verificar la Instalación

#### Método 1: Google Analytics DebugView
1. Instala la extensión [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) en Chrome
2. Abre tu landing page
3. Activa la extensión
4. Ve a Google Analytics → **Admin** → **DebugView**
5. Deberías ver eventos en tiempo real

#### Método 2: Consola del Navegador
1. Abre tu landing page
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Console**
4. Busca el mensaje: "📊 Google Analytics Tracking Activo"
5. Verifica que no haya errores

#### Método 3: Google Tag Assistant
1. Instala [Google Tag Assistant](https://tagassistant.google.com/)
2. Conecta tu sitio web
3. Verifica que el tag de GA4 esté funcionando

#### Método 4: Realtime Reports
1. Ve a Google Analytics
2. En el menú lateral, haz clic en **Reports** → **Realtime**
3. Abre tu landing page en otra pestaña
4. Deberías ver tu visita en tiempo real

---

## 📊 Eventos Rastreados Automáticamente

Tu landing page ahora rastrea automáticamente los siguientes eventos:

### 🔍 Eventos de Navegación
- ✅ Clicks en enlaces de navegación
- ✅ Navegación interna (secciones)
- ✅ Profundidad de scroll (25%, 50%, 75%, 90%, 100%)
- ✅ Tiempo en página

### 🛍️ Eventos de Productos
- ✅ Clicks en tarjetas de productos
- ✅ Clicks en botones de productos
- ✅ Solicitudes de notificación
- ✅ Enlaces a productos externos

### 📝 Eventos de Formulario
- ✅ Interacciones con campos de formulario
- ✅ Envío de formulario de contacto
- ✅ Errores de validación
- ✅ Conversión de leads

### 🎨 Eventos de UI
- ✅ Apertura/cierre de modales
- ✅ Clicks en CTAs (Call to Action)
- ✅ Clicks en hero section
- ✅ Interacciones con menú móvil

### 🔗 Eventos de Enlaces
- ✅ Clicks en enlaces externos
- ✅ Clicks en redes sociales
- ✅ Descargas de archivos

### ⚡ Eventos de Performance
- ✅ Tiempo de carga de página
- ✅ Tiempo de DOM ready
- ✅ Visibilidad de secciones

### 🎮 Eventos Especiales
- ✅ Easter eggs (Konami code)
- ✅ Errores de JavaScript (si ocurren)

---

## 📈 Métricas Clave a Monitorear

### En Google Analytics, enfócate en:

#### 1. **Realtime → Overview**
- Usuarios activos ahora
- Páginas vistas por segundo
- Eventos en tiempo real

#### 2. **Reports → Engagement → Events**
- `page_view` - Visitas a la página
- `form_submission` - Envíos de formulario
- `generate_lead` - Conversiones de leads
- `product_click` - Interés en productos
- `cta_click` - Efectividad de CTAs
- `scroll_depth` - Engagement del contenido

#### 3. **Reports → Engagement → Pages and Screens**
- Tiempo en página
- Bounce rate (tasa de rebote)
- Páginas por sesión

#### 4. **Reports → User → Demographics**
- Ubicación geográfica
- Idioma
- Dispositivos (mobile/desktop/tablet)

#### 5. **Reports → Acquisition → Traffic Acquisition**
- De dónde vienen tus visitantes
- Canales de adquisición
- Fuentes de tráfico

---

## 🎯 Objetivos Recomendados (Goals)

### Configurar objetivos en Google Analytics:

1. **Conversión: Envío de Formulario**
   - Evento: `form_submission`
   - Tipo: Evento
   - Categoría: Form
   - Acción: form_submission

2. **Conversión: Generación de Lead**
   - Evento: `generate_lead`
   - Tipo: Evento
   - Categoría: Conversion
   - Acción: generate_lead

3. **Engagement: Scroll 75%**
   - Evento: `scroll_depth`
   - Tipo: Evento
   - Parámetro: scroll_depth >= 75

4. **Engagement: Tiempo > 2 minutos**
   - Evento: `time_on_page`
   - Tipo: Evento
   - Parámetro: time_seconds >= 120

5. **Acción: Click en Producto**
   - Evento: `product_click`
   - Tipo: Evento
   - Categoría: Products

---

## 🔧 Configuraciones Avanzadas (Opcional)

### 1. Enhanced Measurement (Medición Mejorada)
Ya está habilitada automáticamente:
- ✅ Page views
- ✅ Scrolls
- ✅ Outbound clicks
- ✅ Site search
- ✅ Video engagement
- ✅ File downloads

### 2. User-ID Tracking
Si quieres rastrear usuarios a través de sesiones:
```javascript
// En js/analytics.js, agrega:
gtag('config', 'G-TU-ID', {
    'user_id': 'USER_ID_AQUI'
});
```

### 3. E-commerce Tracking
Si en el futuro vendes productos:
```javascript
gtag('event', 'purchase', {
    transaction_id: "T_12345",
    value: 99.99,
    currency: "MXN",
    items: [{
        item_id: "SKU_12345",
        item_name: "MiaGarage Premium"
    }]
});
```

### 4. Custom Dimensions
Ya están configuradas:
- `visitor_type`: website_visitor
- `page_type`: landing_page
- `company`: MAS Solutions

---

## 🛡️ Privacidad y GDPR

### Implementar banner de cookies (recomendado):

Considera agregar un banner de consentimiento de cookies para cumplir con GDPR:
- [Cookiebot](https://www.cookiebot.com/)
- [OneTrust](https://www.onetrust.com/)
- [Cookie Consent](https://www.osano.com/cookieconsent)

### Política de Privacidad
Asegúrate de tener una política de privacidad que mencione:
- Uso de Google Analytics
- Tipos de datos recopilados
- Derecho de los usuarios a opt-out

---

## 🧪 Testing Checklist

Antes de ir a producción, verifica:

- [ ] ID de medición correcto en `index.html`
- [ ] No hay errores en la consola del navegador
- [ ] Eventos aparecen en DebugView de GA
- [ ] Realtime reports muestra tu visita
- [ ] Todos los botones envían eventos
- [ ] Formulario envía evento de conversión
- [ ] Enlaces externos se rastrean
- [ ] Scroll depth funciona correctamente

---

## 📞 Soporte

Si tienes problemas:

1. **Verificar ID de Medición**: Asegúrate de que `G-XXXXXXXXXX` fue reemplazado
2. **Revisar Consola**: Busca errores en DevTools (F12)
3. **Probar en modo incógnito**: Descartar problemas de caché
4. **Verificar adblockers**: Algunos bloquean Google Analytics
5. **Esperar 24-48 horas**: Los reportes completos tardan en aparecer

### Recursos útiles:
- [Documentación oficial de GA4](https://support.google.com/analytics/answer/9304153)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [GA4 Setup Assistant](https://support.google.com/analytics/answer/9744165)

---

## 🎉 ¡Listo!

Una vez configurado tu ID de medición, Google Analytics comenzará a rastrear automáticamente todas las interacciones en tu landing page.

**Recuerda**: Los datos pueden tardar 24-48 horas en aparecer completamente en los reportes históricos, pero los eventos en tiempo real aparecen inmediatamente.

---

**Desarrollado con ❤️ para MAS - Melgoza Advanced Solutions**
