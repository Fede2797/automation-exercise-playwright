# Automation testing exercise

This is a personal project to improve my understanding of Playwright tools. I'll cover how it works and everything I learned during this project.

- [Introduction](#introduction-heading)
- [Demonstration](#second-heading)
- [Requirements](#third-heading)
- [Instructions](#forth-heading)
- [Configuration](#fifth-heading)
- [Test execution](#sixth-heading)
- [What I learned](#seventh-heading)
- [Contribution](#eighth-heading)
- [License](#nineth-heading)
 
<a id="introduction-heading"></a>
# Introduction

Based on the excercise of the following website https://automationexercise.com/ I built a test suite to assure its quality and learn about Playwright. 

You can find every pre-built test case provided by the web in https://automationexercise.com/test_cases.

Inside the repository, you can find all the tests inside the "/tests" folder. They are divided according each tested sections of the website.

<a id="second-heading"></a>
# Demonstration

Incluye capturas de pantalla o gifs animados que muestren ejemplos de tus pruebas en acción. Puedes utilizar imágenes o videos para hacerlo más dinámico e interesante. También podrías proporcionar enlaces a un sitio web o plataforma de alojamiento de videos donde los usuarios puedan ver tus pruebas en funcionamiento.

<a id="third-heading"></a>
# Requirements

To execute the tests you need to have [Node.js](https://nodejs.org/es) installed on your machine.

Once you have Node.js installed, clone or download this repository and you're ready to go.

```
git clone https://github.com/Fede2797/automation-exercise-playwright.git 
```

Enumera los requisitos que los usuarios deben cumplir para ejecutar las pruebas en su entorno local. Esto podría incluir la instalación de Playwright y otras dependencias necesarias.

<a id="forth-heading"></a>
# Instructions

Before running any tests, it is necessary to install the project's dependencies. 

To do so open your terminal, head down to the project's directory and run:

```
npm install
```

Then, you can run all tests with simple commands:

This instruction runs every test of the project in headless mode
```
npx playwright test tests/
```

This instruction runs every test of the project headed
```
npx playwright test tests/ --headed
```

Or you can choose to run a single file like this:
```
npx playwright test tests/cart.spec.ts
```

<a id="fifth-heading"></a>
# Configuration

Si hay alguna configuración específica que deba realizarse antes de ejecutar las pruebas, asegúrate de explicarla en esta sección.

<a id="sixth-heading"></a>
# Test execution

Describe cómo ejecutar tus pruebas de manera efectiva. Incluye ejemplos de comandos que los usuarios pueden usar.

<a id="seventh-heading"></a>
# What I learned

Esta es una sección importante para destacar lo que aprendiste durante el proyecto. Puedes escribir en detalle sobre los desafíos que enfrentaste, las soluciones que implementaste y cómo mejoraste tus habilidades al usar Playwright. También puedes compartir consejos o trucos que descubriste en el proceso.

<a id="eighth-heading"></a>
# Contribution

Si deseas permitir que otros contribuyan a tu proyecto, proporciona instrucciones sobre cómo pueden hacerlo, incluyendo cómo informar problemas o enviar solicitudes de extracción.

<a id="nineth-heading"></a>
# License

Agrega información sobre la licencia bajo la cual compartes tu proyecto. Esto puede ser importante para que otros usuarios sepan cómo pueden utilizar y distribuir tu código.