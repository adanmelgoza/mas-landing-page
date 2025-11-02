# 🚀 GUÍA DE DEPLOY - HOSTINGER FILE MANAGER

## 📋 Pasos para Publicar tu Sitio Web MAS

### ⏱️ Tiempo estimado: **5-10 minutos**

---

## 📦 PASO 1: Preparar los Archivos

### Archivos que vas a subir:

```
📁 Tu sitio incluye:
├── index.html              ✅ Página principal
├── favicon.png             ✅ Icono del sitio
├── .htaccess              ✅ Configuración de Apache
├── 📁 css/
│   └── style.css          ✅ Estilos
├── 📁 js/
│   └── main.js            ✅ JavaScript
└── 📁 images/
    ├── mas-logo.png       ✅ Logo MAS
    ├── miagarage-logo.png ✅ Logo MiaGarage
    ├── elamortiguador-logo.png ✅ Logo ElAmortiguador
    └── serviciomelgoza-logo.png ✅ Logo Servicio Melgoza
```

**⚠️ IMPORTANTE:** NO subas estos archivos a Hostinger:
- ❌ README.md
- ❌ DEPLOY.md (este archivo)
- ❌ .git/ (si existe)

---

## 🌐 PASO 2: Acceder a Hostinger

1. **Inicia sesión en Hostinger:**
   - Ve a: https://www.hostinger.com
   - Ingresa con tu usuario y contraseña

2. **Accede al Panel de Control:**
   - Click en **"Hosting"** en el menú
   - Selecciona tu dominio

3. **Abre el File Manager:**
   - En el panel lateral izquierdo busca **"Archivos"**
   - Click en **"Administrador de archivos"** o **"File Manager"**

---

## 📂 PASO 3: Preparar la Carpeta public_html

### Limpiar carpeta (si tiene contenido previo):

1. **Navega a `public_html`:**
   - Verás una lista de carpetas
   - Haz doble click en **`public_html`**

2. **Revisar contenido:**
   - Si hay archivos como `index.html` o `default.html` antiguos
   - **BORRA** todo lo que haya dentro (selecciona todo → botón eliminar)
   - O crea una carpeta `backup_old` y mueve todo ahí

3. **Carpeta limpia:**
   - `public_html` debe quedar **vacía** o solo con archivos del sistema (`.htaccess` antiguo)

---

## ⬆️ PASO 4: Subir los Archivos

### Método A: Arrastra y Suelta (MÁS FÁCIL) ⭐

1. **Abre dos ventanas:**
   - Ventana 1: File Manager de Hostinger (carpeta `public_html`)
   - Ventana 2: Tu carpeta local con los archivos del proyecto

2. **Selecciona TODOS los archivos:**
   ```
   ✅ index.html
   ✅ favicon.png
   ✅ .htaccess
   ✅ Carpeta css/
   ✅ Carpeta js/
   ✅ Carpeta images/
   ```

3. **Arrastra todo** desde tu carpeta local al File Manager
   - Los archivos empezarán a subir automáticamente
   - Verás una barra de progreso

4. **Espera a que termine** (1-2 minutos)

### Método B: Botón Upload

1. En File Manager, click en **"Upload"** o **"Subir archivos"**
2. Click en **"Select Files"** o **"Seleccionar archivos"**
3. **Selecciona TODOS** los archivos y carpetas
4. Click **"Open"** o **"Abrir"**
5. Espera a que suban

---

## ✅ PASO 5: Verificar Estructura

Después de subir, tu `public_html` debe verse así:

```
public_html/
├── index.html              ✅
├── favicon.png             ✅
├── .htaccess              ✅
├── css/
│   └── style.css          ✅
├── js/
│   └── main.js            ✅
└── images/
    ├── mas-logo.png       ✅
    ├── miagarage-logo.png ✅
    ├── elamortiguador-logo.png ✅
    └── serviciomelgoza-logo.png ✅
```

**⚠️ VERIFICA:**
- ✅ `index.html` está en la **raíz** de `public_html` (no dentro de otra carpeta)
- ✅ Las carpetas `css`, `js`, `images` están al **mismo nivel** que `index.html`
- ✅ El archivo `.htaccess` está visible (puede estar oculto, es normal)

---

## 🔧 PASO 6: Configurar SSL (HTTPS)

1. **En el panel de Hostinger:**
   - Ve a **"Seguridad"** en el menú lateral
   - Click en **"SSL"**

2. **Activar SSL gratis:**
   - Busca tu dominio
   - Click en **"Instalar SSL"** o **"Let's Encrypt"**
   - Espera 5-10 minutos a que se active

3. **Forzar HTTPS:**
   - El archivo `.htaccess` ya lo hace automáticamente
   - Tu sitio siempre cargará con `https://`

