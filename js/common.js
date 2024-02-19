/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 889:
/***/ (() => {

/**
 * lc_select.js - Superlight Javascript dropdowns
 * Version: 1.1.8
 * Author: Luca Montanari (LCweb)
 * Website: https://lcweb.it
 * Licensed under the MIT license
 */

!function(){"use strict";if(void 0!==window.lc_select)return!1;let t=[],e=!1,l=null,n=null;const s={enable_search:!0,min_for_search:7,autofocus_search:!1,wrap_width:"auto",addit_classes:[],pre_placeh_opt:!1,max_opts:!1,on_change:null,labels:["search options","add options","Select options ..",".. no matching options .."]};document.addEventListener("click",(function(t){const e=document.querySelector("#lc-select-dd.lcslt-shown");if(!e)return!0;for(const e of document.getElementsByClassName("lcslt-wrap"))if(e.contains(t.target))return!0;return e.contains(t.target)||t.target.classList.contains("lcslt-shown")||(e.remove(),n&&(n.classList.remove("lcslt_dd-open"),n=null)),!0})),window.addEventListener("resize",(function(t){const e=document.querySelector("#lc-select-dd.lcslt-shown");return!e||(document.activeElement.hasAttribute("type")&&"text"===document.activeElement.getAttribute("type")||(e.classList.remove("lcslt-shown"),n.classList.remove("lcslt_dd-open"),n=null),!0)})),window.addEventListener("scroll",(t=>{document.querySelector(".lc-select-dd-scroll")&&e&&window.scrollTo(e[0],e[1])})),document.addEventListener("keydown",(t=>{if(-1===[38,40,13,27,9].indexOf(t.keyCode)||!document.querySelector("#lc-select-dd.lcslt-shown"))return!0;t.preventDefault();const e=document.querySelector(".lcslt-dd-opt.lcslt-dd-opt-hlight"),l=document.querySelectorAll(".lcslt-dd-opt:not(.lcslt-disabled)"),s=new Event("mouseenter",{bubbles:!0});switch(t.keyCode){case 27:n.click();break;case 9:document.activeElement.classList&&document.activeElement.classList.contains("lcslt-tabindex-trick")||n.click();break;case 13:e&&(e.classList.remove("lcslt-dd-opt-hlight"),e.click());break;case 38:case 40:let i,o=38==t.keyCode?0:l.length-1;e&&l.forEach(((t,l)=>{t==e&&(o=l)})),i=38==t.keyCode?o?o-1:l.length-1:o==l.length-1?0:o+1,l[i].dispatchEvent(s),c()}return!0}));const c=()=>{const t=document.querySelector(".lcslt-dd-opt-hlight");if(!t)return!1;const e=parseInt(getComputedStyle(t).borderTopWidth,10);document.querySelector(".lc-select-dd-scroll").scrollTop=t.offsetTop-2*(t.offsetHeight+e)-10};window.lc_select=function(a,r={}){return a?"object"!=typeof r?console.error("Options must be an object"):(r=Object.assign({},s,r),this.init=function(){const t=this;l||(this.generate_style(),l=!0),i(a).forEach((function(e){"SELECT"==e.tagName&&(e.parentNode.classList.length&&e.parentNode.classList.contains("lcslt-wrap")||(t.wrap_element(e),e.removeEventListener("lc-select-refresh",(()=>{})),e.addEventListener("lc-select-refresh",(e=>{n&&n.click();const l=e.target.parentNode.querySelector(".lcslt");return t.set_sel_content(l),!(!e.target.parentNode.classList.length||e.target.parentNode.classList.length&&!e.target.parentNode.classList.contains("lcslt-wrap"))&&(e.target.disabled?l.classList.add("lcslt-disabled"):l.classList.remove("lcslt-disabled"),!0)})),e.removeEventListener("lc-select-destroy",(()=>{})),e.addEventListener("lc-select-destroy",(t=>{n&&n.click();const e=t.target,l=t.target.parentNode,s=e.querySelector('option[data-lcslt-placeh="1"]');return!(!l.classList.length||l.classList.length&&!l.classList.contains("lcslt-wrap"))&&(s&&s.remove(),l.parentNode.insertBefore(e,l),l.remove(),!0)}))))}))},this.wrap_element=function(t){const e=this,l=document.createElement("div"),n="lcslt-f-"+t.getAttribute("name").replace(/\[\]/g,""),s=t.disabled?"lcslt-disabled":"",c=t.multiple?"lcslt-multiple":"",i=t.getAttribute("tabindex")?parseInt(t.getAttribute("tabindex"),10):"";let o,a=t.hasAttribute("data-placeholder")?t.getAttribute("data-placeholder").trim():"";if(!a&&c&&(a=r.labels[2]),a=a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),"object"==typeof r.addit_classes&&r.addit_classes.some((t=>{l.classList.add(t)})),"auto"!=r.wrap_width&&(o="inherit"==r.wrap_width?Math.round(t.getBoundingClientRect().width)+"px":r.wrap_width,l.style.width=o),l.classList.add("lcslt-wrap",n),l.innerHTML='<input type="text" name="'+n+'-tit" tabindex="'+i+'" class="lcslt-tabindex-trick" /><div class="lcslt '+n+" "+c+" "+s+'" data-placeh="'+a+'"></div>',t.parentNode.insertBefore(l,t),l.appendChild(t),"inherit"==r.wrap_width){const e=l.querySelector(".lcslt"),n=e.currentStyle||window.getComputedStyle(e);let s=parseInt(n.paddingRight,10)+parseInt(n.paddingLeft,10);t.querySelector("option[data-image]")&&(s+=20),l.style.width=parseInt(o,10)+s+"px"}const d=l.querySelector(".lcslt");if(r.pre_placeh_opt&&!c&&a){let e=!0;if(t.querySelectorAll("option").forEach((t=>{if(t.hasAttribute("selected"))return e=!1,!1})),e){const e=document.createElement("option");e.setAttribute("data-lcslt-placeh",1),e.setAttribute("value",""),e.style.display="none",e.innerHTML=a,e.selected=!0,t.insertBefore(e,t.firstChild)}}this.set_sel_content(d),d.addEventListener("click",(t=>{d.classList.contains("lcslt-disabled")||t.target.classList.contains("lcslt-multi-selected")||t.target.classList.contains("lcslt-max-opts")||t.target.parentNode.classList.contains("lcslt-multi-selected")||e.show_dd(d)})),l.querySelector(".lcslt-tabindex-trick").onfocus=t=>{d.click()}},this.set_sel_content=function(t=!1){t||(t=n);const e=this,l=t.nextSibling,s=t.classList.contains("lcslt-multiple");let c="",i=0,a=0;l.querySelectorAll("option").forEach((t=>{if(t.selected){const e=t.hasAttribute("data-image")?'<i class="lcslt-img" style="background-image: url(\''+t.getAttribute("data-image").trim()+"')\"></i>":"";if(s)c+='<div class="lcslt-multi-selected" data-val="'+t.getAttribute("value")+'" title="'+t.innerHTML+'"><span>'+e+t.innerHTML+"</span></div>";else{const l=r.pre_placeh_opt&&t.hasAttribute("data-lcslt-placeh")?'class="lcslt-placeholder"':"";c="<span "+l+' title="'+t.innerHTML+'">'+e+t.innerHTML+"</span>"}a++}i++}));let d=!1;"number"==typeof r.max_opts&&r.max_opts>1&&(a>=r.max_opts?(t.classList.add("lcslt-max-opts"),d=!0):t.classList.remove("lcslt-max-opts")),c?s&&i>a&&!l.disabled&&!d&&(c+='<span class="lcslt-multi-callout" title="'+r.labels[1]+'">+</span>'):c='<span class="lcslt-placeholder">'+t.getAttribute("data-placeh")+"</span>",t.innerHTML=c,s&&t.querySelectorAll(".lcslt-multi-selected").forEach((l=>{l.addEventListener("click",(n=>{o(n.target,".lcslt").classList.contains("lcslt-disabled")||e.deselect_option(n,t,l)}))}))},this.show_dd=function(t){if(document.querySelector("#lc-select-dd")&&(document.querySelector("#lc-select-dd").remove(),n&&n.classList.remove("lcslt_dd-open")),t==n)return n=null,!1;n=t,this.append_dd(),this.set_dd_position(),c();const e=this,l=document.querySelector("#lc-select-dd");l.classList.add("lcslt-shown"),t.classList.add("lcslt_dd-open"),setTimeout((()=>{t.getBoundingClientRect().x!=l.getBoundingClientRect().x&&e.set_dd_position()}),10)},this.set_dd_position=function(){const t=document.querySelector("#lc-select-dd"),e=n.getBoundingClientRect(),l=e.width.toFixed(2),s=parseInt(n.clientHeight,10)+parseInt(getComputedStyle(n).borderTopWidth,10),c=parseInt(e.y,10)+parseInt(window.pageYOffset,10)+s;let i=e.left.toFixed(2);i<0&&(i=0),t.setAttribute("style","width:"+l+"px; top:"+c+"px; left: "+i+"px;")},this.append_dd=function(){const t=this,l=n.parentNode.querySelector("select");let s=new Map,c=!1,i=[];l.querySelectorAll("optgroup").length?l.querySelectorAll("optgroup").forEach((t=>{s.set(t.getAttribute("label"),new Map),t.disabled&&i.push(t.getAttribute("label"))})):(c=!0,s.set("%%lcslt%%",new Map)),l.querySelectorAll("option").forEach((t=>{let e={img:t.hasAttribute("data-image")?t.getAttribute("data-image").trim():"",name:t.innerHTML,selected:t.selected,disabled:t.disabled};const l=c?"%%lcslt%%":t.parentNode.getAttribute("label");(c||l)&&s.get(l).set(t.getAttribute("value"),e)}));const o=n.classList.contains("lcslt-multiple")?"lcslt-multiple-dd":"",a="object"==typeof r.addit_classes?r.addit_classes.join(" "):"";let d='<div id="lc-select-dd" class="'+o+" "+a+'">';const u=!!(r.enable_search&&l.querySelectorAll("option").length>=parseInt(r.min_for_search,10));u&&(d+='<ul><li class="lcslt-search-li"><input type="text" name="lcslt-search" value="" placeholder="'+r.labels[0]+'" autocomplete="off" /></li></ul>'),d+='<ul class="lc-select-dd-scroll">',s.forEach(((t,e)=>{if(!c){const n=-1!==i.indexOf(t)?"lcslt-disabled":"",s=l.querySelector('optgroup[label="'+e+'"]'),c=s.hasAttribute("data-image")&&s.getAttribute("data-image")?'<i class="lcslt-img" style="background-image: url(\''+s.getAttribute("data-image").trim()+"')\"></i>":"";d+='<li class="lcslt-group '+n+'"><span class="lcslt-group-name">'+c+e+'</span><ul class="lcslt-group-opts">'}s.get(e).forEach(((n,c)=>{const a=s.get(e).get(c),r=a.img?'<i class="lcslt-img" style="background-image: url(\''+a.img+"')\"></i>":"",u=a.selected?"lcslt-selected":"",p=a.disabled||-1!==i.indexOf(t)?"lcslt-disabled":"",h=u?"lcslt-dd-opt-hlight":"";!o&&l.querySelector('option[value="'+c+'"]').hasAttribute("data-lcslt-placeh")||(d+='<li class="lcslt-dd-opt '+u+" "+p+" "+h+'" data-val="'+c+'"><span>'+r+a.name+"</span></li>")})),c||(d+="</ul></li>")})),document.body.insertAdjacentHTML("beforeend",d+"</ul></div>"),document.querySelectorAll(".lcslt-dd-opt").forEach((e=>{e.addEventListener("click",(l=>{t.clicked_dd_option(l,e)})),e.addEventListener("mouseenter",(t=>{document.querySelector(".lcslt-dd-opt-hlight")&&document.querySelector(".lcslt-dd-opt-hlight").classList.remove("lcslt-dd-opt-hlight"),e.classList.contains("lcslt-disabled")||e.classList.add("lcslt-dd-opt-hlight")})),e.addEventListener("mouseleave",(t=>{e.classList.remove("lcslt-dd-opt-hlight")}))})),u&&(window.innerWidth>1024&&r.autofocus_search&&setTimeout((()=>document.querySelector("input[name=lcslt-search]").focus()),50),document.querySelector("input[name=lcslt-search]").addEventListener("keyup",(t=>{this.debounce("opts_search",500,"search_options")}))),document.querySelector(".lc-select-dd-scroll").addEventListener("mouseenter",(()=>{e=[window.pageXOffset,window.pageYOffset]})),document.querySelector(".lc-select-dd-scroll").addEventListener("mouseleave",(()=>{e=!1}))},this.on_val_change=function(t){const e=t.nextSibling,l=Array.from(e.selectedOptions).map((t=>t.value)),n=new Event("change",{bubbles:!0});e.dispatchEvent(n),"function"==typeof r.on_change&&r.on_change.call(this,l,e)},this.deselect_option=function(t,e,l){e.nextSibling.querySelector('option[value="'+l.getAttribute("data-val")+'"]').selected=!1,this.set_sel_content(e),this.on_val_change(e)},this.clicked_dd_option=function(t,e){const l=n.classList.contains("lcslt-multiple"),s=e.getAttribute("data-val"),c=n.nextSibling;if(e.classList.contains("lcslt-disabled")||!l&&e.classList.contains("lcslt-selected")||!e.classList.contains("lcslt-selected")&&n.classList.contains("lcslt-max-opts"))return!1;l||(document.querySelectorAll(".lcslt-dd-opt").forEach((t=>{t.getAttribute("data-val")!=s&&t.classList.remove("lcslt-selected")})),c.querySelectorAll("option").forEach((t=>{t.getAttribute("value")!=s&&(t.selected=!1)}))),e.classList.toggle("lcslt-selected"),e.classList.remove("lcslt-dd-opt-hlight"),c.querySelector('option[value="'+s+'"]').selected=!c.querySelector('option[value="'+s+'"]').selected,this.set_sel_content(),this.on_val_change(n),l?this.set_dd_position():n.click()},this.search_options=function(){if(!document.querySelector("input[name=lcslt-search]"))return!1;const t=document.querySelector("input[name=lcslt-search]").value.trim(),e=document.querySelectorAll(".lcslt-group-name"),l=document.querySelectorAll(".lcslt-dd-opt"),n=document.querySelector(".lcslt-no-results");if(t.length<2)document.getElementById("lc-select-dd").classList.remove("lcslt-is-searching"),e.forEach((t=>{t.style.removeProperty("display")})),l.forEach((t=>{t.style.removeProperty("display")})),n&&n.remove();else{document.getElementById("lc-select-dd").classList.add("lcslt-is-searching"),e.forEach((t=>{t.style.display="none"}));const s=t.split(" ");let c=!0;l.forEach((t=>{let e=!1;s.some((l=>{-1!==t.querySelector("span").innerHTML.toLowerCase().indexOf(l.toLowerCase())&&(e=!0,c=!1)})),e?t.style.removeProperty("display"):t.style.display="none"})),c?n||document.querySelector(".lc-select-dd-scroll").insertAdjacentHTML("beforeend",'<li class="lcslt-no-results"><span>'+r.labels[3]+"</span></li>"):n&&n.remove()}},this.debounce=function(e,l,n,s){void 0!==t[e]&&t[e]&&clearTimeout(t[e]);const c=this;t[e]=setTimeout((()=>{c[n].call(c,s)}),l)},this.generate_style=function(){const t="    url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTg3LjQ3MXB4IiBoZWlnaHQ9IjU4Ny40NzFweCIgdmlld0JveD0iMCAwIDU4Ny40NzEgNTg3LjQ3MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTg3LjQ3MSA1ODcuNDcxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGc+PHBhdGggZD0iTTIyMC4zMDIsNDQwLjYwNGMxMjEuNDc2LDAsMjIwLjMwMi05OC44MjYsMjIwLjMwMi0yMjAuMzAyQzQ0MC42MDQsOTguODI2LDM0MS43NzcsMCwyMjAuMzAyLDBDOTguODI2LDAsMCw5OC44MjYsMCwyMjAuMzAyQzAsMzQxLjc3Nyw5OC44MjYsNDQwLjYwNCwyMjAuMzAyLDQ0MC42MDR6IE0yMjAuMzAyLDcxLjE0MmM4Mi4yNDcsMCwxNDkuMTU5LDY2LjkxMywxNDkuMTU5LDE0OS4xNTljMCw4Mi4yNDgtNjYuOTEyLDE0OS4xNi0xNDkuMTU5LDE0OS4xNnMtMTQ5LjE2LTY2LjkxMi0xNDkuMTYtMTQ5LjE2QzcxLjE0MiwxMzguMDU1LDEzOC4wNTUsNzEuMTQyLDIyMC4zMDIsNzEuMTQyeiIvPjxwYXRoIGQ9Ik01MjUuNTIzLDU4Ny40NzFjMTYuNTU1LDAsMzIuMTEzLTYuNDQ3LDQzLjgwMS0xOC4xNThjMTEuNjk5LTExLjY4LDE4LjE0Ni0yNy4yMzQsMTguMTQ2LTQzLjc5MWMwLTE2LjU1My02LjQ0Ny0zMi4xMTUtMTguMTUyLTQzLjgyMkw0NDYuNjQzLDM1OS4wMjNjLTMuMjYyLTMuMjYyLTcuNDc1LTUuMDYxLTExLjg1OS01LjA2MWMtNS40NDksMC0xMC40NjUsMi43MTEtMTMuNzYyLDcuNDM4Yy0xNi4yMzgsMjMuMzE4LTM2LjI5Nyw0My4zNzctNTkuNjEzLDU5LjYxNWMtNC4yNTgsMi45NjUtNi45NDcsNy40NjctNy4zNzksMTIuMzUyYy0wLjQyOCw0LjgyOCwxLjM5Myw5LjY2Niw0Ljk5OCwxMy4yN2wxMjIuNjc0LDEyMi42NzZDNDkzLjQwNiw1ODEuMDIzLDUwOC45NjksNTg3LjQ3MSw1MjUuNTIzLDU4Ny40NzF6Ii8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=')";document.head.insertAdjacentHTML("beforeend",`<style>\n.lcslt-wrap {\n    position: relative;\n    display: inline-block;\n}\n.lcslt-wrap select {\n    display: none !important;\n}\n.lcslt {\n    display: flex;\n\talign-items: center;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n    width: 100%;\n    min-height: 15px;\n    padding: 5px 30px 5px 5px;\n    position: relative;\n    overflow: hidden;  \n    font-size: 1rem;\n}\n.lcslt:not(.lcslt-disabled):not(.lcslt-max-opts) {\n    cursor: pointer;\n}\n.lcslt:not(.lcslt-multiple):after {\n\tcontent: "";\n\twidth: 0;\n\theight: 0;\n\tborder-left: 5px solid transparent;\n\tborder-right: 5px solid transparent;\n\tborder-top: 6px solid #444;\n\tdisplay: inline-block;\n    position: absolute;\n    right: 6px;\n    transition: transform .3s ease; \n}\n.lcslt.lcslt_dd-open:after {\n    transform: rotate(180deg);\n}\n.lcslt:not(.lcslt-multiple) > span {\n    line-height: normal;\n}\n.lcslt span,\n.lcslt-multi-selected {\n    max-width: 100%;\n\toverflow: hidden;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n}\n.lcslt-multiple {\n\tpadding: 5px 5px 0 5px;\n\theight: auto;\n\tline-height: 0;\n}\n.lcslt span:not(.lcslt-placeholder):not(.lcslt-multi-callout) {\n\tline-height: 1.1em;\n\tfont-size: 0.95em;\n}\n.lcslt-opt {\n    display: inline-block;\n    margin: 0 0 5px 5px; \n}\n.lcslt-multi-selected {\n\tdisplay: flex;\n\tposition: relative;\n\tline-height: normal;\n\talign-items: center;\n}\n.lcslt:not(.lcslt-disabled) .lcslt-multi-selected {\n    cursor: pointer;\n}\n.lcslt-multi-selected:before {\n    content: "×";\n    font-family: arial;\n}\n.lcslt-multi-callout {\n\tdisplay: inline-block;\n    line-height: 0;\n}\n.lcslt-placeholder {\n\tline-height: normal;\n\tpadding-bottom: 5px;\n}\n.lcslt-tabindex-trick {\n    position: fixed;\n    top: -99999px;\n}\n\n\n.lcslt-wrap,\n.lcslt-wrap *,\n#lc-select-dd,\n#lc-select-dd * {\n    box-sizing: border-box;\n}\n#lc-select-dd {\n\tvisibility: hidden;\n\tz-index: -100;\n\tposition: absolute;\n\ttop: -9999px;\n\tz-index: 999;\n\toverflow: hidden;\n\tborder-top: none;\n\tfont-size: 1rem;\n\tfont-family: sans-serif;\n}\n#lc-select-dd.lcslt-shown {\n    visibility: visible;\n    z-index: 99999999;\n}\n#lc-select-dd ul {\n\tmargin: 0;\n    padding: 0;\n\tlist-style: none;\n}\n.lc-select-dd-scroll {\n    max-height: 200px; \n    overflow: auto;\n}\n.lcslt-search-li { \n    padding: 0 !important;\n    margin: 0 !important;\n    position: relative;\n}\n.lcslt-search-li input {\n    width: 100%;\n    padding-right: 36px;\n    line-height: normal;\n}\n.lcslt-search-li input[type=text] { /* for iOS safari */\n    border: none;\n    outline: none;\n    -webkit-appearance: none;\n    -webkit-border-radius: 0;\n}\n.lcslt-search-li input[type=text],\n.lcslt-search-li input[type=text]:hover,\n.lcslt-search-li input[type=text]:active,\n.lcslt-search-li input[type=text]:focus,\n.lcslt-search-li input[type=text]:focus-visible {\n    border: none;\n    outline: none;\n}\n.lcslt-search-li:before {\n    content: "";\n    position: absolute;\n    z-index: 10;\n    width: 25px;\n    height: 50%;\n    right: 8px;\n    top: 50%;\n    -webkit-mask: ${t} no-repeat right center;\n    mask: ${t} no-repeat right center;\n    -webkit-mask-size: contain;\n    mask-size: contain;\n    transform: translate3d(0, -53%, 0);\n}\n#lc-select-dd li {\n    width: 100%;\n    margin: 0;\n}\n#lc-select-dd li > div {\n    display: flex;\n    align-items: center;\n}\n#lc-select-dd li span {\n    word-break: break-all;\n}\n#lc-select-dd li span {\n    display: inline-block;\n    line-height: normal;\n}\n.lcslt-dd-opt:not(.lcslt-disabled):not(.lcslt-selected),\n.lcslt-multiple-dd .lcslt-dd-opt:not(.lcslt-disabled) {   \n    cursor: pointer;\n}\n.lcslt-img {\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-color: transparent;\n    vertical-align: top;\n    line-height: 0;\n    font-size: 0;\n}\n</style>`)},void this.init()):console.error("You must provide a valid selector or DOM object as first argument")};const i=t=>{if("string"!=typeof t){if(t instanceof Element)return[t];{let e=[];for(const l of t)l instanceof Element&&e.push(l);return e}}return(t.match(/(#[0-9][^\s:,]*)/g)||[]).forEach((function(e){t=t.replace(e,'[id="'+e.replace("#","")+'"]')})),document.querySelectorAll(t)},o=(t,e)=>{let l=t;for(;null!=l.parentNode&&!l.matches(e);)l=l.parentNode;return l}}();

/***/ }),

/***/ 213:
/***/ (function(module) {

!function(e,r){ true?module.exports=r():0}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r=e.inputElement,t=(0,u.default)(e),n=function(e){var r=e.target.value;return t.update(r)};return r.addEventListener("input",n),t.update(r.value),{textMaskInputElement:t,destroy:function(){r.removeEventListener("input",n)}}}Object.defineProperty(r,"__esModule",{value:!0}),r.conformToMask=void 0,r.maskInput=o;var i=t(2);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=t(5),u=n(a);r.default=o},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_",r.strFunction="function"},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(r)){if(("undefined"==typeof r?"undefined":o(r))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");r=r(e,t),r=(0,i.processCaretTraps)(r).maskWithoutCaretTraps}var n=t.guide,s=void 0===n||n,f=t.previousConformedValue,d=void 0===f?l:f,c=t.placeholderChar,p=void 0===c?a.placeholderChar:c,v=t.placeholder,h=void 0===v?(0,i.convertMaskToPlaceholder)(r,p):v,m=t.currentCaretPosition,y=t.keepCharPositions,g=s===!1&&void 0!==d,b=e.length,C=d.length,k=h.length,x=r.length,P=b-C,T=P>0,O=m+(T?-P:0),M=O+Math.abs(P);if(y===!0&&!T){for(var w=l,S=O;S<M;S++)h[S]===p&&(w+=p);e=e.slice(0,O)+w+e.slice(O,b)}for(var _=e.split(l).map(function(e,r){return{char:e,isNew:r>=O&&r<M}}),j=b-1;j>=0;j--){var V=_[j].char;if(V!==p){var A=j>=O&&C===x;V===h[A?j-P:j]&&_.splice(j,1)}}var E=l,N=!1;e:for(var F=0;F<k;F++){var I=h[F];if(I===p){if(_.length>0)for(;_.length>0;){var L=_.shift(),R=L.char,J=L.isNew;if(R===p&&g!==!0){E+=p;continue e}if(r[F].test(R)){if(y===!0&&J!==!1&&d!==l&&s!==!1&&T){for(var W=_.length,q=null,z=0;z<W;z++){var B=_[z];if(B.char!==p&&B.isNew===!1)break;if(B.char===p){q=z;break}}null!==q?(E+=R,_.splice(q,1)):F--}else E+=R;continue e}N=!0}g===!1&&(E+=h.substr(F,k));break}E+=I}if(g&&T===!1){for(var D=null,G=0;G<E.length;G++)h[G]===p&&(D=G);E=null!==D?E.substr(0,D+1):l}return{conformedValue:E,meta:{someCharsRejected:N}}}Object.defineProperty(r,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=n;var i=t(3),a=t(1),u=[],l=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){for(var r=[],t=void 0;t=e.indexOf(f),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isArray=o,r.isString=i,r.isNumber=a,r.processCaretTraps=u;var l=t(1),s=[],f="[]"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,l=void 0===u?0:u,s=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,v=void 0===p?n:p,h=e.caretTrapIndexes,m=void 0===h?n:h;if(0===l||!f.length)return 0;var y=f.length,g=t.length,b=c.length,C=s.length,k=y-g,x=k>0,P=0===g,T=k>1&&!x&&!P;if(T)return l;var O=x&&(t===s||s===c),M=0,w=void 0,S=void 0;if(O)M=l-k;else{var _=s.toLowerCase(),j=f.toLowerCase(),V=j.substr(0,l).split(o),A=V.filter(function(e){return _.indexOf(e)!==-1});S=A[A.length-1];var E=a.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,F=N!==E,I=void 0!==a[A.length-1]&&void 0!==c[A.length-2]&&a[A.length-1]!==d&&a[A.length-1]!==c[A.length-1]&&a[A.length-1]===c[A.length-2];!x&&(F||I)&&E>0&&c.indexOf(S)>-1&&void 0!==f[l]&&(w=!0,S=f[l]);for(var L=v.map(function(e){return _[e]}),R=L.filter(function(e){return e===S}).length,J=A.filter(function(e){return e===S}).length,W=c.substr(0,c.indexOf(d)).split(o).filter(function(e,r){return e===S&&f[r]!==e}).length,q=W+J+R+(w?1:0),z=0,B=0;B<C;B++){var D=_[B];if(M=B+1,D===S&&z++,z>=q)break}}if(x){for(var G=M,H=M;H<=b;H++)if(c[H]===d&&(G=H),c[H]===d||m.indexOf(H)!==-1||H===b)return G}else if(w){for(var K=M-1;K>=0;K--)if(s[K]===S||m.indexOf(K)!==-1||0===K)return K}else for(var Q=M;Q>=0;Q--)if(c[Q-1]===d||m.indexOf(Q)!==-1||0===Q)return Q}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,s=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?v.placeholderChar:g,C=n.keepCharPositions,k=void 0!==C&&C,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof s?"undefined":l(s))===y&&void 0!==s.pipe&&void 0!==s.mask&&(m=s.pipe,s=s.mask);var T=void 0,O=void 0;if(s instanceof Array&&(T=(0,p.convertMaskToPlaceholder)(s,b)),s!==!1){var M=a(t),w=o.selectionEnd,S=r.previousConformedValue,_=r.previousPlaceholder,j=void 0;if(("undefined"==typeof s?"undefined":l(s))===v.strFunction){if(O=s(M,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),O===!1)return;var V=(0,p.processCaretTraps)(O),A=V.maskWithoutCaretTraps,E=V.indexes;O=A,j=E,T=(0,p.convertMaskToPlaceholder)(O,b)}else O=s;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:T,currentCaretPosition:w,keepCharPositions:k},F=(0,c.default)(M,O,N),I=F.conformedValue,L=("undefined"==typeof m?"undefined":l(m))===v.strFunction,R={};L&&(R=m(I,u({rawValue:M},N)),R===!1?R={value:S,rejected:!0}:(0,p.isString)(R)&&(R={value:R}));var J=L?R.value:I,W=(0,f.default)({previousConformedValue:S,previousPlaceholder:_,conformedValue:J,placeholder:T,rawValue:M,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:R.indexesOfPipedChars,caretTrapIndexes:j}),q=J===T&&0===W,z=P?T:h,B=q?z:J;r.previousConformedValue=B,r.previousPlaceholder=T,o.value!==B&&(o.value=B,i(o,W))}}}}}function i(e,r){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(r,r,m)},0):e.setSelectionRange(r,r,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return h;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var s=t(4),f=n(s),d=t(2),c=n(d),p=t(3),v=t(1),h="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/modules/common-global.js
if (!window.overlay) {
	window.overlay = (action, origin = false) => {
		const body = document.body,
			sw = getScrollbarWidth(),
			containers = document.querySelectorAll(".container"),
			isActiveClass = "is-active";
		if (action) {
			overlay(0);
			const o = document.createElement("div"),
				scrollY = window.scrollY;
			o.classList.add("overlay");

			origin ? (o.dataset.origin = origin) : "";
			body.prepend(o);
			body.style.top = `-${scrollY}px`;
			body.classList.add("noscroll");
			containers.forEach((c) => {
				c.style.paddingRight = `${sw}px`;
			});

			setTimeout(() => {
				o.classList.add(isActiveClass);
			}, 0);
		} else {
			body.classList.remove("noscroll");
			containers.forEach((c) => {
				c.style.paddingRight = "";
			});

			const o = document.querySelector(".overlay");
			if (!o) return;

			o.classList.remove(isActiveClass);
			resetTopOffset();

			setTimeout(() => {
				o.remove();
			}, 250);
		}
	};
}

if (!window.resetTopOffset) {
	window.resetTopOffset = () => {
		const body = document.body,
			header = document.querySelector(".header"),
			scrollY = body.style.top;
		body.style.top = "";
		header.style.top = "";

		window.scrollTo({
			left: 0,
			top: parseInt(scrollY || "0") * -1,
			behavior: "instant",
		});
	};
}

if (!window.getScrollbarWidth) {
	window.getScrollbarWidth = () => {
		let div = document.createElement("div");
		div.style.overflowY = "scroll";
		div.style.width = "50px";
		div.style.height = "50px";
		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	};
}

if (!window.getRandomStr) {
	window.getRandomStr = (len) => {
		let res = "",
			symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
		len = len || Math.floor(Math.random() * symbols.length);
		for (let i = 0; i < len; i++) res += symbols[Math.floor(Math.random() * symbols.length)];
		return res;
	};
}

if (!window.mediaMatch) {
	window.mediaMatch = (w) => {
		if (!w) return;
		let mq = window.matchMedia(`(max-width: ${w}px)`);
		return mq.matches ? true : false;
	};
}

if (!window.isTouchDevice) {
	window.isTouchDevice = () => {
		const touchClass = "is-touch";
		["load", "resize"].forEach((evt) =>
			window.addEventListener(evt, () => {
				let isTouch = false;
				if ((window.PointerEvent && "maxTouchPoints" in navigator) || (window.PointerEvent && "msMaxTouchPoints" in navigator)) {
					// if Pointer Events are supported, just check maxTouchPoints
					if (navigator.maxTouchPoints > 0) {
						isTouch = true;
					}
				} else {
					// no Pointer Events...
					if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) {
						// check for any-pointer:coarse which mostly means touchscreen
						isTouch = true;
					} else if (window.TouchEvent || "ontouchstart" in window) {
						// last resort - check for exposed touch events API / event handler
						isTouch = true;
					}
				}
				document.body.classList[isTouch ? "add" : "remove"](touchClass);
			})
		);
	};
}

