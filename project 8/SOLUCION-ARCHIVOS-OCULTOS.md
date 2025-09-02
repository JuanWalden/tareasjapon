# 🔍 Solución: Archivos Ocultos (.htaccess)

## 🚨 **Problema Identificado**
Los archivos que empiezan con punto (`.htaccess`, `.env`, etc.) están **ocultos** tanto en:
- ❌ Finder de Mac
- ❌ File Manager de Hostinger

## 💡 **Soluciones:**

### **Opción 1: Mostrar archivos ocultos en Mac**
```bash
# En Terminal:
defaults write com.apple.finder AppleShowAllFiles YES
killall Finder
```

### **Opción 2: Crear .htaccess directamente en Hostinger**
1. **Ve a File Manager** de Hostinger
2. **Navega a** `public_html/tareasjapon/`
3. **Clic en "Nuevo Archivo"**
4. **Nombre:** `.htaccess` (con el punto)
5. **Pega este contenido:**

```apache
# Redirigir todas las rutas a index.html (SPA)
RewriteEngine On
RewriteBase /tareasjapon/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /tareasjapon/index.html [L]

# Headers para PWA
<IfModule mod_headers.c>
    <FilesMatch "sw\.js$">
        Header set Content-Type "application/javascript"
        Header set Service-Worker-Allowed "/tareasjapon/"
    </FilesMatch>
    
    <FilesMatch "manifest\.json$">
        Header set Content-Type "application/manifest+json"
    </FilesMatch>
</IfModule>
```

### **Opción 3: Renombrar temporalmente**
1. **Renombra** `.htaccess` a `htaccess.txt`
2. **Súbelo** a Hostinger
3. **Renómbralo** de vuelta a `.htaccess` en Hostinger

## ✅ **Estado Actual (Perfecto)**
Veo que ya tienes:
- ✅ `index.html` ← Archivo principal
- ✅ `manifest.json` ← PWA manifest
- ✅ `sw.js` ← Service Worker
- ✅ `assets/` ← CSS y JS compilados

**Solo falta el `.htaccess`** para que funcione correctamente.

## 🎯 **Siguiente Paso**
1. **Crea el `.htaccess`** con la Opción 2 (más fácil)
2. **Prueba la URL:** `https://tareasjapon.taller.ortapsicologia.es/`
3. **Si sigue mostrando WordPress**, modificamos el `.htaccess` principal

¿Cuál opción prefieres para crear el `.htaccess`?