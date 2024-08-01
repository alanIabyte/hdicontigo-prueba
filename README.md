# hdi

Pre requisitos:

- Instalar node versión 10 o superior.

## Comandos

Para instalar paquetes:

    npm install --legacy-peer-deps

En caso de fallas debido a python o python2:
    npm i windows-build-tools

(Si estas en MacOS exporta las variables una vez instalado python y python2)

Si tienes un error con "scroller.git", configura tu git para descargar repositorios mediante SSH (asegurate de tener configuradas tus llaves propias):
    git config --global url."https://github.com/".insteadOf git@github.com:
    git config --global url."https://".insteadOf git://

Para correr el servidor de desarrollo:

    npm start


Para actualizar snapshot de pruebas + publicar
    npm run publish

Para actualizar snapshot de pruebas + publicar + hacer stash
    npm run publish:stash

De existir algún error con el linter al momento de correrla localmente se puede ejecutar: `npm run lint --fix`. Este comando arreglará automáticamente cualquier error relacionado con el linter que impida que la aplicación se pueda correr.

La app hace uso del protocolo HTTPS para correr correctamente el lector de OCR que está integrado. Para esto se puede correr la app en modo HTPPS de manera local para ambientes de desarrollo.

Para correr la app en modo HTTPS se asigna el valor de variable HTTPS=true (en estos momentos npm start ya integra de manera default esta variable):

    HTTPS=true npm start

Generar build de archivos estáticos para ambiente de producción:

    npm build

Correr las pruebas:

    npm test

Correr linter:

    npm run lint

Correr storybook para ver componentes individuales y probarlos:

    npm run storybook

Para actualizar los snapshots de las pruebas:

    npm run testUpdate

# Variables de ambiente

Las variables de ambiente deben ser configuradas en un archivo `.env`. Existe un archivo `.env.sample` como ejemplo, para usarlo debe ser renombrado a `.env`.

Las siguientes son las variables de ambiente actuales:

- `REACT_APP_BUILD`: Si se le da el valor `graphql` habilita un ambiente en donde se puede probar la implementación de apollo con graphql. Si no se le da valor el proyecto correo de manera normal.
- `REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT`, `REACT_APP_AWS_APPSYNC_REGION`, `REACT_APP_AWS_APPSYNC_AUTH_TYPE`, `REACT_APP_AWS_APPSYNC_API_KEY`: (ESTAS SON REQUERIDAS PARA CORRER EL PROYECTO) se utilizan para configurar las credenciales de conexión con el middleware para peticiones de la aplicación.
- `REACT_APP_GOOGLE_MAPS_API_KEY`: Esta llave debe tener acceso a las siguientes APIs de Google: Geocoding API, Maps JavaScript API, Places API, Directions API.
- `REACT_APP_ENCUESTA_EVALUACION_AJUSTADOR`: Usado para identificar el identificador de la encuesta para la evaluación del ajustador. Actualmente es usada la 1.
- `REACT_APP_ENCUESTA_EVALUACION_TALLER`: Usado para identificar el identificador de la encuesta para la evaluación del taller. Actualmente es usada la 2.
.