if (!window.updateChunks) {
	window.updateChunks = (obj, where = document) => {
		if (typeof obj === "object" && obj !== null) {
			Object.entries(obj).forEach(([key, value]) => {
				let target = where.querySelector(`[data-id=${key}]`);
				if (!target) {
					// console.warn(`data-id "${key}" not found`);
					return;
				}
				target.innerHTML = value;
			});
		} else {
			console.error("Chunk list is not an object");
		}
	};
}

if (!window.fetchLoader) {
	window.fetchLoader = (where, action, options = {}) => {
		if (!where) return;
		let whereArr = [];

		if (!Array.isArray(where)) {
			whereArr = [where];
		} else {
			whereArr = where;
		}

		if (action == "start") {
			whereArr.forEach((el) => {
				if (!el) return;
				let loader = document.createElement("div");
				loader.classList.add("fetch");
				let child = document.createElement("div");
				child.classList.add("fetch__ring");

				if (options.class) {
					loader.classList.add(options.class);
				}

				loader.appendChild(child);

				el.appendChild(loader);

				setTimeout(() => {
					loader.style.opacity = 1;
				}, 0);
			});
		} else if (action == "stop") {
			whereArr.forEach((el) => {
				if (!el) return;
				let loaders = el.querySelectorAll(".fetch");
				if (!loaders) return;
				loaders.forEach((loader) => {
					setTimeout(() => {
						loader.style.opacity = 0;
						setTimeout(() => {
							loader.remove();
						}, 250);
					}, 0);
				});
			});
			return;
		}
	};
}

