!function(e){function t(t){for(var r,i,l=t[0],u=t[1],c=t[2],s=0,p=[];s<l.length;s++)i=l[s],o[i]&&p.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(f&&f(t);p.length;)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,l=1;l<n.length;l++){var u=n[l];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var f=u;a.push([114,1]),n()}({114:function(e,t,n){"use strict";n.r(t),function(e){n(84);var r=n(50),o=n.n(r),a=n(82),i=n.n(a),l=n(83);console.log("fluro-vue 2.0.8");var u="fluro.user",c=localStorage,f={install:function(t,n){if(!n||!n.store)throw new Error("Please initialise fluro-vue with a Vuex store.");if(sessionStorage){var r=i.a.utils.guid();sessionStorage.setItem("window.id",r)}var a;if(c){var f=c.getItem(u);try{a=JSON.parse(f)}catch(e){c.removeItem(u)}}var s,p,d,m,v=n.store;v.registerModule("fluro",{namespaced:!0,state:{user:a,application:null,realmSelectFullScreen:!1},mutations:{updateField:l.updateField,user:function(e,t){e.user=t},application:function(e,t){e.application=t},realmSelectFullScreen:function(e,t){e.realmSelectFullScreen=t}},getters:{getField:l.getField,user:function(e,t){return e.user},application:function(e,t){return e.application},realmSelectFullScreen:function(e,t){return e.realmSelectFullScreen}}});var g=e.env.VUE_APP_FLURO_ENV;switch(g){case"local":s=e.env.VUE_APP_API_LOCAL;break;case"staging":s=e.env.VUE_APP_API_STAGING;break;default:s=e.env.VUE_APP_API_LIVE}var w=_.get(window,"applicationData"),h=_.get(w,"_application");if(h){switch(h.authenticationStyle){case"application":var b="http:";window&&window.location&&window.location.protocol&&(b=window.location.protocol),p=h.apikey,m=e.env.VUE_APP_REMOTE_URL||"".concat(b,"//").concat(h.domain)}"production"==g&&(s=h.apipath||s),d=h.timezone,setTimeout(function(){v.commit("fluro/application",h)})}else setTimeout(function(){v.commit("fluro/application",null)});var y=new i.a({apiURL:s,applicationToken:p,domain:m});function S(e,t){v.commit("fluro/user",e),t||function(e){if(c)if(e)try{c.setItem(u,o()(e))}catch(e){}else c.removeItem(u)}(e),y.stats.refresh()}d&&(y.date.defaultTimezone=d),y.access.setDefaultApplication(h),y.auth.addEventListener("change",S),y.auth.set(v.getters["fluro/user"]),window&&window.addEventListener("storage",function(e){if(e&&e.key!=u)return;if(c){var t=c.getItem(u);if(t)try{a=JSON.parse(t)}catch(t){a=null,c.removeItem(u),S(null,e)}finally{S(a,e)}else S(null,e)}}),t.filter("dateFromID",y.date.dateFromID),t.filter("formatDate",y.date.formatDate),t.filter("timeago",y.date.timeago),t.filter("readableEventDate",y.date.readableEventDate),t.filter("readableEventTime",y.date.readableEventTime),t.filter("filesize",y.asset.filesize),t.filter("comma",y.utils.comma),t.prototype.$fluro=y}};t.default=f}.call(this,n(115))},82:function(e,t){e.exports=fluro},83:function(e,t){e.exports=vuex-map-fields}});