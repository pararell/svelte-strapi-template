import{S as a,i as s,s as t,e,t as n,k as l,j as o,c as r,a as c,g as i,d as g,n as h,m,b as p,f as u,F as f,o as d,h as v,a0 as b,x as $,u as x,v as w,Z as D,w as T,r as j}from"../../chunks/vendor-5e6fc18f.js";import{g as k}from"../../chunks/api-9553b917.js";import{C as E}from"../../chunks/Comments-297b3e2a.js";import"../../chunks/store-5f8546e9.js";function C(a){let s,t,D,T,j,k,C,L,S,H,q=a[0].Title+"",z=b(a[0].Content)+"",I=new Date(a[0].created_at).toLocaleDateString()+"";return S=new E({props:{host:a[1].host,slug:a[1].params.blog}}),{c(){s=e("h1"),t=n(q),D=l(),T=e("div"),j=l(),k=e("span"),C=n(I),L=l(),o(S.$$.fragment),this.h()},l(a){s=r(a,"H1",{class:!0});var e=c(s);t=i(e,q),e.forEach(g),D=h(a),T=r(a,"DIV",{class:!0}),c(T).forEach(g),j=h(a),k=r(a,"SPAN",{class:!0});var n=c(k);C=i(n,I),n.forEach(g),L=h(a),m(S.$$.fragment,a),this.h()},h(){p(s,"class","text-center text-4xl mt-8 pb-4"),p(T,"class","content svelte-wq3e5t"),p(k,"class","date svelte-wq3e5t")},m(a,e){u(a,s,e),f(s,t),u(a,D,e),u(a,T,e),T.innerHTML=z,u(a,j,e),u(a,k,e),f(k,C),u(a,L,e),d(S,a,e),H=!0},p(a,s){(!H||1&s)&&q!==(q=a[0].Title+"")&&v(t,q),(!H||1&s)&&z!==(z=b(a[0].Content)+"")&&(T.innerHTML=z),(!H||1&s)&&I!==(I=new Date(a[0].created_at).toLocaleDateString()+"")&&v(C,I);const e={};2&s&&(e.host=a[1].host),2&s&&(e.slug=a[1].params.blog),S.$set(e)},i(a){H||($(S.$$.fragment,a),H=!0)},o(a){x(S.$$.fragment,a),H=!1},d(a){a&&g(s),a&&g(D),a&&g(T),a&&g(j),a&&g(k),a&&g(L),w(S,a)}}}function L(a){var s;let t,n,o,i;document.title=t=null==(s=a[0])?void 0:s.Title;let m=a[0]&&C(a);return{c(){n=l(),o=e("div"),m&&m.c(),this.h()},l(a){D('[data-svelte="svelte-6m6uzz"]',document.head).forEach(g),n=h(a),o=r(a,"DIV",{class:!0});var s=c(o);m&&m.l(s),s.forEach(g),this.h()},h(){p(o,"class","container max-w-6xl")},m(a,s){u(a,n,s),u(a,o,s),m&&m.m(o,null),i=!0},p(a,[s]){var e;(!i||1&s)&&t!==(t=null==(e=a[0])?void 0:e.Title)&&(document.title=t),a[0]?m?(m.p(a,s),1&s&&$(m,1)):(m=C(a),m.c(),$(m,1),m.m(o,null)):m&&(j(),x(m,1,1,(()=>{m=null})),T())},i(a){i||($(m),i=!0)},o(a){x(m),i=!1},d(a){a&&g(n),a&&g(o),m&&m.d()}}}const S=async({page:a})=>{const s=await k(`blogs?slug=${a.params.blog}`);return s&&s.length?{props:{blog:s[0],page:a},maxage:0}:{props:{blog:null,page:a}}};function H(a,s,t){let{blog:e}=s,{page:n}=s;return a.$$set=a=>{"blog"in a&&t(0,e=a.blog),"page"in a&&t(1,n=a.page)},[e,n]}class q extends a{constructor(a){super(),s(this,a,H,L,t,{blog:0,page:1})}}export{q as default,S as load};