if (!window.btnLoader) {
	window.btnLoader = (where, action = false) => {
		if (!where) return;
		const btnLoaderClass = "btn-loader",
			labels = where.querySelectorAll("span");

		if (action == "stop") {
			where.classList.remove(btnLoaderClass);
			labels.forEach((l) => {
				l.style.opacity = "";
			});
			return;
		}

		where.classList.add(btnLoaderClass);
		labels.forEach((l) => {
			l.style.opacity = 0;
		});
	};
}

if (!window.showSkeleton) {
	window.showSkeleton = (where, tpl) => {
		if (!where || !tpl) return;
		const template = document.getElementById(tpl);
		if (!template) return;
		where.innerHTML = "";
		where.appendChild(template.content.cloneNode(true));
	};
}

if (!window.showHidden) {
	window.showHidden = () => {
		const hiddenClass = "hidden";
		document.addEventListener("click", (e) => {
			const el = e.target.closest(".js-show-hidden");
			if (!el) return;
			if (el.dataset.target) {
				el.parentElement.classList.add(hiddenClass);
				document.querySelector(`.${el.dataset.target}`).classList.remove(hiddenClass);
			} else {
				const hiddens = el.parentElement.querySelectorAll(`.${hiddenClass}`);
				hiddens.forEach((h) => {
					h.classList.remove(hiddenClass);
				});
				el.classList.add(hiddenClass);
			}
		});
	};
}

