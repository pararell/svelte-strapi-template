import{S as t,i as n,s,Y as e,l as a,Z as o,f as c,d as l,k as r,e as u,_ as h,n as i,c as d,a as p,b as m,I as f}from"../chunks/vendor-262dbd3a.js";import{g}from"../chunks/api-459a3947.js";function v(t){let n,s;return{c(){n=new e,s=a(),this.h()},l(t){n=o(t),s=a(),this.h()},h(){n.a=s},m(e,a){n.m(t[0],e,a),c(e,s,a)},p(t,s){1&s&&n.p(t[0])},d(t){t&&l(s),t&&n.d()}}}function w(t){let n,s,e=t[0]&&v(t);return{c(){n=r(),s=u("div"),e&&e.c(),this.h()},l(t){h('[data-svelte="svelte-1anpopb"]',document.head).forEach(l),n=i(t),s=d(t,"DIV",{class:!0});var a=p(s);e&&e.l(a),a.forEach(l),this.h()},h(){document.title="Home",m(s,"class","w-full")},m(t,a){c(t,n,a),c(t,s,a),e&&e.m(s,null)},p(t,[n]){t[0]?e?e.p(t,n):(e=v(t),e.c(),e.m(s,null)):e&&(e.d(1),e=null)},i:f,o:f,d(t){t&&l(n),t&&l(s),e&&e.d()}}}const b=async({page:t})=>{const n=await g("contents?slug=home");if(n&&n.length){return{props:{content:n[0].content}}}return{props:{content:"Something went wrong"}}};function k(t,n,s){let{content:e=null}=n;return t.$$set=t=>{"content"in t&&s(0,e=t.content)},[e]}class j extends t{constructor(t){super(),n(this,t,k,w,s,{content:0})}}export{j as default,b as load};
