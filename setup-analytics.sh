#!/bin/bash

# ========================================
# Google Analytics Setup Script
# MAS - Melgoza Advanced Solutions
# ========================================

echo "=========================================="
echo "📊 Google Analytics Setup"
echo "MAS - Melgoza Advanced Solutions"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
HTML_FILE="$SCRIPT_DIR/index.html"

# Check if index.html exists
if [ ! -f "$HTML_FILE" ]; then
    echo -e "${RED}❌ Error: index.html no encontrado${NC}"
    echo "Por favor, ejecuta este script desde la carpeta del proyecto."
    exit 1
fi

# Check if already configured
if grep -q "G-XXXXXXXXXX" "$HTML_FILE"; then
    echo -e "${YELLOW}⚠️  Google Analytics aún no está configurado${NC}"
    echo ""
else
    echo -e "${GREEN}✅ Google Analytics ya está configurado${NC}"
    echo ""
    echo "ID actual:"
    grep -o "G-[A-Z0-9]\{10\}" "$HTML_FILE" | head -1
    echo ""
    read -p "¿Deseas cambiar el ID? (s/n): " CHANGE
    if [ "$CHANGE" != "s" ] && [ "$CHANGE" != "S" ]; then
        echo "Configuración cancelada."
        exit 0
    fi
    echo ""
fi

# Ask for Measurement ID
echo -e "${BLUE}Por favor, ingresa tu Google Analytics Measurement ID${NC}"
echo "Formato: G-XXXXXXXXXX"
echo ""
read -p "Measurement ID: " GA_ID

# Validate format
if [[ ! "$GA_ID" =~ ^G-[A-Z0-9]{10}$ ]]; then
    echo ""
    echo -e "${RED}❌ Error: Formato inválido${NC}"
    echo "El ID debe tener el formato: G-XXXXXXXXXX"
    echo "Ejemplo: G-ABC1234567"
    exit 1
fi

echo ""
echo -e "${YELLOW}Configurando Google Analytics...${NC}"

# Backup original file
cp "$HTML_FILE" "$HTML_FILE.backup"
echo "✓ Backup creado: index.html.backup"

# Replace all occurrences
sed -i "s/G-XXXXXXXXXX/$GA_ID/g" "$HTML_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Google Analytics configurado exitosamente${NC}"
    echo ""
    echo "Cambios realizados:"
    echo "  - Measurement ID: $GA_ID"
    echo "  - Archivo modificado: index.html"
    echo "  - Backup guardado: index.html.backup"
    echo ""
    echo -e "${GREEN}=========================================="
    echo "✅ Configuración Completada"
    echo "==========================================${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. Sube los archivos a tu servidor"
    echo "2. Verifica en Google Analytics → Realtime"
    echo "3. Lee GOOGLE-ANALYTICS-SETUP.md para más detalles"
    echo ""
else
    echo -e "${RED}❌ Error al configurar Google Analytics${NC}"
    echo "Restaurando archivo original..."
    mv "$HTML_FILE.backup" "$HTML_FILE"
    exit 1
fi
