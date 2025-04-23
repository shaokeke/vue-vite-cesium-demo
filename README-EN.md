# vue-vite-cesium-demo
[CN 中文](./README.md) / [EN English](./README-EN.md)

A simple webgis demo with Vue.js(v3.x), Vite and Cesium.js. You are welcomed to report bugs at any time, also you can contribute you own codes. 
## Preview

<img src="https://i.ibb.co/yn50yz5/earth.jpg" width="50%" alt="preview" />

<img src="https://i.ibb.co/HFgPbFB/pushing.jpg" width="50%" alt="preview" />

<img src="https://i.ibb.co/x6KKxVn/jietu.png" width="50%" alt="preview" />

<img src="https://i.ibb.co/7SwqVKK/xxx.png" width="50%" alt="preview" />

<img src="https://i.ibb.co/yPCcMwp/yyy.png" width="50%" alt="preview" />

## ONLINE SITE
[https://lihanqiang.github.io/vue-vite-cesium-demo/](https://lihanqiang.github.io/vue-vite-cesium-demo/)

## Demo strcuture
  - public
  - > geojson
  - > models
  - > plugins
  - > tilesets
  - > setting.js
  - src
  - > assets
  - > cesiumUtils
  - > components
  - > mocks
  - > styles
  - > App.vue
  - > main.js
  ### cesiumUtils:
  CesiumUtils dictionary is obviously significant for this demo, which contains important logics and codes to reach the functions. 
  ## Initiate the demo
  Use npm or yarn tool to build the app dependencies, enter the app root dictionary and run commands below, and you'll see it in the browser at website ```localhost:9999```.
  ```bash
  npm install
  npm run dev
  ```
  Or via yarn
  ```bash
  yarn 
  yarn run dev
  ```
  Run the command `npm run dev`, and the following occurs, try to run command `node .\node_modules\esbuild\install.js` in the root directory.
  ```bash
  Error: spawn H:\node_modules\esbuild\esbuild.exe ENOENT
    at Process.ChildProcess._handle.onexit (node:internal/child_process:282:19)
    at onErrorNT (node:internal/child_process:477:16)
  Emitted 'error' event on ChildProcess instance at:
    at Process.ChildProcess._handle.onexit (node:internal/child_process:288:12)
    at onErrorNT (node:internal/child_process:477:16)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
    errno: -4058,
    path: 'H:\node_modules\\esbuild\\esbuild.exe',
    spawnargs: [ '--service=0.12.9', '--ping' ]
  }
  ```
  
  ## About RTSP
  In this demo, RTSP is used to achieve real-time video flow pushing, download the file and run the app.

  ### Download
  download link：https://pan.baidu.com/s/1Hovu2CRr8N7MOlKm1MsPNw?pwd=txvg

  ### Installation
  * unzip the file to dir `D:\rtsp`:

  <img src="https://i.ibb.co/0BFtJ1z/2023-03-16-135523.png" width="50%" alt="preview" />

  * install the file `vc++lib_v2020.8.2.exe` at first.

  ### Running
  * open `cmd` as administrator, enter into dir `D:/rtsp/h5s-r10.8.0330.20-win64-release`.

  * type in the command `regservice.bat` and press enter.

  * type in the command `h5ss.bat` and press enter.

  * press `UAV detection (video streaming)` button, and now you can see the video streaming running in the upper left corner of the screen.
## TIPS
The files `.env.development` and `.env.production` are configs of development and production, the variable `VITE_BUILD_PATH_PREFIX` set `/vue-vite-cesium-demo`, because my website is https://lihanqiang.github.io/vue-vite-cesium-demo/ .

** In general, set `VITE_BUILD_PATH_PREFIX=''` , and run the command `npm run build` , publish your site, it should be no problem.


