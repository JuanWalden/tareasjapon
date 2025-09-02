# 🚀 Despliegue en Hostinger - Guía Paso a Paso

## 📦 **Paso 1: Preparar los Archivos**

✅ **Ya está hecho**: La aplicación se ha construido en la carpeta `dist/`

Los archivos que necesitas subir están en la carpeta `dist/` que se acaba de crear.

## 🌐 **Paso 2: Subir a Hostinger (MUY FÁCIL)**

### Opción A: File Manager (Recomendado)
1. **Accede a tu panel de Hostinger**
2. **Ve a "File Manager"** (Administrador de archivos)
3. **Navega a `public_html/`** (o la carpeta de tu dominio)
4. **Selecciona TODO el contenido de la carpeta `dist/`**
5. **Arrastra y suelta** o usa "Upload" para subir todos los archivos
6. **¡Listo!** Tu web ya está online

### Opción B: FTP (Si prefieres)
1. Usa FileZilla o cualquier cliente FTP
2. Conecta con las credenciales de Hostinger
3. Sube el contenido de `dist/` a `public_html/`

## 🔥 **Paso 3: Configurar Firebase (Backend)**

### 3.1 Crear Proyecto Firebase
1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Clic en "Crear proyecto"
3. Nombre: "tareas-viaje-grupo" (o el que prefieras)
4. Desactiva Google Analytics (no lo necesitas)
5. Clic en "Crear proyecto"

### 3.2 Configurar Firestore
1. En el menú lateral: **"Firestore Database"**
2. Clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de producción"**
4. Elige la región más cercana (europe-west1 para España)

### 3.3 Configurar Reglas de Firestore
1. Ve a **"Firestore Database" → "Reglas"**
2. Reemplaza el contenido con:
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
3. Clic en **"Publicar"**

### 3.4 Obtener Configuración
1. Ve a **"Configuración del proyecto"** (⚙️)
2. Baja hasta **"Tus apps"**
3. Clic en **"Agregar app" → Web (</>) **
4. Nombre: "Tareas Viaje"
5. **¡IMPORTANTE!** Marca **"También configurar Firebase Hosting"**
6. Copia la configuración que aparece

## 🔧 **Paso 4: Configurar Variables en Hostinger**

Crea un archivo llamado `firebase-config.js` en tu `public_html/` con:

```javascript
window.FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

**Reemplaza los valores** con los que copiaste de Firebase.

## 📱 **Paso 5: Probar la Aplicación**

1. **Visita tu dominio** (ej: tudominio.com)
2. **Verifica que carga** la aplicación
3. **Crea una tarea** para probar Firebase
4. **Instala la PWA** desde el navegador móvil

## 🎯 **¿Por qué Hostinger es Perfecto para Esto?**

✅ **Sin complicaciones** - Solo subir archivos, no configurar servidores  
✅ **Tu dominio** - Usa el dominio que ya tienes  
✅ **SSL automático** - Certificado incluido  
✅ **Cero configuración** - No necesitas conocimientos de servidor  
✅ **Firebase gratis** - Base de datos en tiempo real sin costo  

## 🆘 **Si Algo No Funciona**

1. **Verifica que `index.html` esté en la raíz** de `public_html/`
2. **Comprueba que el archivo `.htaccess` se subió** correctamente
3. **Revisa la configuración de Firebase** en `firebase-config.js`
4. **Mira la consola del navegador** (F12) para errores

---

**¿Necesitas ayuda con algún paso específico?** El proceso es muy directo, pero puedo ayudarte si encuentras algún problema.