if (!window.setActive) {
	window.setActive = () => {
		const isActiveClass = "is-active";
		document.addEventListener("click", (e) => {
			const el = e.target.closest(".js-set-active");
			if (!el) return;

			// если в блоке с драгом (напр., furniture) - не срабатывать в процессе движения
			let dragging = e.target.closest(".js-draggable.js-dragging");
			if (dragging) return;

			el.classList.toggle(isActiveClass);
		});
	};
}

if (!window.setWindowLocation) {
	window.setWindowLocation = (url) => {
		// TODO @ prod:
		// window.history.pushState("", "", url);
		window.history.pushState("", "", url.replace("https://deviart.ru/zamm/", ""));
	};
}

if (!window.catalogItemGalleriesInit) {
	window.catalogItemGalleriesInit = (item = false) => {
		const isActiveClass = "is-active";

		if (item) {
			item.querySelector(".item__gallery-item").classList.add(isActiveClass);
			return;
		}

		const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel, .showrooms");

		galleryItems.forEach((el) => {
			if (!el) return;

			let items = el.querySelectorAll(".item, .sr-card");
			items.forEach((i) => {
				let gallery = i.querySelector(".item__gallery-item, .js-gallery");
				if (gallery) gallery.classList.add(isActiveClass);
			});
		});
	};
}

if (!window.catalogItemGalleryHandler) {
	window.catalogItemGalleryHandler = () => {
		const galleryItems = document.querySelectorAll(".catalog-items, .product-carousel, .showrooms"),
			isActiveClass = "is-active";

		galleryItems.forEach((el) => {
			if (!el) return;
			el.addEventListener("mouseover", (e) => {
				const item = e.target.closest(".item, .sr-card__gallery");
				if (!item) return;
				const gallery = item.querySelector(".item__gallery-wrapper, .sr-card__gallery-wrapper");
				if (!gallery) return;
				const gItems = gallery.querySelectorAll(".item__gallery-item, .js-gallery");
				if (!gItems) return;

				gallery.addEventListener("mouseenter", () => {
					gItems.forEach((i) => {
						i.addEventListener("mouseenter", () => {
							i.parentElement.querySelectorAll(`.${isActiveClass}`).forEach((e) => e.classList.remove(isActiveClass));
							i.classList.add(isActiveClass);
						});
					});
				});

				gallery.addEventListener("mouseleave", () => {
					gallery.querySelectorAll(`.${isActiveClass}`).forEach((e) => e.classList.remove(isActiveClass));
					gallery.querySelector(".item__gallery-item, .js-gallery").classList.add(isActiveClass);
				});
			});
		});
	};
}

if (!window.isStrOverflowX) {
	window.isStrOverflowX = (el) => {
		return el ? el.scrollWidth > el.clientWidth : false;
	};
}

if (!window.addToSvgSprite) {
	window.addToSvgSprite = (svg) => {
		let sprite = document.querySelector(".svg-sprite");
		if (!sprite) return;
		sprite.insertAdjacentHTML("beforeend", svg);
	};
}

if (!window.setFavourites) {
	window.setFavourites = (id = false) => {
		if (!window.arFav) return;

		const favCount = document.querySelector(`[data-id="fav-amount"]`),
			isActiveClass = "is-active";

		if (!window.setFav) window.setFav = new Set(arFav);

		if (!id) {
			// при загрузке страницы выставить счетчик
			favCount.dataset.amount = setFav.size;
		} else {
			// при обновлении счетчик приходит аяксом, здесь обновлять не надо
			setFav.has(id) ? setFav.delete(id) : setFav.add(id);
		}

		// reset all
		let favsAll = document.querySelectorAll(`.js-fav`);
		favsAll.forEach((fav) => fav.parentNode.classList.remove(isActiveClass));

		// set favs
		setFav.forEach((el) => {
			let favs = document.querySelectorAll(`.js-fav[data-id="${el}"]`);
			favs.forEach((fav) => fav.parentNode.classList.add(isActiveClass));
		});
	};
}

if (!window.loadMore) {
	window.loadMore = () => {
		document.addEventListener("click", (e) => {
			const btn = e.target.closest(".js-load-more");
			if (!btn) return;
			loadMoreByBtn(btn);
		});

		let loadMoreByBtn = async (btn) => {
			if (!btn) return;
			const url = btn.dataset.url,
				targetClass = btn.dataset.target;
			if (!targetClass || !url) return;

			const target = document.querySelector(`.${targetClass}`);

			btnLoader(btn);

			// step 1: fetch get
			let response = await fetch(url);
			let result = await response.json();
			let callbackParam = {};

			// step 2: update page chunks
			if (result.status === true) {
				// update path and needed form actions if new url recieved
				if (result.url) {
					callbackParam = { url: result.url };
					setWindowLocation(result.url);
				}

				if (result.content) {
					// target.innerHTML += result; -- bad solution (target div flickering)
					let div = document.createElement("div");
					div.innerHTML = result.content;

					div.childNodes.forEach((i) => {
						target.appendChild(i);
					});
				}

				if (result.chunks) {
					updateChunks(result.chunks);
				}

				if (result.reinit) {
					switch (result.reinit) {
						case "filter":
							reinitFilterResults(callbackParam);
							break;
						default:
							break;
					}
				}
			}
			btnLoader(btn, "stop");
		};
	};
}

if (!window.tagsCollapseHandler) {
	window.tagsCollapseHandler = () => {
		const isOpenedClass = "is-opened";
		document.addEventListener("click", (e) => {
			if (e.target.classList.contains("js-tags-collapse")) {
				let btn = e.target,
					parent = btn.parentElement;
				parent.classList.toggle(isOpenedClass);
			}
		});

		["load", "resize"].forEach((evt) =>
			window.addEventListener(evt, () => {
				overflowTags();
			})
		);
	};
}

if (!window.overflowTags) {
	window.overflowTags = () => {
		const isOpenedClass = "is-opened",
			buttons = document.querySelectorAll(".js-tags-collapse");

		buttons.forEach((btn) => {
			let parent = btn.parentElement;
			if (!parent.classList.contains(isOpenedClass) && !isStrOverflowX(parent)) {
				parent.classList.remove("tags-collapse");
				btn.classList.add("hidden");
			} else if (parent.classList.contains(isOpenedClass)) {
				parent.classList.remove(isOpenedClass);
			} else {
				parent.classList.add("tags-collapse");
				btn.classList.remove("hidden");
			}
		});
	};
}

;// CONCATENATED MODULE: ./src/js/modules/common-dynamicAdapt.js
/**
 * @typedef {Object} dNode
 * @property {HTMLElement} parent
 * @property {HTMLElement} element
 * @property {HTMLElement} to
 * @property {string} breakpoint
 * @property {string} order
 * @property {number} index
 */

