(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{541:function(n,e,t){"use strict";t.r(e),e.default="const vertex = /* glsl */ `\n    precision highp float;\n    precision highp int;\n\n    attribute vec2 uv;\n    attribute vec3 position;\n    attribute vec3 normal;\n\n    uniform mat4 modelViewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat3 normalMatrix;\n\n    varying vec2 vUv;\n    varying vec3 vNormal;\n\n    void main() {\n        vUv = uv;\n        vNormal = normalize(normalMatrix * normal);\n        \n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n`;\n\nconst fragment = /* glsl */ `\n    precision highp float;\n    precision highp int;\n\n    uniform float uTime;\n    uniform sampler2D tMap;\n\n    varying vec2 vUv;\n    varying vec3 vNormal;\n\n    void main() {\n        vec3 normal = normalize(vNormal);\n        vec3 tex = texture2D(tMap, vUv).rgb;\n        \n        vec3 light = normalize(vec3(0.5, 1.0, -0.3));\n        float shading = dot(normal, light) * 0.15;\n        gl_FragColor.rgb = tex + shading;\n        gl_FragColor.a = 1.0;\n    }\n`;\n\nconst {Scene} = spritejs;\nconst {Mesh3d} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 35,\n  },\n});\n\nlayer.camera.attributes.pos = [8, 5, 15];\nlayer.camera.lookAt([0, 1.5, 0]);\n\n(async function () {\n  const img = await layer.loadImage('https://p3.ssl.qhimg.com/t01d6c6c93fdddf1e42.jpg');\n  const texture = layer.createTexture(img);\n  const program = layer.createProgram({\n    vertex,\n    fragment,\n    uniforms: {\n      tMap: {value: texture},\n    },\n  });\n  const model = await layer.loadModel('https://s5.ssl.qhres.com/static/1eb3e9b91a296abd.json');\n  const fox = new Mesh3d(program);\n  fox.setGeometry(model);\n  layer.append(fox);\n  layer.setOrbit();\n}());"}}]);