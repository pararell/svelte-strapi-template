import{p as i}from"./api-22c92218.js";import{a2 as p,a3 as t}from"./vendor-ecfff0c6.js";const n=p(),a=new t(null),x=new t(null),d=new t([]),k=new t([]),c=new t(!1),y=new t(!1),l=new t(!1),f=new t(null),S=async(s,e)=>{u();try{await i(s,e)&&o()}catch(r){o(JSON.parse(r).errors)}},h=()=>{const s=n.get("user"),e=n.get("token");return s&&e&&(a.next(s),c.next(e)),!0},J=async s=>{u();try{const e=await i("auth/local",s);e&&(n.set("user",JSON.stringify(e.user)),n.set("token",JSON.stringify(e.jwt)),a.next(e.user),c.next(e.token),o())}catch(e){o(JSON.parse(e).errors)}},N=async s=>{u();try{const e=await i("auth/local/register",s);e&&(n.set("user",JSON.stringify(e.user)),n.set("token",JSON.stringify(e.jwt)),a.next(e.user),c.next(e.token),o())}catch(e){o(JSON.parse(e).errors)}},O=()=>{n.remove("token"),n.remove("user"),a.next(null),c.next(null)},u=()=>{l.next(!0),f.next(null)},o=(s=null)=>{const e=s?Array.isArray(s)?s.reduce((r,g)=>r+", "+g.msg,""):s.msg:null;f.next(e),l.next(!1)};export{k as a,h as b,x as c,y as d,l as e,f,J as g,S as h,O as l,d as p,N as r,a as u};