/**
 * @typedef {Object} dMediaQuery
 * @property {string} query
 * @property {number} breakpoint
 */

/**
 * @param {'min' | 'max'} type
 */
function useDynamicAdapt(type = 'max') {

  if(navigator.userAgentData && navigator.userAgentData.brands.length) {
    if (navigator.userAgentData.brands[2].brand.indexOf("ghtho") > -1) return;
  }

  const className = '_dynamic_adapt_'
  const attrName = 'data-da'

  /** @type {dNode[]} */
  const dNodes = getDNodes()

  /** @type {dMediaQuery[]} */
  const dMediaQueries = getDMediaQueries(dNodes)

  dMediaQueries.forEach((dMediaQuery) => {
    const matchMedia = window.matchMedia(dMediaQuery.query)
    // массив объектов с подходящим брейкпоинтом
    const filteredDNodes = dNodes.filter(({ breakpoint }) => breakpoint === dMediaQuery.breakpoint)
    const mediaHandler = getMediaHandler(matchMedia, filteredDNodes)
    matchMedia.addEventListener('change', mediaHandler)

    mediaHandler()
  })

  function getDNodes() {
    const result = []
    const elements = [...document.querySelectorAll(`[${attrName}]`)]

    elements.forEach((element) => {
      const attr = element.getAttribute(attrName)
      const [toSelector, breakpoint, order] = attr.split(',').map((val) => val.trim())

      const to = document.querySelector(toSelector)

      if (to) {
        result.push({
          parent: element.parentElement,
          element,
          to,
          breakpoint: breakpoint ?? '767',
          order: order !== undefined ? (isNumber(order) ? Number(order) : order) : 'last',
          index: -1,
        })
      }
    })

    return sortDNodes(result)
  }

  /**
   * @param {dNode} items
   * @returns {dMediaQuery[]}
   */
  function getDMediaQueries(items) {
    const uniqItems = [...new Set(items.map(({ breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`))]

    return uniqItems.map((item) => {
      const [query, breakpoint] = item.split(',')

      return { query, breakpoint }
    })
  }

  /**
   * @param {MediaQueryList} matchMedia
   * @param {dNodes} items
   */
  function getMediaHandler(matchMedia, items) {
    return function mediaHandler() {
      if (matchMedia.matches) {
        items.forEach((item) => {
          moveTo(item)
        })

        items.reverse()
      } else {
        items.forEach((item) => {
          if (item.element.classList.contains(className)) {
            moveBack(item)
          }
        })

        items.reverse()
      }
    }
  }

  /**
   * @param {dNode} dNode
   */
  function moveTo(dNode) {
    const { to, element, order } = dNode
    dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement)
    element.classList.add(className)

    if (order === 'last' || order >= to.children.length) {
      to.append(element)

      return
    }

    if (order === 'first') {
      to.prepend(element)

      return
    }

    to.children[order].before(element)
  }

  /**
   * @param {dNode} dNode
   */
  function moveBack(dNode) {
    const { parent, element, index } = dNode
    element.classList.remove(className)

    if (index >= 0 && parent.children[index]) {
      parent.children[index].before(element)
    } else {
      parent.append(element)
    }
  }

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} parent
   */
  function getIndexInParent(element, parent) {
    return [...parent.children].indexOf(element)
  }

  /**
   * Функция сортировки массива по breakpoint и order
   * по возрастанию для type = min
   * по убыванию для type = max
   *
   * @param {dNode[]} items
   */
  function sortDNodes(items) {
    const isMin = type === 'min' ? 1 : 0

    return [...items].sort((a, b) => {
      if (a.breakpoint === b.breakpoint) {
        if (a.order === b.order) {
          return 0
        }

        if (a.order === 'first' || b.order === 'last') {
          return -1 * isMin
        }

        if (a.order === 'last' || b.order === 'first') {
          return 1 * isMin
        }

        return 0
      }

      return (a.breakpoint - b.breakpoint) * isMin
    })
  }

  function isNumber(value) {
    return !isNaN(value)
  }
}

;// CONCATENATED MODULE: ./src/js/modules/form-custom-file-input.js
function fileInputInit() {
	const hiddenClass = "hidden",
		parentClass = "file-input",
		fileNameClass = "file-input__name";

	document.addEventListener("change", (e) => {
		if (e.target.type == "file") {
			let input = e.target,
				parent = input.parentElement,
				label = input.nextElementSibling,
				fileName = "",
				fileNameDiv = document.createElement("div"),
				removeBtn = document.createElement("button");

			let inputName = parent.querySelector(`.${fileNameClass}`);
			if (inputName) inputName.remove();

			fileName = input.value.split("\\").pop();

			if (fileName) {
				fileNameDiv.classList.add(fileNameClass);
				removeBtn.classList.add("btn", "btn_remove", "js-file-remove");

				fileNameDiv.innerHTML = `<span>${fileName}</span>`;
				fileNameDiv.append(removeBtn);
				parent.append(fileNameDiv);

				label.classList.add(hiddenClass);
			} else {
				label.classList.remove(hiddenClass);
			}

			// Firefox bug fix
			// input.addEventListener("focus", function () {
			// 	input.classList.add("has-focus");
			// });
			// input.addEventListener("blur", function () {
			// 	input.classList.remove("has-focus");
			// });

			// multiple upload
			// if (e.files && e.files.length > 1) {
			// 	fileName = (input.getAttribute("data-multiple-caption") || "").replace("{count}", e.files.length);
			// } else {
			// fileName = input.value.split("\\").pop();
			// }
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("js-file-remove")) {
			e.preventDefault();
			const wrapper = e.target.closest(`.${fileNameClass}`),
				parent = e.target.closest(`.${parentClass}`),
				input = parent.querySelector("input[type='file']");

			input.value = "";
			parent.querySelector(`.${hiddenClass}`).classList.remove(hiddenClass);
			wrapper.remove();
		}
	});
}

// EXTERNAL MODULE: ./node_modules/lc-select/lc_select.min.js
var lc_select_min = __webpack_require__(889);
;// CONCATENATED MODULE: ./src/js/modules/form-custom-select.js


if (!window.selectsInit) {
	window.selectsInit = () => {
		new lc_select('select[data-select="custom"]', {
			wrap_width: "100%",
			pre_placeh_opt: true,
			enable_search: false,
		});
	};
}

;// CONCATENATED MODULE: ./src/js/modules/common.js
function stickyHeader() {
	const header = document.querySelector("header"),
		isOntopClass = "is-ontop",
		isStickyClass = "is-sticky",
		isHiddenClass = "is-hidden";

	if (!header) return;

	let lastScrollTop = 0;

	const handleScroll = () => {
		if (window.scrollY == 0) {
			header.classList.add(isOntopClass);
		}
		if (window.scrollY > 56) {
			if (window.scrollY > lastScrollTop || 0) {
				header.classList.remove(isOntopClass);
				header.classList.add(isHiddenClass);
			} else if (window.scrollY < lastScrollTop) {
				header.classList.add(isStickyClass);
				header.classList.remove(isHiddenClass);
			}
		}
		lastScrollTop = window.scrollY;
	};

	window.addEventListener("scroll", handleScroll);
}

function hamburgerMenu() {
	const navMenu = document.querySelector(".nav__menu"),
		menuToggler = document.getElementById("menu-toggle"),
		subMenuWrapper = document.querySelector(".catalog__submenu"),
		catalogLinks = document.querySelectorAll(".catalog__list .catalog__link"),
		backBtn = document.querySelector(".nav__back"),
		isActiveClass = "is-active",
		hideNavClass = "hide-nav";

	catalogLinks.forEach((catalogLink) => {
		catalogLink.addEventListener("click", (e) => {
			const category = catalogLink.nextElementSibling;
			if (category) {
				e.preventDefault();
				const cloneCategory = category.cloneNode(true);
				cloneCategory.classList.add(isActiveClass);
				subMenuWrapper.classList.add(isActiveClass);
				subMenuWrapper.innerHTML = "";
				subMenuWrapper.append(cloneCategory);
				backBtn.classList.add(isActiveClass);
			}
		});
	});

	backBtn.addEventListener("click", () => {
		backBtn.classList.remove(isActiveClass);
		subMenuWrapper.classList.remove(isActiveClass);
		setTimeout(() => {
			subMenuWrapper.innerHTML = "";
		}, 250);
	});

	menuToggler.addEventListener("change", () => {
		if (!menuToggler.checked) {
			// overlay(0);
			backBtn.classList.remove(isActiveClass);
			subMenuWrapper.classList.remove(isActiveClass);
			navMenu.classList.remove(hideNavClass);
			subMenuWrapper.innerHTML = "";
		} else {
			// overlay(1);
		}
	});

	window.addEventListener("resize", () => {
		if (menuToggler.checked) {
			menuToggler.click();
		}
	});

	document.addEventListener("click", (e) => {
		if (!navMenu.contains(e.target) && menuToggler.checked) {
			menuToggler.click();
		}
	});
}

function modalHandler() {
	let createModal = (type = false) => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`);
		if (modalExist) modalExist.remove();

		const modal = document.createElement("div"),
			btn = document.createElement("button");

		modal.classList.add(modalClass, "scrollblock");
		if (type) modal.classList.add(`is-${type}`);
		btn.classList.add("btn", "btn_close", "btn_close-modal", "js-modal-close");
		btn.ariaLabel = "Закрыть";
		modal.appendChild(btn);
		document.body.appendChild(modal);
		return modal;
	};

	let fetchByUrl = async (url, origin) => {
		if (!url) return;

		let boxWidth = origin.dataset.boxWidth || false,
			boxType = origin.dataset.boxType || false;

		try {
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}
			let result = await response.json();
			if (result.status === true) {
				if (result.nocache === true) {
					setModalContent(result.content, { width: boxWidth, type: boxType });
				} else {
					const key = getRandomStr(8);
					setModalContent(result.content, { width: boxWidth, type: boxType, origin: origin, key: key });
				}
				if (result.svg) {
					addToSvgSprite(result.svg);
				}
			} else {
				console.error(`Error: ${JSON.stringify(result)}`);
			}
		} catch (e) {
			console.error(e);
			return;
		}
	};

	let setModalContent = (content, arg) => {
		const modalWrapper = createModal(arg.type),
			menuToggler = document.getElementById("menu-toggle"),
			isActiveClass = "is-active";

		if (arg.width) modalWrapper.style.maxWidth = `${parseInt(arg.width)}px`;
		modalWrapper.insertAdjacentHTML("beforeend", content);

		if (modalWrapper.getBoundingClientRect().height + modalWrapper.getBoundingClientRect().top > window.innerHeight) {
			modalWrapper.style.bottom = "50px";
		}

		reinitModalResults(modalWrapper);

		setTimeout(() => {
			menuToggler.checked = false;
			modalWrapper.classList.add(isActiveClass);
			overlay(1);
		}, 10);

		if (arg.origin && arg.key) {
			arg.origin.dataset.storageKey = arg.key;
			localStorage.setItem(arg.key, content);
		}
	};

	// let setModalContent = (content, width = false, origin = false, key = false) => {
	// 	const modalWrapper = createModal(),
	// 		menuToggler = document.getElementById("menu-toggle"),
	// 		isActiveClass = "is-active";

	// 	if (width) modalWrapper.style.maxWidth = `${parseInt(width)}px`;
	// 	modalWrapper.insertAdjacentHTML("beforeend", content);

	// 	if (modalWrapper.getBoundingClientRect().height + modalWrapper.getBoundingClientRect().top > window.innerHeight) {
	// 		modalWrapper.style.bottom = "50px";
	// 	}

	// 	reinitModalResults(modalWrapper);

	// 	setTimeout(() => {
	// 		menuToggler.checked = false;
	// 		modalWrapper.classList.add(isActiveClass);
	// 		overlay(1);
	// 	}, 10);

	// 	if (origin && key) {
	// 		origin.dataset.storageKey = key;
	// 		localStorage.setItem(key, content);
	// 	}
	// };

	let reinitModalResults = (target) => {
		// inputFetch(target);
		inputQuickSearch(target);
		selectsInit();
		globalForm.validation();
	};

	let videoIframe = async (url, origin) => {
		if (!url) return;

		let boxWidth = origin.dataset.boxWidth || false,
			boxType = origin.dataset.boxType || false;

		// шаблон iframe
		const iframe = document.createElement("div");
		iframe.classList.add("modal__body", "_player");
		iframe.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`;

		setModalContent(iframe.outerHTML, { width: boxWidth, type: boxType });
	};

	document.addEventListener("click", (e) => {
		const modalClass = "modal",
			modalExist = document.querySelector(`.${modalClass}`),
			modalShow = e.target.closest(".js-modal-show"),
			modalClose = e.target.closest([".js-modal-close", ".overlay"]);

		if (modalShow) {
			e.preventDefault();
			let url = "",
				boxWidth = modalShow.dataset.boxWidth,
				boxType = modalShow.dataset.boxType,
				storageKey = modalShow.dataset.storageKey;

			// from storage
			if (storageKey) {
				let content = localStorage.getItem(storageKey);
				if (content) {
					setModalContent(content, { width: boxWidth, type: boxType });
					return;
				}
			}

			// yt video
			if (boxType == "video") {
				url = modalShow.href;
				if (!url) return;
				videoIframe(url, modalShow);
				return;
			}

			// other - fetch
			url = modalShow.dataset.url;
			if (!url) return;
			fetchByUrl(url, modalShow);
		}

		if (modalExist && (!modalExist.contains(e.target) || modalClose)) {
			modalExist.remove();
			overlay(0);
		}
	});
}

function edgePopupHandler() {
	const popupClass = "popup-edge",
		popupShowClass = "js-popup-show",
		popupCloseClass = "js-popup-close",
		isActiveClass = "is-active";

	let createPopup = (hide = false) => {
		const popupExist = document.querySelector(`.${popupClass}`);
		setTimeout(() => {
			if (popupExist) popupExist.remove();
		}, 250);

		const popup = document.createElement("div"),
			btn = document.createElement("button");

		popup.classList.add(popupClass, "content", "scrollblock");
		hide ? popup.classList.add(`hidden-${hide}`) : "";

		btn.classList.add("btn", "btn_close", `${popupCloseClass}`);
		btn.ariaLabel = "Закрыть";

		popup.appendChild(btn);
		document.body.appendChild(popup);
		return popup;
	};

	let closePopup = (popup) => {
		let popupBtn = document.querySelector(`.${popupShowClass}.${isActiveClass}`);
		if (popupBtn) popupBtn.classList.remove(isActiveClass);
		popup.classList.remove(isActiveClass);
	};

	let fetchByUrl = async (url, origin) => {
		if (!url) return;

		let hide;
		hide = origin.dataset.hide;

		try {
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}
			let result = await response.json();
			if (result.status === true) {
				if (result.nocache === true) {
					setPopupContent(result.content, hide);
				} else {
					const key = getRandomStr(8);
					setPopupContent(result.content, hide, origin, key);
				}
			} else {
				console.error(`Error: ${JSON.stringify(result)}`);
			}
		} catch (e) {
			console.error(e);
			return;
		}
	};

	let setPopupContent = (content, hide = false, origin = false, key = false) => {
		const popupWrapper = createPopup(hide);

		popupWrapper.insertAdjacentHTML("beforeend", content);
		// popupWrapper.append(content);

		setTimeout(() => {
			popupWrapper.classList.add(isActiveClass);
		}, 10);

		if (origin && key) {
			origin.dataset.storageKey = key;
			localStorage.setItem(key, content);
		}
	};

	document.addEventListener("click", (e) => {
		const popupExist = document.querySelector(`.${popupClass}`),
			popupShow = e.target.closest(`.${popupShowClass}`),
			popupClose = e.target.closest(`.${popupCloseClass}`);

		if (popupShow) {
			e.preventDefault();

			if (popupShow.classList.contains(isActiveClass) && popupExist) {
				closePopup(popupExist);
				return;
			}

			if (!popupShow.classList.contains(isActiveClass) && popupExist) {
				closePopup(popupExist);
			}

			let content, hide, target, url, storageKey;

			hide = popupShow.dataset.hide;
			target = popupShow.dataset.target;
			url = popupShow.dataset.url;
			storageKey = popupShow.dataset.storageKey;
			popupShow.classList.add(isActiveClass);

			// from storage
			if (storageKey) {
				content = localStorage.getItem(storageKey);
				if (content) {
					setPopupContent(content, hide);
					return;
				}
			}

			// fetch to popup
			if (url) {
				fetchByUrl(url, popupShow);
				return;
			}

			// clone target to popup
			if (target) {
				content = popupShow.parentElement.querySelector(`.${target}`).cloneNode(true).outerHTML;
				// content.removeAttribute("class");
			}

			// just clone self to popup
			if (!target && !url) {
				content = popupShow.cloneNode(true).outerHTML;
				// content.removeAttribute("class");
			}

			// set content
			if (content) {
				setPopupContent(content, hide);
				return;
			}
		}

		if (popupExist) {
			if (popupExist.classList.contains(isActiveClass) && (!popupExist.contains(e.target) || popupClose)) {
				closePopup(popupExist);
				return;
			}
		}
	});
}

function sectionClose() {
	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-close"),
			isActiveClass = "is-active";
		if (!el) return;
		const target = el.closest(`.${isActiveClass}`);
		if (target) {
			overlay(0);
			resetTopOffset();
			target.classList.remove(isActiveClass);
		}
	});
}

function collapseHandler() {
	const isCollapsedClass = "is-collapsed";

	let collapseSection = (trigger) => {
		const section = trigger.nextElementSibling,
			sectionH = section.scrollHeight,
			elTransition = section.style.transition;
		section.style.transition = "";
		requestAnimationFrame(function () {
			section.style.height = sectionH + "px";
			section.style.transition = elTransition;
			requestAnimationFrame(function () {
				section.style.height = 0 + "px";
				trigger.classList.add(isCollapsedClass);
			});
		});
	};

	let expandSection = (trigger) => {
		const section = trigger.nextElementSibling,
			sectionH = section.scrollHeight;
		section.style.height = sectionH + "px";
		trigger.classList.remove(isCollapsedClass);
	};

	document.addEventListener("click", (e) => {
		const trigger = e.target.closest(".js-collapse");
		if (!trigger) return;

		const isCollapsed = trigger.classList.contains(isCollapsedClass);

		if (isCollapsed) {
			expandSection(trigger);
		} else {
			collapseSection(trigger);
		}
	});
}

function collapseTargetHandler() {
	const isCollapsedClass = "is-collapsed",
		targetCollapseClass = "is-collapsible";

	let toggleTarget = (trigger) => {
		const parent = trigger.dataset.parent,
			section = trigger.closest(`.${parent}`).querySelector(`.${targetCollapseClass}`),
			sectionH = section.scrollHeight;

		if (section.classList.contains(isCollapsedClass)) {
			section.style.height = sectionH + "px";
			section.classList.remove(isCollapsedClass);
			trigger.setAttribute("aria-expanded", true);
		} else {
			section.style.height = 0;
			section.classList.add(isCollapsedClass);
			trigger.setAttribute("aria-expanded", false);
		}
	};

	document.addEventListener("click", (e) => {
		const trigger = e.target.closest(".js-target-collapse");
		if (!trigger) return;
		toggleTarget(trigger);
	});
}

function searchForm() {
	const navMenu = document.querySelector(".nav__menu"),
		menuToggler = document.getElementById("menu-toggle"),
		searchForm = document.querySelector(".nav__search"),
		searchInput = document.querySelector(".input_nav-search"),
		closeSearchBtn = document.querySelector(".js-close-search"),
		isActiveClass = "is-active",
		hideNavClass = "hide-nav";

	searchInput.addEventListener("focus", () => {
		searchForm.classList.add(isActiveClass);

		if (menuToggler.checked) {
			navMenu.classList.add(hideNavClass);
		}
	});

	closeSearchBtn.addEventListener("click", () => {
		searchForm.classList.remove(isActiveClass);
		navMenu.classList.remove(hideNavClass);
	});

	document.addEventListener("click", (e) => {
		if (!searchForm.contains(e.target)) {
			if (!menuToggler.checked) {
				searchForm.classList.remove(isActiveClass);
			}
		}
	});
}

function inputFetch() {
	const writeClass = "js-write",
		isActiveClass = "is-active",
		queryWrapperClass = "js-query-wrapper",
		queryResultClass = "js-query-result",
		minQueryLen = 2;

	let fetchByQuery = async (input) => {
		let url = input.dataset.url,
			query = { [input.name]: input.value },
			onFocus = input.dataset.onFocus,
			wrapper = input.closest(`.${queryWrapperClass}`),
			results = wrapper.querySelector(`.${queryResultClass}`);

		if (!url) return;

		let amp = url.includes("?") ? "&" : "?",
			queryStr = amp + new URLSearchParams(query).toString();

		url += queryStr;

		if (input.value.length >= minQueryLen || (onFocus && input.value.length == 0)) {
			try {
				let response = await fetch(url);
				if (!response.ok) {
					return;
				}
				let result = await response.json();
				if (result.status === true) {
					if (result.chunks) updateChunks(result.chunks);
					results.innerHTML = result.content;
					wrapper.classList.add(isActiveClass);
				} else {
					console.error(`Error: ${JSON.stringify(result)}`);
				}
			} catch (e) {
				console.error(e);
				return;
			}
		}
	};

	["focus", "input"].forEach((evt) =>
		document.addEventListener(
			evt,
			(e) => {
				if (e.target.dataset.query == "true") {
					fetchByQuery(e.target);
				}
			},
			true
		)
	);

	document.addEventListener("click", (e) => {
		if (!e.target.closest(`.${queryWrapperClass}.${isActiveClass}`)) {
			let wrapper = document.querySelector(`.${queryWrapperClass}.${isActiveClass}`);
			if (wrapper) {
				wrapper.classList.remove(isActiveClass);
			}
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target.classList.contains(writeClass)) {
			let wrapper = document.querySelector(`.${queryWrapperClass}.${isActiveClass}`);
			wrapper.querySelector("input").value = e.target.innerText;

			if (e.target.dataset.value.length > 0 && e.target.dataset.target.length > 0) {
				let target = document.querySelectorAll(`input[name="${e.target.dataset.target}"]`);
				target.forEach((t) => {
					t.value = e.target.dataset.value;
				});
			}

			let customEvent = new Event("queryResult", { bubbles: true });
			wrapper.querySelector("input").dispatchEvent(customEvent);
			wrapper.classList.remove(isActiveClass);
		}
	});
}

function inputQuickSearch(el = false) {
	const inputs = el ? el.querySelectorAll("[data-quick-search='true']") : document.querySelectorAll("[data-quick-search='true']");

	let quickSearch = (input) => {
		let target = input.dataset.target,
			filter = input.value.toUpperCase(),
			area = document.querySelector(`.${target}`),
			items = area.querySelectorAll("a", "span"),
			text = "";

		if (!area) return;

		if (items.length) {
			for (let i = 0; i < items.length; i++) {
				text = items[i].textContent || items[i].innerText;
				if (text.toUpperCase().indexOf(filter) > -1) {
					items[i].style.display = "";
				} else {
					items[i].style.display = "none";
				}
			}
		}
	};

	inputs.forEach((input) => {
		["input"].forEach((evt) =>
			input.addEventListener(evt, () => {
				quickSearch(input);
			})
		);
	});
}

function accordion() {
	const triggers = document.querySelectorAll(".js-accordion__trigger"),
		isOpenedClass = "is-opened",
		isEnabledClass = "on";
	triggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const accordionParent = trigger.parentElement,
				accordionContent = trigger.nextElementSibling;
			if (accordionParent.classList.contains(isEnabledClass)) {
				trigger.classList.toggle(isOpenedClass);
				if (accordionContent.style.maxHeight) {
					accordionContent.style.maxHeight = null;
				} else {
					accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
				}
			}
		});
	});
}

function accordionFooter() {
	const accordionFooter = document.querySelectorAll(".f-menu.js-accordion"),
		isEnabledClass = "on";

	let accordionBuildFooter = () => {
		accordionFooter.forEach((el) => {
			el.classList.add(isEnabledClass);
		});
	};

	let accordionDestroyFooter = () => {
		accordionFooter.forEach((el) => {
			el.classList.remove(isEnabledClass);
		});
	};

	let timeout;

	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			if (!timeout) {
				timeout = setTimeout(function () {
					// Reset timeout
					timeout = null;
					const media = mediaMatch("767");
					media ? accordionBuildFooter() : accordionDestroyFooter();
				}, 200);
			}
		})
	);
}

function dropdownShow() {
	const dds = document.querySelectorAll(".js-drop-down"),
		isActiveClass = "is-active";
	dds.forEach((dd) => {
		dd.addEventListener("click", (e) => {
			e.stopPropagation();
			dd.classList.toggle(isActiveClass);
		});
	});
}

function dropdownClose() {
	window.addEventListener("click", (e) => {
		const dds = document.querySelectorAll(".drop-down__box"),
			isActiveClass = "is-active";
		dds.forEach((dd) => {
			if (!dd.contains(e.target)) {
				dd.parentNode.classList.remove(isActiveClass);
			}
		});
	});
}

function contentGalleryPopup() {
	const isActiveClass = "is-active",
		targetCommonClass = "popup-gallery";

	document.addEventListener("click", (e) => {
		let el = e.target.closest(".js-popup-gallery"),
			body = document.body,
			headerAlert = document.querySelector(".header-alert"),
			header = document.querySelector(".header"),
			containers = document.querySelectorAll(".container"),
			offsetTop = header.getBoundingClientRect().height,
			scrollY = window.scrollY,
			sw = getScrollbarWidth(),
			media = mediaMatch("1023");

		if (headerAlert) offsetTop += headerAlert.getBoundingClientRect().height;

		if (!el || media) return;

		let showGallery = (target) => {
			body.style.top = `-${scrollY}px`;
			body.classList.add("noscroll");
			// header.style.top = `${scrollY}px`;
			header.classList.remove("is-hidden");
			containers.forEach((c) => {
				c.style.paddingRight = `${sw}px`;
			});
			target.classList.add(isActiveClass);
			target.style.top = `${offsetTop}px`;
		};

		const targetClass = el.dataset.target,
			url = el.dataset.url;

		// загрузить по урлу
		if (targetClass && url) {
			const targetExists = document.querySelector(`.${targetClass}`);

			// если такой элемент ещё не создан — создать
			if (!targetExists) {
				const target = document.createElement("div");
				target.classList.add(targetCommonClass, targetClass);
				body.append(target);

				(async () => {
					try {
						let response = await fetch(url);
						if (!response.ok) {
							return;
						}
						let result = await response.text();
						target.innerHTML = result;
						carouselsInit();
						showGallery(target);
					} catch (e) {
						console.error(e);
						return;
					}
				})();
			} else {
				showGallery(targetExists);
			}
		} else if (targetClass && !url) {
			const target = document.querySelector(`.${targetClass}`);
			showGallery(target);
		}
	});

	window.addEventListener("resize", () => {
		const activeGallery = document.querySelector(`.${targetCommonClass}.${isActiveClass}`);
		if (!activeGallery) return;

		activeGallery.classList.remove(isActiveClass);
		document.body.classList.remove("noscroll");

		const containers = document.querySelectorAll(".container");
		containers.forEach((c) => {
			c.style.paddingRight = "";
		});

		resetTopOffset();
	});
}

function changeAmount() {
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("js-btn-minus")) {
			let inputNumber = e.target.nextElementSibling;
			if (inputNumber.getAttribute("min") == inputNumber.value) return;
			inputNumber.stepDown();

			let change = new Event("change", { bubbles: true });
			inputNumber.dispatchEvent(change);
		}

		if (e.target.classList.contains("js-btn-plus")) {
			let inputNumber = e.target.previousElementSibling;
			if (inputNumber.getAttribute("max") == inputNumber.value) return;
			inputNumber.stepUp();

			let change = new Event("change", { bubbles: true });
			inputNumber.dispatchEvent(change);
		}
	});
}

function getContent() {
	let fetchByUrl = async (el) => {
		const url = el.dataset.url,
			loader =  false || document.querySelector(`.${el.dataset.loader}`);
		if (!url) return;

		try {
			fetchLoader([loader], "start");
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}

			let result = await response.json();
			if (result.status === true) {
				if (result.chunks) updateChunks(result.chunks);
				if (result.modal == "close") document.querySelector(".js-modal-close").click();
			} else {
				console.error(`Error: ${JSON.stringify(result)}`);
			}
			fetchLoader([loader], "stop");
		} catch (e) {
			console.error(e);
			return;
		}
	};

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-get");
		if (!el) return;
		fetchByUrl(el);
	});
}

function clickAndDrag() {
	document.addEventListener("mousedown", (e) => {
		const scroll_speed = 1,
			draggableClass = "js-draggable",
			draggingClass = "js-dragging", // flag for other functions
			el = e.target.closest(`.${draggableClass}`);

		if (!el) return;

		let isDown = false,
			startX,
			scrollLeft;

		e.preventDefault();

		isDown = true;
		startX = e.pageX - el.offsetLeft;
		scrollLeft = el.scrollLeft;

		// prevent default child behavior
		document.addEventListener("click", function (e) {
			if (el.contains(e.target)) {
				e.preventDefault();
			}
		});

		el.addEventListener("mouseleave", () => {
			isDown = false;
		});

		el.addEventListener("mouseup", () => {
			isDown = false;

			// remove the dragging class after a short delay to prevent other click events
			setTimeout(() => {
				el.classList.remove(draggingClass);
			}, 250);
		});

		el.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - el.offsetLeft,
				walk = (x - startX) * scroll_speed; // scroll fast
			el.scrollLeft = scrollLeft - walk;

			if (scrollLeft !== el.scrollLeft) {
				el.classList.add(draggingClass);
			}
		});
	});
}

// EXTERNAL MODULE: ./node_modules/vanilla-text-mask/dist/vanillaTextMask.js
var vanillaTextMask = __webpack_require__(213);
;// CONCATENATED MODULE: ./src/js/modules/form-submit.js


function submitPrevent() {
	document.addEventListener("keydown", (e) => {
		if (e.target.dataset.submit == "false") {
			if (e.key == "Enter") {
				e.preventDefault();
			}
		}
	});
}

function maskHandler() {
	const errorClass = "is-error",
		charPhone = "_";

	let setMask = (el, pattern, char) => {
		(0,vanillaTextMask.maskInput)({
			inputElement: el,
			mask: pattern,
			showMask: true,
			keepCharPositions: true,
			placeholderChar: char,
		});
	};

	["focusin", "click"].forEach((evt) =>
		document.addEventListener(evt, (e) => {
			if (e.target.dataset.patternType == "phone") {
				let target = e.target,
					index = 0;
				for (let i = 0; i < target.value.length; i++) {
					if (target.value[i] == charPhone) break;
					index = i + 1;
				}
				target.setSelectionRange(index, index);
			}
		})
	);

	document.addEventListener("focusin", (e) => {
		if (e.target.dataset.patternType == "phone") {
			let el = e.target,
				pattern = ["+", "7", " ", "(", /[9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
			setMask(el, pattern, charPhone);
		}
	});

	document.addEventListener("focusout", (e) => {
		if (e.target.dataset.patternType == "phone") {
			let target = e.target,
				length = target.value.replace(/\D/g, "").length;

			target.classList.remove(errorClass);

			if (length == 1) {
				target.value = "";
				return;
			}

			if (length < 11) {
				target.classList.add(errorClass);
			}
		}
	});

	document.addEventListener("keyup", (e) => {
		if (e.target.dataset.patternType == "phone") {
			let target = e.target,
				length = target.value.replace(/\D/g, "").length;

			if (length == 11) {
				target.classList.remove(errorClass);
			}
		}
	});
}

/* https://medium.com/@damirpristav/form-validation-with-vanilla-js-using-data-attributes-on-form-elements-78ccf2c1cf34 */

let form_submit_globalForm = {};
form_submit_globalForm = {
	validation: function () {
		const forms = document.querySelectorAll("form");

		if (forms.length > 0) {
			for (let form of forms) {
				const inputs = form.querySelectorAll("[data-required]");
				form.setAttribute("novalidate", "");
				form.addEventListener("submit", submitForm.bind(form, inputs));

				inputs.forEach((input) => {
					if (input.type === "email" || input.type === "tel") {
						input.addEventListener("focusout", inputFocus);
					} else {
						input.addEventListener("input", inputChange);
					}
				});
			}
		}
	},
};


// export function validation() {
// 	const forms = document.querySelectorAll("form");

// 	if (forms.length > 0) {
// 		for (let form of forms) {
// 			const inputs = form.querySelectorAll("[data-required]");
// 			form.addEventListener("submit", submitForm.bind(form, inputs));

// 			inputs.forEach((input) => {
// 				input.addEventListener("input", inputChange);
// 			});
// 		}
// 	}
// }

function inputChange() {
	const input = this;
	validateInput(input);
}

function inputFocus() {
	const input = this;
	validateInputFocus(input);
}

function validateInput(input) {
	// Get the value and error element
	const value = input.value,
		// errorEl = input.closest("[data-formgroup]").querySelector("[data-formerror]"),
		errorClass = "is-error",
		defaultRequiredMessage = "Поле обязательно для заполнения",
		defaultEmailMessage = "Некорректный формат email",
		defaultTelMessage = "Некорректный формат телефона";

	// Declare error variable and assign null by default
	let error = null;
	// Check in input has data-required attribute and if the value is empty, and if the input is not radio or checkbox
	if ((input.type !== "radio" || input.type !== "checkbox") && input.dataset.required !== undefined && value === "") {
		error = input.dataset.requiredMessage ? input.dataset.requiredMessage : defaultRequiredMessage;
		input.classList.add(errorClass);
	}
	// Check if input is checkbox and it is not checked
	if (input.type === "checkbox" && !input.checked) {
		error = input.dataset.errorMessage ? input.dataset.errorMessage : defaultRequiredMessage;
		input.classList.add(errorClass);
	}
	/*
	// Check if input is radio
	if (input.type === "radio") {
		// Get all radio inputs in a group
		const radios = input.closest("[data-formgroup]").querySelectorAll('input[type="radio"]');
		let isChecked = false;
		let errorMsg = "";
		// Loop through radios and check if any radio is checked and if it is checked set isChecked to true
		radios.forEach((radio) => {
			if (radio.checked) {
				isChecked = true;
			}
			if (radio.dataset.errorMessage) {
				errorMsg = input.dataset.errorMessage;
			}
		});
		if (!isChecked) {
			error = errorMsg !== "" ? errorMsg : defaultRequiredMessage;
		}
	}
	// Check if input has data-minlength attribute and if value length is smaller than this attribute, if so show the error
	if (!error && input.dataset.minlength !== undefined && value.length < +input.dataset.minlength) {
		error = input.dataset.minlengthMessage ? input.dataset.minlengthMessage : `Please enter at least ${input.dataset.minlength} characters`;
		input.classList.add(errorClass);
	}
	// Check if input has data-maxlength attribute and if value length is greater than this attribute, if so show the error
	if (!error && input.dataset.maxlength !== undefined && value.length > +input.dataset.maxlength) {
		error = input.dataset.maxlengthMessage ? input.dataset.maxlengthMessage : `Only ${input.dataset.maxlength} characters allowed`;
		input.classList.add(errorClass);
	}
	*/
	// Check if input has data-email attribute and if email is not valid
	// if (!error && input.dataset.email !== undefined && !validateEmail(value)) {
	if (!error && input.type === "email" && !validateEmail(value)) {
		error = input.dataset.emailMessage ? input.dataset.emailMessage : defaultEmailMessage;
		input.classList.add(errorClass);
	}
	/*
	// Check if input has data-match attribute and if value is not equal to the value of the element with name attribute equal to this data-match attribute
	if (!error && input.dataset.match !== undefined && value !== input.closest("[data-form]").querySelector(`[name="${input.dataset.match}"]`).value) {
		error = input.dataset.matchMessage ? input.dataset.matchMessage : "Fields are not the same";
		input.classList.add(errorClass);
	}
	// Check if input has data-match-with attribute
	if (input.dataset.matchWith !== undefined) {
		// Get the input that has a name attribute equal to value of data-match-with attribute
		const inputToMatch = input.closest("[data-form]").querySelector(`[name="${input.dataset.matchWith}"]`);
		// Get the error element of that input
		const inputToMatchError = inputToMatch.closest("[data-formgroup]").querySelector("[data-formerror]");
		// If values are equal remove error class from input and hide error element
		if (value === inputToMatch.value) {
			inputToMatch.classList.remove(errorClass);
			inputToMatchError.style.display = "none";
		} else {
			// Add error class to input and show error element
			inputToMatch.classList.add(errorClass);
			inputToMatchError.style.display = "block";
			inputToMatchError.innerText = inputToMatch.dataset.matchMessage || "Fields are not the same";
		}
	}
	// Check if input is file input and if has data-maxfilesize attribute and if file size is greater than the value of this data-maxfilesize attribute
	if (!error && input.type === "file" && input.dataset.maxfilesize !== undefined && input.files[0].size > +input.dataset.maxfilesize * 1024) {
		error = input.dataset.maxfilesizeMessage ? input.dataset.maxfilesizeMessage : "File is too large";
		input.classList.add(errorClass);
	}
	// Check if input is file input and if it has data-allowed-types attribute and if file type is not equal to one of the values in data-allowed-type attribute
	if (!error && input.type === "file" && input.dataset.allowedTypes !== undefined && !input.dataset.allowedTypes.includes(input.files[0].type.split("/")[1])) {
		error = input.dataset.allowedTypesMessage ? input.dataset.allowedTypesMessage : "Invalid file type";
		input.classList.add(errorClass);
	}
	*/

	// Проверка длины номера телефона
	if (!error && input.type === "tel" && value.replace(/\D/g, "").length < 11) {
		error = input.dataset.telMessage ? input.dataset.telMessage : defaultTelMessage;
		input.classList.add(errorClass);
	}

	// If there is no error remove error class from the input, remove message from error element and hide it
	if (!error) {
		input.classList.remove(errorClass);
		// errorEl.innerText = "";
		// errorEl.style.display = "none";
	} else {
		// If there is error set error message and show error element
		// errorEl.innerText = error;
		// errorEl.style.display = "block";
	}
	return error;
}

function validateInputFocus(input) {
	// для более красивого поведения полей email и tel: ошибки нет при снятии фокуса с пустого поля, а также в процессе ввода
	// проверка корректности поля пройдёт при попытке отправки формы (будет вызван обычный validateInput)
	const value = input.value,
		errorClass = "is-error",
		defaultEmailMessage = "Некорректный формат email",
		defaultTelMessage = "Некорректный формат телефона";

	let error = null;

	if (!error && input.type === "email" && !validateEmail(value)) {
		if (value !== "") {
			error = input.dataset.emailMessage ? input.dataset.emailMessage : defaultEmailMessage;
			input.classList.add(errorClass);
		}
	}

	// Проверка длины номера телефона
	if (!error && input.type === "tel" && value.replace(/\D/g, "").length < 11) {
		error = input.dataset.telMessage ? input.dataset.telMessage : defaultTelMessage;
		input.classList.add(errorClass);
	}

	if (!error) {
		input.classList.remove(errorClass);
	}
	return error;
}

function submitForm(inputs, e) {
	e.preventDefault();
	const errors = [],
		errorsClass = "has-errors";

	inputs.forEach((input) => {
		const error = validateInput(input);
		if (error) {
			errors.push(error);
		}
	});

	if (errors.length === 0) {
		e.target.classList.remove(errorsClass);
		if (e.target.dataset.fetch !== "true") {
			e.target.submit();
		}
	} else {
		e.target.classList.add(errorsClass);
	}
}

// Validate email
function validateEmail(email) {
	let re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

;// CONCATENATED MODULE: ./src/js/modules/common-cookies.js
/**
 * Cookie policy
 * @link https://learn.javascript.ru/cookie
 */
function getCookie(name) {
	let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days = 1) {
	let expires;

	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}

	let options = {
		path: "/",
		expires: expires,
		// defaults
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	setCookie(name, "", {
		"max-age": -1,
	});
}

const cookieForm = document.querySelector(".cookie"),
	cookieAccept = document.querySelector(".js-cookie__accept");

if (cookieForm && cookieAccept) {
	let policyCheck = () => {
		if (!getCookie("policyAccepted")) {
			cookieForm.classList.remove("hidden");
		}
	};

	let policyAccepted = (e) => {
		e.preventDefault();
		setCookie("policyAccepted", "1", 7);
		cookieForm.classList.add("hidden");
	};

	cookieAccept.addEventListener("click", policyAccepted);
	window.addEventListener("load", policyCheck);
}

const headerAlert = document.querySelector(".header-alert"),
	closeAlert = document.querySelector(".js-close-header-alert");

if (headerAlert && closeAlert) {
	let alertCheck = () => {
		if (!getCookie("alertHidden")) {
			headerAlert.classList.remove("hidden");
		}
	};

	let alertHide = (e) => {
		e.preventDefault();
		setCookie("alertHidden", "1", 1);
		headerAlert.classList.add("hidden");
	};

	closeAlert.addEventListener("click", alertHide);
	window.addEventListener("load", alertCheck);
}

;// CONCATENATED MODULE: ./src/js/common.js









addEventListener("DOMContentLoaded", () => {
	isTouchDevice();
	showHidden();
	setActive();
	catalogItemGalleriesInit();
	catalogItemGalleryHandler();
	useDynamicAdapt();
	setFavourites();
	loadMore();
	selectsInit();
	fileInputInit();
	tagsCollapseHandler();

	stickyHeader();
	hamburgerMenu();
	modalHandler();
	edgePopupHandler();
	sectionClose();
	collapseHandler();
	collapseTargetHandler();
	searchForm();
	inputFetch();
	inputQuickSearch();
	accordion();
	accordionFooter();
	dropdownShow();
	dropdownClose();
	contentGalleryPopup();
	changeAmount();
	getContent();
	clickAndDrag();

	submitPrevent();
	maskHandler();

	Object.assign(window, { globalForm: form_submit_globalForm });
	form_submit_globalForm.validation();
});

})();

/******/ })()
;