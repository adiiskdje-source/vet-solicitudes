# VetSolicitudes – App móvil para clínica veterinaria

Aplicación móvil en **React Native (Expo SDK 57)** para registrar y gestionar solicitudes de atención de una clínica veterinaria (consultas, vacunación, emergencias y grooming). Los datos se manejan **en memoria** (sin base de datos) con `useState`, `useEffect` y `useReducer + Context`.

Curso: Desarrollo de Aplicaciones Móviles 1 – IDAT (Evaluación parcial)

Participante : Piero Blas Anay
## Requisitos
- Node.js 18 o superior (`node -v`)
- npm (incluido con Node)
- Git
- Para emulador Android: Android Studio + JDK 17 y un dispositivo virtual (AVD)
- Para iOS (solo macOS): Xcode y un simulador
- Alternativa en celular: app **Expo Go compatible con SDK 57**

## Instalación
```bash
git clone <URL_DEL_REPOSITORIO>
cd vet-app
npm install
```

## Ejecución
```bash
npx expo start            # abre Metro; escanea el QR con Expo Go
npx expo start --android  # abre en emulador Android (equivale a run-android)
npx expo start --ios      # abre en simulador iOS (equivale a run-ios, solo macOS)
```
Con entorno nativo configurado también se puede usar `npx expo run:android` / `npx expo run:ios`.

En Windows, si `npx expo` no se reconoce: `node node_modules\expo\bin\cli start`.

### APK de prueba
Compilado con EAS Build (`npx eas-cli build -p android --profile preview`):
https://expo.dev/artifacts/eas/3fCqkPiUouw5EIB8JL0PrlatdZohgG4XpT9TANEa8BY.apk

## Cómo probar el flujo CRUD
1. **Ingresar** desde la pantalla de bienvenida.
2. **Listar / buscar / filtrar:** usa el buscador y los chips de estado (Todos, Pendiente, En atención, Finalizado). Jala hacia abajo para simular refresh.
3. **Crear:** botón `+` → completa el formulario (envíalo vacío para ver las validaciones bajo cada campo) → *Registrar solicitud*. Aparece un toast/alert de confirmación.
4. **Ver detalle y editar:** toca una tarjeta → cambia estado, prioridad o descripción → *Guardar cambios*.
5. **Eliminar:** en el detalle, *Eliminar solicitud* → confirma en la alerta.

## Estructura del proyecto
```
App.js                 Navegación (Stack) y Provider global
src/screens/           WelcomeScreen, ListScreen, CreateScreen, DetailScreen
src/components/        SolicitudCard, SolicitudForm, FormInput, Chip, PrimaryButton
src/store/             SolicitudesContext (Context + useReducer)
src/services/          solicitudesService (carga simulada de datos)
src/models/            solicitud.js (estructura de Solicitud)
src/utils/             constants, validations, feedback (toast/alert)
```

## Modelo de datos
`Solicitud`: id, clienteNombre, telefono, mascotaNombre, tipoServicio (CONSULTA | VACUNACION | EMERGENCIA | GROOMING), prioridad (BAJA | MEDIA | ALTA), descripcion, estado (PENDIENTE | EN_ATENCION | FINALIZADO), fechaRegistro.
