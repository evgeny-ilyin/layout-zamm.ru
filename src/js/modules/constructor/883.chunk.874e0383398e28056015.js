"use strict";(self.webpackChunkwp=self.webpackChunkwp||[]).push([[883],{883:function(t,e,i){i.r(e),i.d(e,{default:function(){return O}});class s extends HTMLElement{}var o=i(977),n=i(835),r=i(155),h=i(135),a=i(141),d=i(633);var l=new class{constructor(){this.eventEmitter=new a.Z,this.eventEmitter.register=this.eventEmitter.register.bind(this.eventEmitter),this.eventEmitter.unregister=this.eventEmitter.unregister.bind(this.eventEmitter),this._isTouch=(0,d.b1)(),this._vpHelper=document.createElement("div"),this._vpHelperContainer=document.createElement("div"),this._sbHelper=document.createElement("div"),this._store={vw:0,vh:0,sb:0,out:0,bp:void 0,isTouch:this._isTouch},this.handleResize=this.handleResize.bind(this),this.handleEvent=this.handleEvent.bind(this),this.calcSize=this.calcSize.bind(this),this.getData=this.getData.bind(this),this.checkBp=this.checkBp.bind(this)}init(){this._vpHelper.style.cssText="\n            position: fixed;\n            z-index: -1;\n            left: -10000px;\n            top: -10000px;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n        ",this._sbHelper.style.cssText="\n            position: absolute;\n            z-index: -1;\n            left: -10000px;\n            top: -100000px;\n            width: 50px;\n            height: 50px;\n            overflow-y: scroll;\n            pointer-events: none;\n        ",document.documentElement.appendChild(this._vpHelper),document.documentElement.appendChild(this._sbHelper),this._vpHelperContainer.classList.add("container"),this._vpHelper.appendChild(this._vpHelperContainer),this.handleResize(),window.addEventListener("load",this.handleResize,{passive:!0}),window.addEventListener("resize",this.handleResize,{passive:!0}),h.Z.register(this.handleEvent)}handleEvent(t){t&&"viewport:resized"===t.type&&this.eventEmitter.emit()}handleResize(){this.calcSize(),setTimeout((()=>{this.calcSize(),this.eventEmitter.emit()}),this._isTouch?50:0)}calcSize(){this._store.vw=document.documentElement.clientWidth,this._store.vh=this._isTouch?this._vpHelper.offsetHeight:window.innerHeight,this._store.bp=(0,d.LB)(this._store.vw),this._store.sb=this._sbHelper.offsetWidth-this._sbHelper.clientWidth,this._store.out=this._vpHelperContainer.offsetLeft;var t=parseInt(window.getComputedStyle(this._vpHelperContainer).paddingLeft,10);document.documentElement.style.setProperty("--vw","".concat(Math.max(320,this._store.vw),"px")),document.documentElement.style.setProperty("--vh","".concat(this._store.vh,"px")),document.documentElement.style.setProperty("--ow","".concat(this._store.vw+this._store.sb,"px")),document.documentElement.style.setProperty("--out","".concat(this._store.out,"px")),document.documentElement.style.setProperty("--out-full","".concat(this._store.out+t,"px"))}getData(){return{vw:this._store.vw,vh:this._store.vh,bp:this._store.bp,sb:this._store.sb,out:this._store.out,isTouch:this._store.isTouch}}checkBp(t){return!!this._store.bp&&t.indexOf(this._store.bp)>=0}};l.init();var c={register:l.eventEmitter.register,unregister:l.eventEmitter.unregister,getData:l.getData,checkBp:l.checkBp},_=i(912),p={elsToCorrect:".header, .bottom-panel",elsForPadding:"",iosFix:!0};var m=new class{constructor(t){this._options=Object.assign({},p,t),this._state=!1,this._shift=void 0,this._timeout=void 0,this._timeoutFinally=void 0,this._sbWidth=c.getData().sb,this._isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent),this._sb=(0,_.Iz)(),this._elsToCorrect=void 0,this._elsForPadding=void 0,this._bodyState={overflow:void 0},this.lock=this.lock.bind(this),this.unlock=this.unlock.bind(this),this.indents=this.indents.bind(this),this.setPositionFixed=this.setPositionFixed.bind(this),this.resetPositionFixed=this.resetPositionFixed.bind(this),this.getData=this.getData.bind(this)}lock(){var{iosfix:t=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=document.body;this._state||(this._state=!0,this._bodyState={overflow:e.style.overflow},e.style.overflow="hidden",e.classList.add("scroll-locked"),document.body.scrollHeight>window.innerHeight&&(e.style.paddingRight="".concat(this._sbWidth,"px")),this.indents(!0),this._isIOS&&(this._options.iosFix||t)&&this.setPositionFixed(),h.Z.emit({type:"scroll:locked"}))}unlock(){var{delay:t=0,iosfix:e=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=document.body;null!==this._timeout&&window.clearTimeout(this._timeout),this._timeout=window.setTimeout((()=>{h.Z.emit({type:"scroll:unlocked"}),this._state&&(i.style.overflow=this._bodyState.overflow||"",i.style.paddingRight="",i.classList.remove("scroll-locked"),this.indents(!1),this._isIOS&&(this._options.iosFix||e)&&this.resetPositionFixed()),this._state=!1}),t)}setPositionFixed(){var t=document.body;this._timeoutFinally&&window.clearTimeout(this._timeoutFinally),this._shift=this._shift||g.getData().top,window.requestAnimationFrame((()=>{document.documentElement.classList.add("ios-scroll-fixed"),t.style.position="fixed",t.style.top="-".concat(this._shift,"px"),t.style.left="0px",t.style.width="100%",t.style.height="auto"}))}resetPositionFixed(){var t=document.body;document.documentElement.classList.remove("ios-scroll-fixed"),t.style.position="",t.style.top="",t.style.left="",t.style.bottom="",t.style.width="",t.style.height="",this._shift&&window.scrollTo(0,this._shift),this._timeoutFinally=window.setTimeout((()=>{this._shift=void 0}),400)}indents(t){this._options.elsToCorrect&&this._options.elsToCorrect.length&&(this._elsToCorrect=document.querySelectorAll(this._options.elsToCorrect)),this._options.elsForPadding&&this._options.elsForPadding.length&&(this._elsForPadding=document.querySelectorAll(this._options.elsForPadding)),this._elsToCorrect&&this._elsToCorrect.forEach((e=>{var i=e.dataset.indent||"padding",s="right"!==i?i+"Right":i;e.style[s]=t?"".concat(this._sb,"px"):""})),this._elsForPadding&&this._elsForPadding.forEach((e=>{e.style.paddingRight=t?"".concat(this._sb,"px"):""}))}getData(){return{shift:this._shift}}},u={lock:m.lock,unlock:m.unlock,getData:m.getData};var v=new class{constructor(){this.eventEmitter=new a.Z,this.eventEmitter.register=this.eventEmitter.register.bind(this.eventEmitter),this.eventEmitter.unregister=this.eventEmitter.unregister.bind(this.eventEmitter),this._isTouch=(0,d.b1)(),this._vp={vw:0,vh:0,sb:0,out:0,bp:void 0,isTouch:this._isTouch},this._store={top:0,center:0,bottom:0,prev:0,dir:"down",locked:!1},this._prev=0,this._dir=void 0,this.handleResize=this.handleResize.bind(this),this.handleScroll=this.handleScroll.bind(this),this.handleDispatcher=this.handleDispatcher.bind(this),this.getData=this.getData.bind(this)}init(){this.handleResize(),c.register(this.handleResize),this.handleScroll(),setTimeout(this.handleScroll,300),window.addEventListener("scroll",this.handleScroll,{passive:!0}),h.Z.register(this.handleDispatcher)}handleResize(){this._vp=c.getData()}handleScroll(){this._store.top=document.documentElement.scrollTop||document.body.scrollTop,this._store.center=this._store.top+this._vp.vh/2,this._store.bottom=this._store.top+this._vp.vh,this._store.dir=this._store.top<this._prev?"up":"down",this._store.prev=this._prev,this._prev=this._store.top,this.eventEmitter.emit()}handleDispatcher(t){"scroll:lock"===t.type&&(this._dir=this._store.dir,this._store.locked=!0,u.lock()),"scroll:unlock"===t.type&&(this._store.locked=!1,u.unlock())}getData(){return{top:this._store.top,center:this._store.center,bottom:this._store.bottom,prev:this._store.prev,dir:this._store.dir,locked:this._store.locked}}};v.init();var g={register:v.eventEmitter.register,unregister:v.eventEmitter.unregister,getData:v.getData},w=i(7),b=i.n(w),f=(t,e,i)=>{var s=i.name;if(!s)throw new Error('extension has to provide "name" option');return e._extensions||(e._extensions={}),e._extensions[s]||(e._extensions[s]=new t(e,i),e._extensions[s].init()),e._extensions[s]},x={name:"intersection-extension"};class y{constructor(t,e){this._parent=t,this._options=e,this.handleResize=this.handleResize.bind(this),this.handleIntersection=this.handleIntersection.bind(this),this.intersectionCallback=this.intersectionCallback.bind(this),this.disconnectIntersection=this.disconnectIntersection.bind(this),this.handleDispatcher=this.handleDispatcher.bind(this)}init(){this.handleResize(),c.register(this.handleResize)}destroy(){this.disconnectIntersection(),c.unregister(this.handleResize)}handleResize(){this.handleIntersection()}handleIntersection(){b()((()=>{"IntersectionObserver"in window?(this.disconnectIntersection(),this._observer=new IntersectionObserver(this.intersectionCallback,{threshold:.25}),this._options.target&&this._observer.observe(this._options.target)):this._options.callback&&this._options.intersectionCallback(!0)}))}intersectionCallback(t){t.forEach((t=>{var e=t.target;this._options.callback&&this._options.callback(t.isIntersecting&&!!e.offsetParent),this._options.controller&&this._options.controller(t)}))}disconnectIntersection(){this._observer&&this._observer.disconnect()}handleDispatcher(){}}var k=(t,e)=>f(y,t,Object.assign({},x,e)),E=i(573),C=i(698),R=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,z=t=>"true"===t||"false"!==t&&("null"===t?null:t===+t+""?+t:R.test(t)?JSON.parse(t):t),S={mode:"intersect",pixelRatio:2,fov:50,aspect:2,near:.1,far:2e4,camPosX:0,camPosY:75,camPosZ:240,frameColor:"#444444",texture:void 0,modelSrc:void 0,shadowTexture:void 0},T="is-loading",P=".swiper-container",D=".model-view__progress-bar",F=".model-view__progress",L=["stol","nojki","krepej","kolesa"];class O extends s{constructor(){super(),this._raf=0,this._init=!1,this._distance=0,this._canvas=null,this._loadingManager=new o.lLk,this._textureAjaxLoader=(()=>{var t=o.CtF;t.enabled=!0;var e=new o.dpR,i=new o.hH6;return i.setResponseType("blob"),Object.assign({},e,{load:function(s,o,n,r){var h=t.get(s);if(h)return a(),h;function a(){e.load(s,o,(()=>{}),r)}i.load(s,(function(e){var i=URL.createObjectURL(e),o=document.createElementNS("http://www.w3.org/1999/xhtml","img");o.onload=()=>{t.add(s,o),URL.revokeObjectURL(i),document.body.removeChild(o),a()},o.src=i,o.style.visibility="hidden",document.body.appendChild(o)}),n,r)}})})(),this._id=void 0,this._options=S,this.init=this.init.bind(this),this.render=this.render.bind(this),this.createScene=this.createScene.bind(this),this.createObjects=this.createObjects.bind(this),this.createRenderer=this.createRenderer.bind(this),this.setColors=this.setColors.bind(this),this.setTexture=this.setTexture.bind(this),this.handleResize=this.handleResize.bind(this),this.handleScroll=this.handleScroll.bind(this),this.handleDispatcher=this.handleDispatcher.bind(this),this.handleDoubleClick=this.handleDoubleClick.bind(this),this.resizeRendererToDisplaySize=this.resizeRendererToDisplaySize.bind(this),this.isOffscreen=this.isOffscreen.bind(this),this.swiperViewport=this.swiperViewport.bind(this),this.intersectionCallback=this.intersectionCallback.bind(this)}connectedCallback(){this._id=this.dataset.id,this._options=Object.assign({},S,function(t,e,i){if(!e){var s={};try{Object.entries(t.dataset).forEach((t=>{t[0]&&t[1]&&(s[t[0]]=z(t[1]))}))}catch(t){}return t.dataset?(0,C.Qr)(s)?t.dataset:s:null}if(void 0!==i)return t.dataset[e]="string"!=typeof i?JSON.stringify(i):i,t;if(t.dataset){var o=t.dataset[e];if("string"==typeof o)try{o=z(o)}catch(t){}else o=void 0;return o}}(this)),this._id&&(this._distance=this._options.camPosZ,this._swiper=this.closest(P),this._progress=this.querySelector(D),c.register(this.handleResize),g.register(this.handleScroll),h.Z.register(this.handleDispatcher),this.addEventListener("dblclick",this.handleDoubleClick),"intersect"===this._options.mode&&k(this,{target:this,callback:this.intersectionCallback}),"init"===this._options.mode&&(this.handleScroll(),this.init()))}disconnectedCallback(){this._init=!1,c.unregister(this.handleResize),g.unregister(this.handleScroll),h.Z.unregister(this.handleDispatcher),this.removeEventListener("dblclick",this.handleDoubleClick),this._raf&&window.cancelAnimationFrame(this._raf),this._renderer&&this._renderer.dispose(),this._camera&&this._scene&&this._controls&&(this._camera=void 0,this._scene=void 0,this._controls=void 0)}init(){this._init=!0,this.createRenderer(),this.createScene(),this.createObjects(),this.render()}resizeRendererToDisplaySize(){if(this._renderer){var t=this._renderer.domElement,e=t.clientWidth,i=t.clientHeight,s=t.width!==e||t.height!==i;return s&&this._renderer.setSize(e,i,!1),s}}render(){if(this._raf=window.requestAnimationFrame(this.render),this._renderer&&this._canvas&&this._camera&&this._scene&&this._controls&&!this.isOffscreen()){if(this.resizeRendererToDisplaySize()){var t=this._renderer.domElement;this._camera.aspect=t.clientWidth/t.clientHeight,this._camera.updateProjectionMatrix()}this._cubeCamera&&this._cubeCamera.update(this._renderer,this._scene),this._controls.update(),this._renderer.render(this._scene,this._camera)}}createObjects(){var t=new o.oAp(128);t.texture.type=o.cLu,this._cubeCamera=new o._am(1,1e3,t),this._loader&&this._options.modelSrc&&this._loader.load(this._options.modelSrc,(e=>{e.scene.traverse((e=>{e instanceof o.ZAu&&(e.position.y=-30,this._group=e),e instanceof o.Kj0&&("stol"===e.name?(e.material.envMap=t.texture,e.material.roughness=.75,e.material.metalness=1):(e.material.envMap=t.texture,e.material.roughness=1,e.material.metalness=1))})),this._scene&&this._group&&(this._group.position.x=-4,this._group.rotation.y=Math.PI/-5,this._scene.add(this._group)),this.setColors(),this._options.texture?this.setTexture(this._options.texture):h.Z.emit({type:"model-3d:loaded",id:this._id})}),(t=>{}),(t=>{}))}createScene(){if(this._canvas){this._camera=new o.cPb(this._options.fov,this._options.aspect,this._options.near,this._options.far),this._camera.position.z=this._options.camPosZ,this._camera.position.y=this._options.camPosY,this._camera.position.x=this._options.camPosX;var t=this.querySelector(".swiper-no-swiping");this._controls=new n.z(this._camera,t||this._canvas),this._controls.target.set(0,0,0),this._controls.enableDamping=!0,this._controls.minDistance=100,this._controls.maxDistance=500,this._scene=new o.xsS,this._scene.background=new o.Ilk(16777215),this._scene.fog=new o.ybr(16777215,400,2e3);var e=new o.vmT(16777215,4473924,3.5);e.position.set(0,400,0),this._scene.add(e);var i=new o.Ox3(16777215,1.5);i.position.set(0,300,-100),i.castShadow=!0,i.shadow.camera.top=100,i.shadow.camera.bottom=-100,i.shadow.camera.left=-120,i.shadow.camera.right=120,this._scene.add(i);var s=new o.cek(16711422,.5);s.position.set(200,400,400),this._scene.add(s);var r=new o.cek(16711422,1.25);r.position.set(0,-400,0),this._scene.add(r);var h=new o.Kj0(new o._12(5e3,5e3),new o.xoR({color:16777215,depthWrite:!0,side:o.ehD}));if(h.position.y=-501,h.position.x=-2500,h.position.z=-2500,h.receiveShadow=!0,this._scene.add(h),this._textureLoader&&this._options.shadowTexture){var a=this._textureLoader.load(this._options.shadowTexture),d=new o.BKK(200,140),l=new o.vBJ({map:a,opacity:.2,transparent:!0,depthWrite:!1}),c=new o.Kj0(d,l);c.position.y=-30,c.rotation.x=-.5*Math.PI,c.rotation.z=Math.PI/-5,this._scene.add(c)}this.handleResize()}}createRenderer(t){t||(t=document.createElement("canvas"),this._canvas=t,this.appendChild(this._canvas)),o.CP7&&(this._renderer=new o.CP7({canvas:t,alpha:!0,antialias:!0,logarithmicDepthBuffer:!0}),this._renderer.toneMapping=o.LY2,this._renderer.toneMappingExposure=.5,this._renderer.outputEncoding=o.knz,this._renderer.shadowMap.enabled=!0,this._renderer.setPixelRatio(this._options.pixelRatio)),r.E&&(this._loadingManager.onProgress=(t,e,i)=>{h.Z.emit({type:"model-3d:gltf-loading",id:this._id,progress:e/i})},this._loader=new r.E(this._loadingManager),this._textureLoader=new o.dpR(this._loadingManager))}isOffscreen(){if("undefined"==typeof window||!this._rect)return!0;var{left:t,right:e,top:i,bottom:s}=this._rect;return s<0||i>window.innerHeight||e<0||t>window.innerWidth}swiperViewport(){if(this._rect=this.getBoundingClientRect(),this._swiper){var{left:t,right:e}=this._swiper.getBoundingClientRect(),i=Math.floor(t)<=this._rect.left&&this._rect.left<=.9*Math.ceil(e);this._outOfSwiper=!i}else this._outOfSwiper=!1}handleScroll(){this._rect=this.getBoundingClientRect()}handleResize(){if(this._renderer&&this._canvas&&this._camera){var t=this.clientWidth,e=this.clientHeight;this._canvas.width=t*this._options.pixelRatio,this._canvas.height=e*this._options.pixelRatio;var{vw:i}=c.getData(),s=1500/i;if(this._distance=this._options.camPosZ*s,c.checkBp(["md"])){var o=768/i*.9;this._distance=Math.max(this._options.camPosZ*o,200)}c.checkBp(["xs","sm"])&&(this._distance=.8*this._options.camPosZ),this._camera.position.z=this._distance,this._camera.aspect=t/e,this._camera.updateProjectionMatrix(),this._renderer.setSize(t,e),setTimeout((()=>{this._renderer&&this._canvas&&this._camera&&(this._canvas.width=t*this._options.pixelRatio,this._canvas.height=e*this._options.pixelRatio,this._camera.aspect=t/e,this._camera.updateProjectionMatrix(),this._renderer.setSize(t,e))}),500)}}handleDoubleClick(){if(this._camera){var t=this._camera.position.x,e=this._camera.position.y,i=this._camera.position.z,s=()=>{this._camera&&this._camera.position.set(t,e,i)};E.i.tween({from:t,to:this._options.camPosX,duration:600},(e=>{var{value:i}=e;t=i,s()})),E.i.tween({from:e,to:this._options.camPosY,duration:600},(t=>{var{value:i}=t;e=i,s()})),E.i.tween({from:i,to:this._distance,duration:600},(t=>{var{value:e}=t;i=e,s()}))}}handleDispatcher(t){var e;"model-3d:update"===t.type&&t.id===this._id&&this.handleResize(),"model-3d:loading"===t.type&&t.id===this._id&&(h.Z.emit({type:"model-3d:gltf-loading",id:this._id,progress:0}),window.setTimeout((()=>{this.classList.add(T)}),10)),"model-3d:loaded"===t.type&&t.id===this._id&&this.classList.remove(T),"model-3d:update-colors"===t.type&&t.id===this._id&&(this._options.frameColor=this.dataset.frameColor||"#444444",this.setColors()),"model-3d:update-texture"===t.type&&t.id===this._id&&t.texture&&this.setTexture(t.texture),"swiper:transition-end"===t.type&&this._swiper&&this.swiperViewport(),"model-3d:gltf-loading"===t.type&&t.id===this._id&&void 0!==t.progress&&this._progress&&(this._progress.style.width="".concat(100*t.progress,"%"),null===(e=this._progress.closest(F))||void 0===e||e.setAttribute("data-percentage","".concat((100*t.progress).toFixed(0),"%")))}setColors(){var t;null===(t=this._scene)||void 0===t||t.traverse((t=>{t instanceof o.Kj0&&(L.includes(t.name)||(t.material.color=new o.Ilk(this._options.frameColor)))}))}setTexture(t){h.Z.emit({type:"model-3d:loading",id:this._id}),this._textureAjaxLoader.load(t,(t=>{var e;setTimeout((()=>{h.Z.emit({type:"model-3d:gltf-loading",id:this._id,progress:1}),h.Z.emit({type:"model-3d:loaded",id:this._id})}),10),null===(e=this._group)||void 0===e||e.traverse((e=>{if(e instanceof o.Kj0&&"stol"===e.name){var i=Object.assign({},e.material.map);t.matrix=i.matrix,t.wrapS=i.wrapS,t.wrapT=i.wrapT,t.encoding=i.encoding,t.minFilter=i.minFilter,t.magFilter=i.magFilter,e.material.map=t,e.material.needsUpdate=!0}}))}),(t=>{var{loaded:e,total:i}=t;h.Z.emit({type:"model-3d:gltf-loading",id:this._id,progress:e/i})}))}intersectionCallback(t){t&&!this._init&&this.init()}}customElements.define("model-3d",O)}}]);