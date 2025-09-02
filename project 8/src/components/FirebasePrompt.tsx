import React from 'react';
import { Database, Settings, HardDrive, ExternalLink } from 'lucide-react';

interface FirebasePromptProps {
  usingLocalStorage?: boolean;
}

const FirebasePrompt: React.FC<FirebasePromptProps> = ({ usingLocalStorage = false }) => {
  if (usingLocalStorage) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
          <HardDrive className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Modo Local Activado</h2>
          <p className="text-amber-700 mb-6 max-w-md mx-auto">
            La aplicación está funcionando con almacenamiento local. Tus datos se guardan en este dispositivo.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6 border border-amber-200">
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <Settings className="h-5 w-5" />
              <span className="font-medium">Para sincronizar con la nube, configura Firebase más tarde</span>
            </div>
          </div>
          <p className="text-sm text-amber-600">
            Puedes usar la aplicación normalmente. Los datos se mantendrán en este navegador.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <Database className="h-16 w-16 text-blue-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Configuración de Firebase Necesaria</h2>
        <p className="text-blue-700 mb-6 max-w-md mx-auto">
          Para que la aplicación funcione con sincronización en la nube, necesitas configurar Firebase.
        </p>
        
        <div className="bg-white rounded-lg p-6 mb-6 border border-blue-200 text-left max-w-lg mx-auto">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Pasos para configurar:
          </h3>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Ve a <a href="https://console.firebase.google.com" target="_blank" className="text-blue-600 hover:underline inline-flex items-center">Firebase Console <ExternalLink className="h-3 w-3 ml-1" /></a></li>
            <li>Crea un nuevo proyecto</li>
            <li>Habilita Firestore Database</li>
            <li>Ve a Project Settings → General</li>
            <li>Copia la configuración de tu app web</li>
            <li>Agrega las variables de entorno en tu archivo .env</li>
          </ol>
        </div>

        <p className="text-sm text-blue-600 mb-4">
          Una vez configurado, podrás crear y gestionar las tareas de viaje de forma colaborativa en tiempo real.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            <strong>¡Buenas noticias!</strong> Mientras tanto, la aplicación funciona perfectamente con almacenamiento local.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirebasePrompt;