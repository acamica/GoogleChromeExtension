# Learn Tab

**Una extensión de Google Chrome para seguir aprendiendo HTML y CSS**

La extensión muestra una etiqueta HTML o una propiedad CSS cada vez que se abre una nueva pestaña. La etiqueta o propiedad viene con una descripción y un ejemplo que ayuda a descubrirla.

## Objetivos de la extensión:
- Generar aprendizaje implícito (por ejemplo, aprendizaje inconsciente sin esfuerzo a través de repeticiones simples).
- Despertar curiosidad.
- Consolidar conocimiento.
- Mejorar el aprendizaje a largo plazo.
- Promover el aprendizaje continuo.


## Comenzando

Comenzá descargando la extensión.

### Prerequisitos

La extensión fue creada para funcionar en ```Google Chrome``` por lo que es necesaria su instalación previa.

### Instalación

Abra Google Chrome, vaya a chrome://extensions (o encuéntrela su menú ```Más herramientas``` > ```Extensiones```), luego active el *Modo de programador* en la parte superior derecha de la página y seleccione ```Cargar extensión sin empaquetar...``` y seleccione la carpeta de la extensión.

## Uso
Lo único que tiene que hacer es abrir una nueva pestaña y disfrutar.

## Cómo ayudar
Se puede extender la base de datos de la extensión incluyendo propiedades o etiquetas en el archivo db.js.

La estructura seguida es:
{
    "reference": "https://developer.mozilla.org/es/docs/Web/HTML/Elemento/html",
    "description": "El elemento HTML <html> representa la raíz de un documento HTML. El resto de elementos descienden de él.",
    "example": {
        "show": false,
        "title": "",
        "description": "",
        "code": "<!DOCTYPE html>\n<html>\n<head>Estoy dentro del head del HTML</head>\n<body>Estoy dentro del body del HTML</body>\n</html>\n"
        },
    "language": "html",
    "name": "<code>&lt;html&gt;</code>"
}

donde
- *reference* es un link a una referencia donde se puede encontrar más información sobre el elemento en cuestión.
- *description* es la descripción o definición del elemento.
- *example* es el contenedor del ejemplo.
    - *show* define si la salida del ejemplo puede ser mostrada o no.
    - *title* es el código de ejemplo en CSS,por ejemplo top: auto;
    - *description* es la explicación del ejemplo CSS.
    - *code* es el código de ejemplo.
- *language* detalla el lenguaje del elemento.
- *name* es el nombre del elemento.

## Autores
[Sabrina Izcovich](https://github.com/sizcovich)
[Tomás Escobar](https://github.com/tomasescobar)

## Licencia
La extensión se encuentra protegida por la licencia del MIT - ver la [LICENCIA](LICENSE) para más detalles.
