(window.webpackJsonp=window.webpackJsonp||[]).push([[231],{736:function(n,e,t){"use strict";t.r(e),e.default="const vertex = `\n  attribute vec3 a_vertexPosition;\n  attribute vec4 a_color;\n  attribute vec3 a_vertexTextureCoord;\n\n  varying vec3 vTextureCoord;\n  varying vec4 vColor;\n\n  void main() {\n    gl_PointSize = 1.0;\n    gl_Position = vec4(a_vertexPosition.xy, 1.0, 1.0);\n    vColor = a_color;\n    vTextureCoord = a_vertexTextureCoord;\n  }\n`;\n\nconst fragment = `\n  precision mediump float;\n  uniform vec4 u_color;\n  uniform vec2 u_resolution;\n  uniform sampler2D u_texSampler;\n\n  varying vec4 vColor;\n  varying vec3 vTextureCoord;\n\n  void main() {\n    vec4 texColor = texture2D(u_texSampler, vTextureCoord.xy);\n    if(texColor.a == 0.0) {\n      gl_FragColor = vColor;\n    }\n  }\n`;\n\nconst container = document.getElementById('stage');\nconst scene = new spritejs.Scene({\n  container,\n  width: 600,\n  height: 600,\n});\n\nconst fglayer = scene.layer('fglayer');\ndocument.querySelector('#stage canvas').style.backgroundColor = '#eee';\n\nconst program = fglayer.renderer.createProgram({vertex, fragment});\n\nconst s = new spritejs.Ellipse();\ns.attr({\n  radius: [100, 50],\n  pos: [300, 300],\n  fillColor: 'blue',\n});\nfunction createMask() {\n  const maskCanvas = new OffscreenCanvas(200, 100);\n  const ctx = maskCanvas.getContext('2d');\n  ctx.fillStyle = 'black';\n  const path = new Path2D('M20,50L100,10L180,50L100,90Z');\n  ctx.fill(path);\n  return maskCanvas;\n}\nconst texture = createMask();\ns.attr({\n  texture,\n});\n\ns.setProgram(program);\nconst {width, height} = fglayer.getResolution();\ns.setUniforms({\n  u_resolution: [width, height],\n});\nfglayer.append(s);"}}]);