# egg-pluginDemo

egg-pluginDemo is a demo about how to extend and publish a plugin for egg framework
## To do list
* [x] the minni demo for extend
* [x] customlize the method to plugin
* [ ] agent.js support
* [ ] ts support
* [ ] test cases
## File introduction
```js
|-- egg-pluginDemo
    |-- .autod.conf.js
    |-- .eslintignore
    |-- .eslintrc
    |-- .gitignore
    |-- .travis.yml
    |-- app.js // the entry js file
    |-- LICENSE
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- app   // the extend for eggplugin, which have the same functions for the extend module in eggjs
    |   |-- extend
    |       |-- application.js
    |-- config //define the config constant variable
    |   |-- config.default.js
    |-- lib    //the main method js file
        |-- pluginDemo.js
```
## Usage

### install 
- npm pulished
  - npm i egg-pluginDemo --save
- npm unpublished 
  - download the project and copy it into the file catalog

### add to //config/plugin.js
- npm published
```js
pluginDemo:{
    enable: true,
    package: 'egg-pluginDemo',
  },
```
- npm unpulished
```js
pluginDemo:{
    enable: true,
    path: path.join(__dirname,'/../..'),
  },
```
- use it in the controller and service
```js
let res = await this.ctx.pluginDemo.testSend(msg);
```

## Questions & Suggestions

Please open an issue [here](https://github.com/oneWalker/egg-pluginDemo/issues).

## License

[MIT](LICENSE)
