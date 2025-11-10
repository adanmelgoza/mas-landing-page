# 🚀 Google Analytics - Inicio Rápido

## Configuración en 3 Pasos

### 📋 Paso 1: Obtén tu ID de Google Analytics

1. Ve a [analytics.google.com](https://analytics.google.com/)
2. Crea una cuenta/propiedad (si no tienes una)
3. Copia tu **Measurement ID** (formato: `G-XXXXXXXXXX`)

### ⚙️ Paso 2: Configura tu ID

**Opción A - Automática (recomendada):**
```bash
./setup-analytics.sh
# Sigue las instrucciones en pantalla
```

**Opción B - Manual:**
1. Abre `index.html`
2. Busca `G-XXXXXXXXXX` (3 veces)
3. Reemplaza con tu ID real
4. Guarda

### ✅ Paso 3: Verifica

1. Sube los archivos a tu servidor
2. Ve a Google Analytics → **Realtime**
3. Abre tu sitio web
4. ¡Deberías ver tu visita en tiempo real!

---

## 📊 ¿Qué se rastrea?

✅ **Visitas y pageviews**
✅ **Clicks en botones y productos**
✅ **Envíos de formulario**
✅ **Profundidad de scroll**
✅ **Tiempo en página**
✅ **Enlaces externos**
✅ **Redes sociales**
✅ **Y mucho más...**

---

## 📖 Documentación Completa

Lee [GOOGLE-ANALYTICS-SETUP.md](GOOGLE-ANALYTICS-SETUP.md) para:
- Instrucciones detalladas paso a paso
- Lista completa de eventos rastreados
- Configuraciones avanzadas
- Objetivos recomendados
- Troubleshooting

---

## 🆘 Ayuda Rápida

**¿No funciona?**
1. Verifica que tu ID tenga el formato `G-XXXXXXXXXX`
2. Revisa la consola del navegador (F12) por errores
3. Desactiva adblockers temporalmente
4. Espera 5-10 minutos para ver datos en Realtime

**¿Necesitas más ayuda?**
- [Documentación GA4](https://support.google.com/analytics/answer/9304153)
- Revisa GOOGLE-ANALYTICS-SETUP.md

---

**¡Listo! En menos de 5 minutos tendrás analytics funcionando.** 🎉
