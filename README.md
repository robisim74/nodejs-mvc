# Express MVC
![Node.js CI](https://github.com/robisim74/express-mvc/workflows/Node.js%20CI/badge.svg)
> Build an Express MVC web app with Webpack, Babel, TypeScript or ES6, critical CSS. SEO & performance friendly

## Features

* _Express_ & MVC pattern
* _Handlebars_ view engine
* _Babel_ & _webpack_ with dev server
* _TypeScript_ & ES6
* CSS, _SASS_ & _Autoprefixer_
* Critical CSS
* _Tailwind_
* Sitemap


## Contents
* [Getting started](#1)
* [Project structure](#2)
* [What's new](#3)


## <a name="1"></a>Getting started
Download the code & configure the project in `config.js` file.

### Installation
_Node.js_ 12 or higher is required.

```Shell
npm install
```

### Start DevServer
```Shell
npm run dev
```

### Build
```Shell
npm run build
```


## <a name="2"></a>Project structure
- App
    - **src/** source code folder
        - **src/app.ts** Express entry point
        - **src/app.controller.ts** controllers file
        - **src/views/** views folder
        - **src/index.ts** client ts file for `views/index.html`
        - **src/index.scss** client css file for `views/index.html`
    - **config.js** app configuration
    
- Scripts & configuration files
    - **build.js** building process
        - runs _webpack_ to generate client bundles
        - runs _critical_ to inline critical CSS
        - runs _sitemap_ to generate `sitemap.xml`
    - **scripts/** scripts used by the building process
    - **babel.config.js** _Babel_ configuration
    - **webpack.config.dev.js** _webpack_ configuration for development
    - **webpack.config.prod.js** _webpack_ configuration for building client bundles
    - **.browserslistrc** target browsers for _Autoprefixer_
    - **postcss.config.js** _PostCSS_ configuration file to use _Autoprefixer_ & _Tailwind_
    - **tailwind.config.js** _Tailwind_ configuration
    - **tsconfig** _TypeScript_ configuration file to compile Express
    - **package.json** _npm_ options & scripts


## <a name="3"></a>What's new
You can find template changes [here](https://github.com/robisim74/express-mvc/releases).


## License
MIT
