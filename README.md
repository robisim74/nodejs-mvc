# Node.js MVC
![Node.js CI](https://github.com/robisim74/nodejs-mvc/workflows/Node.js%20CI/badge.svg)
> Build a Node.js MVC web app with Webpack, Babel, TypeScript or ES, critical CSS. SEO & performance friendly

## Features

* _Express_ & MVC pattern
* _Handlebars_ view engine & partial views
* _Helmet_ for security
* _Babel_ & _webpack_ to build the client
* _Rollup_ to build the Express app
* _TypeScript_ & ES
* _Tailwind_
* CSS, _SASS_ with _Autoprefixer_
* Critical CSS
* HMR & Live reload
* ES modules
* Sitemap


## Contents
* [Getting started](#1)
* [Project structure](#2)
* [What's new](#3)


## <a name="1"></a>Getting started
Download the code & configure the project in `config.js` file.

### Installation
_Node.js_ 16 or higher is required.

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
        - **src/routes/** routes folder
            - **index.ts** client ts file for `views/index.html`
            - **index.scss** client css file for `views/index.html`
    - **config.js** app configuration
    
- Scripts & configuration files
    - **build.js** building process
        - runs _Rollup_ to build the app
        - runs _webpack_ to generate client bundles
        - runs _critical_ to inline critical CSS
        - runs _sitemap_ to generate `sitemap.xml`
    - **scripts/** scripts used by the building process
    - **babel.config.js** _Babel_ configuration
    - **webpack.config.dev.js** _webpack_ configuration for development
    - **webpack.config.prod.js** _webpack_ configuration for building client bundles
    - **rollup.config.js** _Rollup_ configuration for building the Express app
    - **.browserslistrc** target browsers for _Autoprefixer_
    - **postcss.config.cjs** _PostCSS_ configuration file to use _Autoprefixer_ & _Tailwind_
    - **tailwind.config.cjs** _Tailwind_ configuration
    - **tsconfig** _TypeScript_ configuration file
    - **package.json** _npm_ options & scripts


## <a name="3"></a>What's new
You can find template changes [here](https://github.com/robisim74/nodejs-mvc/releases).


## License
MIT
