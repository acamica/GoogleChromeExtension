# Learn Tab

**A Google Chrome Extension to keep learning HTML and CSS**

The extension shows a different HTML tag or CSS property every time you open a new tab. The tag or property comes with a description and an example to help you discover it.

## Goals of the extension:
- To generate implicit learning (i.e. unconscious learning without any effort, through simple repetitions).
- To arouse curiosity
- To consolidate knowledge
- To enhance life-long learning
- To encourage learn on a continuous basis

## Getting Started

Get started by downloading the extension.

### Prerequisites

The extension was made for ```Google Chrome``` so please install it before you try to use it!

### Installing

Open Google Chrome, go to chrome://extensions (or find it in your menu in ```More tools``` > ```Extensions```), then activate the developer mode on the top right of the page and click on ```Load unpacked extension...``` and select the extension's folder. 

## Usage
Just open a new tab and enjoy.

## How to help
You can extend the extension database by including properties or tags in the db.js file.

The structure followed is:

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

where
- *reference* is a link to a reference where more information about the element can be found.
- *description* is the element description/definition.
- *example* is the example container.
    - *show* defines if the example output can be shown.
    - *title* is the example code in CSS, for example top: auto;
    - *description* is the explanation of the CSS example.
    - *code* is the example code.
- *language* details the element language.
- *name* is the element's name.

## Authors
[Sabrina Izcovich](https://github.com/sizcovich)

See also the list of contributors who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
