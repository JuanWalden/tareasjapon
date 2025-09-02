# 🚀 Despliegue en Hostinger - Paso a Paso

## 🔍 **Problema Detectado: WordPress interfiriendo**

El mensaje de bienvenida de WordPress indica que hay un `.htaccess` de WordPress que está capturando todas las rutas.

## 📋 **Solución Paso a Paso:**

### **Paso 1: Verificar la estructura de carpetas**
En tu File Manager de Hostinger deberías ver:
```
public_html/
├── tareasjapon/          ← Tu subcarpeta (debe existir)
├── .htaccess            ← WordPress principal (puede interferir)
├── wp-content/          ← WordPress principal
├── wp-config.php        ← WordPress principal
└── index.php            ← WordPress principal
```

### **Paso 2: Subir archivos correctamente**
1. **Ve a File Manager** en tu panel de Hostinger
2. **Navega a `public_html/tareasjapon/`**
3. **Elimina todo** lo que haya en esa carpeta
4. **Sube TODO el contenido** de tu carpeta `dist/` (no la carpeta, el contenido)

Debe quedar así:
```
public_html/tareasjapon/
├── index.html           ← Archivo principal
├── .htaccess           ← Tu .htaccess de la PWA
├── manifest.json       ← PWA manifest
├── sw.js              ← Service Worker
└── assets/            ← CSS y JS compilados
    ├── index-xxx.css
    └── index-xxx.js
```

### **Paso 3: Verificar que index.html esté en la raíz**
- El archivo `index.html` debe estar directamente en `public_html/tareasjapon/`
- NO debe estar en una subcarpeta

### **Paso 4: Crear/verificar .htaccess específico**
Asegúrate de que existe el archivo `.htaccess` en `public_html/tareasjapon/` con este contenido:

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

### **Paso 5: Probar acceso directo**
Visita: `https://tareasjapon.taller.ortapsicologia.es/`

Si sigue mostrando WordPress, prueba:
`https://tareasjapon.taller.ortapsicologia.es/index.html`

### **Paso 6: Solución si persiste el problema**

Si WordPress sigue interfiriendo, hay dos opciones:

#### **Opción A: Modificar .htaccess principal**
En `public_html/.htaccess` (el de WordPress), añade ANTES de las reglas de WordPress:
```apache
# Excluir subdominio tareasjapon de WordPress
RewriteCond %{HTTP_HOST} ^tareasjapon\.taller\.ortapsicologia\.es$ [NC]
RewriteRule ^(.*)$ /tareasjapon/$1 [L]
```

#### **Opción B: Usar carpeta diferente**
En lugar de `tareasjapon`, usa `tareas-japon` o `viaje-japon` para evitar conflictos.

## 🔧 **Configurar Firebase después**

Una vez que veas tu aplicación funcionando:

1. **Crea proyecto Firebase**
2. **Habilita Firestore**
3. **Crea archivo de configuración** en `public_html/tareasjapon/firebase-config.js`
4. **Modifica el código** para usar la configuración

## ❓ **¿Qué hacer si no funciona?**

1. **Verifica permisos** de archivos (755 para carpetas, 644 para archivos)
2. **Revisa logs de error** en el panel de Hostinger
3. **Prueba en modo incógnito** para evitar caché
4. **Contacta soporte de Hostinger** si persiste

## 📞 **Siguiente paso**

Una vez que veas tu aplicación cargando (aunque sin datos por falta de Firebase), confirma y procedemos con la configuración de Firebase.

¿En qué paso estás ahora?