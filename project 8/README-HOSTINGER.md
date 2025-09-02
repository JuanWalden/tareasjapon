# Despliegue en Hostinger - Guía Completa

## 📋 Pasos para Desplegar en Hostinger

### 1. **Construir la Aplicación**
```bash
npm run build
```
Esto creará una carpeta `dist/` con todos los archivos optimizados.

### 2. **Subir Archivos a Hostinger**

#### Opción A: Panel de Control (File Manager)
1. Accede a tu panel de Hostinger
2. Ve a **File Manager**
3. Navega a `public_html/` (o la carpeta de tu dominio)
4. Sube TODO el contenido de la carpeta `dist/`
5. Asegúrate de que `index.html` esté en la raíz

#### Opción B: FTP/SFTP
1. Usa FileZilla o cualquier cliente FTP
2. Conecta con las credenciales de Hostinger
3. Sube el contenido de `dist/` a `public_html/`

### 3. **Configurar Firebase**
1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un proyecto nuevo
3. Habilita **Firestore Database**
4. Ve a Project Settings → General → Web apps
5. Copia la configuración

### 4. **Configurar Variables de Entorno en Hostinger**
Como Hostinger no maneja variables de entorno automáticamente, tienes 2 opciones:

#### Opción A: Archivo de configuración (Recomendado)
Crea un archivo `config.js` en `public/` con tu configuración:
```javascript
window.FIREBASE_CONFIG = {
  apiKey: "tu_api_key",
  authDomain: "tu_proyecto.firebaseapp.com",
  projectId: "tu_proyecto_id",
  storageBucket: "tu_proyecto.appspot.com",
  messagingSenderId: "tu_sender_id",
  appId: "tu_app_id"
};
```

#### Opción B: Hardcodear en el build
Reemplaza las variables en el código antes de hacer build.

### 5. **Configurar Reglas de Firestore**
En Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 6. **Configurar .htaccess (Importante para PWA)**
Crea un archivo `.htaccess` en la raíz:
```apache
# Redirigir todas las rutas a index.html (SPA)
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Headers para PWA
<IfModule mod_headers.c>
    # Service Worker
    <FilesMatch "sw\.js$">
        Header set Content-Type "application/javascript"
        Header set Service-Worker-Allowed "/"
    </FilesMatch>
    
    # Manifest
    <FilesMatch "manifest\.json$">
        Header set Content-Type "application/manifest+json"
    </FilesMatch>
    
    # Cache headers
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        Header set Cache-Control "public, max-age=31536000"
    </FilesMatch>
</IfModule>

# Comprimir archivos
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## 🎯 **Ventajas de Hostinger**

✅ **Hosting incluido** - Ya tienes el servicio  
✅ **Dominio personalizado** - Usa tu propio dominio  
✅ **SSL gratuito** - Certificado automático  
✅ **Fácil gestión** - Panel de control familiar  
✅ **Sin límites de proyectos** - A diferencia de Supabase  

## 📱 **Resultado Final**

Una vez desplegado tendrás:
- PWA instalable desde cualquier dispositivo
- Sincronización en tiempo real con Firebase
- Acceso desde tu dominio personalizado
- Funcionalidad offline completa

## 🔧 **Solución al Problema de Supabase**

Para resolver el límite de Supabase:
1. Ve a [dashboard.supabase.com](https://dashboard.supabase.com)
2. Busca proyectos que no uses
3. Haz clic en Settings → General → "Pause project" o "Delete project"
4. Una vez liberado el espacio, podrás crear el proyecto para esta app

¿Prefieres continuar con Firebase + Hostinger o esperar a liberar espacio en Supabase?