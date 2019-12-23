!function(e){function t(t){for(var r,i,l=t[0],u=t[1],c=t[2],f=0,p=[];f<l.length;f++)i=l[f],a[i]&&p.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(s&&s(t);p.length;)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var u=n[l];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={0:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=this.webpackJsonp=this.webpackJsonp||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var s=u;o.push([114,1]),n()}({114:function(e,t,n){"use strict";n.r(t),function(e){n(84);var r,a,o=n(50),i=n.n(o),l=n(82),u=n.n(l),c=n(83);console.log("fluro-vue 2.0.41"),"undefined"!=typeof window&&(r=window),"undefined"!=typeof localStorage&&(a=localStorage);var s="fluro.user",f={install:function(t,n){if(console.log("Install Fluro Vue"),!n||!n.store)throw new Error("Please initialise fluro-vue with a Vuex store.");if(sessionStorage){var o=u.a.utils.guid();sessionStorage.setItem("window.id",o)}var l;if(a){var f=a.getItem(s);try{l=JSON.parse(f)}catch(e){a.removeItem(s)}}var p,d,m,v,g=n.store;g.registerModule("fluro",{namespaced:!0,state:{user:l,application:null,realmSelectFullScreen:!1},mutations:{updateField:c.updateField,user:function(e,t){e.user=t},application:function(e,t){e.application=t},realmSelectFullScreen:function(e,t){e.realmSelectFullScreen=t}},getters:{getField:c.getField,user:function(e,t){return e.user},application:function(e,t){return e.application},realmSelectFullScreen:function(e,t){return e.realmSelectFullScreen}}});var h=e.env.VUE_APP_FLURO_ENV;switch(h){case"local":p=e.env.VUE_APP_API_LOCAL,!0;break;case"staging":p=e.env.VUE_APP_API_STAGING,!0;break;default:p=e.env.VUE_APP_API_LIVE}var b,y=_.get(r,"applicationData"),E=_.get(y,"_application");if(E){switch(m=E.timezone,"production"==h&&(p=E.apipath||p),E.authenticationStyle){case"application":var S="http:";r&&r.location&&r.location.protocol&&(S=r.location.protocol),d=E.apikey,v=e.env.VUE_APP_REMOTE_URL||"".concat(S,"//").concat(E.domain);break;case"global":E.requireLogin&&(b=_.get(r,"applicationUser"))}setTimeout(function(){g.commit("fluro/application",E)})}else setTimeout(function(){g.commit("fluro/application",null)});var P=new u.a({apiURL:p,applicationToken:d,domain:v,withCredentials:b});m&&(P.date.defaultTimezone=m),P.access.setDefaultApplication(E),P.auth.addEventListener("change",A);var w=g.getters["fluro/user"];function A(e,t){g.commit("fluro/user",e),t||function(e){if(a)if(e)try{a.setItem(s,i()(e))}catch(e){}else a.removeItem(s)}(e),P.stats.refresh()}w?P.auth.set(w):b&&(console.log("-- Authenticated via cookie",b),P.auth.set(b)),r&&r.addEventListener("storage",function(e){if(e&&e.key!=s)return;if(a){var t=a.getItem(s);if(t)try{l=JSON.parse(t)}catch(t){l=null,a.removeItem(s),A(null,e)}finally{A(l,e)}else A(null,e)}}),t.filter("dateFromID",P.date.dateFromID),t.filter("formatDate",P.date.formatDate),t.filter("timeago",P.date.timeago),t.filter("readableEventDate",P.date.readableEventDate),t.filter("readableEventTime",P.date.readableEventTime),t.filter("filesize",P.asset.filesize),t.filter("comma",P.utils.comma),t.filter("definitionTitle",function(e,t,n){var r=P.types.readable(e,t);return r.length?r:n?P.types.readable(n,t):""}),t.set(P.global,"CACHE_KEY",Math.random()),P.addEventListener("cache.reset",function(){t.set(P.global,"CACHE_KEY",Math.random()),console.log("GLOBAL CACHE RESET",P.global.CACHE_KEY)}),t.prototype.$fluro=P}};t.default=f}.call(this,n(115))},82:function(e,t){e.exports=fluro},83:function(e,t){e.exports=vuex-map-fields}});