---

## 🎉 PASO 7: Probar tu Sitio

### Abre tu navegador:

1. **Visita tu dominio:**
   ```
   https://tudominio.com
   ```

2. **Verifica que carga:**
   - ✅ Debes ver tu landing page de MAS
   - ✅ El logo debe aparecer en la navegación
   - ✅ Los 4 productos deben estar visibles
   - ✅ El navbar debe ser transparente al hacer scroll

3. **Prueba en móvil:**
   - Abre desde tu celular
   - Verifica que se vea responsive

---

## 🔍 CHECKLIST Post-Deploy

### Verifica cada punto:

**Visual:**
- [ ] Logo MAS aparece en la navegación
- [ ] Los 4 logos de productos se ven correctamente
- [ ] Colores se ven bien (azul suave #4A90E2)
- [ ] Navbar transparente funciona al hacer scroll
- [ ] Barra de progreso azul arriba aparece al scrollear
- [ ] Floating cards se mueven suavemente
- [ ] Botones funcionan correctamente

**Funcional:**
- [ ] Links a MiaGarage Usuario funcionan
- [ ] Links a ElAmortiguador.com funcionan
- [ ] Links a Servicio Melgoza funcionan
- [ ] Formulario de contacto se ve bien
- [ ] Modal de notificación funciona
- [ ] Menú móvil (hamburguesa) funciona
- [ ] Scroll suave entre secciones funciona

**Técnico:**
- [ ] Sitio carga con HTTPS (candado verde)
- [ ] Favicon aparece en la pestaña del navegador
- [ ] No hay errores 404 en la consola (F12)
- [ ] Sitio carga rápido (menos de 2 segundos)

**SEO:**
- [ ] Título aparece correctamente en Google
- [ ] Meta descripción está configurada
- [ ] Imágenes tienen alt text

---

## 🐛 Solución de Problemas Comunes

### ❌ Problema: "Página no encontrada" o Error 404

**Solución:**
1. Verifica que `index.html` esté en `public_html` (no en una subcarpeta)
2. Verifica que el nombre sea exactamente `index.html` (minúsculas)
3. Espera 5 minutos y limpia caché del navegador (Ctrl + Shift + R)

### ❌ Problema: No se ven los logos

**Solución:**
1. Verifica que la carpeta `images/` esté al mismo nivel que `index.html`
2. Verifica permisos de archivos (deben ser 644)
3. Abre consola del navegador (F12) y busca errores

### ❌ Problema: CSS no se aplica

**Solución:**
1. Verifica que la carpeta `css/` esté correctamente subida
2. Limpia caché del navegador (Ctrl + Shift + R)
3. Verifica permisos de archivos (chmod 644)

### ❌ Problema: No fuerza HTTPS

**Solución:**
1. Verifica que el SSL esté instalado en Hostinger
2. Espera 10 minutos después de instalar SSL
3. Limpia DNS caché: `ipconfig /flushdns` (Windows)

### ❌ Problema: El sitio carga muy lento

**Solución:**
1. Verifica que el `.htaccess` esté subido correctamente
2. Activa compresión GZIP en Hostinger (suele estar activa)
3. Optimiza imágenes si son muy pesadas

---

## 📱 Paso Extra: Compartir en Redes

Una vez todo funcione:

```
✨ Tu sitio está en:
https://tudominio.com

🎉 ¡Compártelo!
- LinkedIn
- Facebook
- Twitter
- WhatsApp Business
```

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Revisa el checklist** de arriba
2. **Abre consola del navegador** (F12) y busca errores en rojo
3. **Verifica permisos** de archivos en File Manager
4. **Contacta soporte de Hostinger** (chat 24/7)

---

## 🎓 Notas Importantes

### Actualizaciones Futuras:

Para actualizar tu sitio:
1. Edita los archivos localmente
2. Sube solo los archivos modificados vía File Manager
3. Limpia caché del navegador para ver cambios

### Backup:

Antes de hacer cambios grandes:
1. Descarga una copia de `public_html` completo
2. Guárdalo en tu computadora
3. Así puedes restaurar si algo sale mal

### Performance:

Tu sitio es estático, debería cargar en **menos de 2 segundos**:
- ✅ Sin base de datos = Súper rápido
- ✅ Sin PHP = Sin procesamiento del servidor
- ✅ Con cache del navegador = Visitas repetidas instantáneas

---

## 🎉 ¡FELICIDADES!

Tu sitio web profesional de **MAS - Melgoza Advanced Solutions** está ahora en vivo.

**URL:** https://tudominio.com

---

**Versión:** 2.3.1 - Refined Edition  
**Última actualización:** 2025-11-02  
**Desarrollado por:** MAS - Melgoza Advanced Solutions
