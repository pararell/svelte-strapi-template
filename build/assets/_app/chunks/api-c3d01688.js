import{Z as f}from"./vendor-d1c45db0.js";const l="http://strapi.smrtic.eu",j=["text","password","tel","email"],m=f(),h=m.get("token"),y=l,d=async({method:t,path:e,params:o,data:c,token:a})=>{const s={method:t,headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json",Cache:"no-cache"}};c&&(s.body=JSON.stringify(c)),a?s.headers.Authorization=`Bearer ${a}`:h&&(s.headers.Authorization=`Bearer ${h}`);const i=new URL(`${y}/${e}`);o&&Object.keys(o).forEach(r=>i.searchParams.append(r,o[r]));const u=i.toString(),p=await fetch(u,s),n=await p.text();if(!p.ok)throw n;try{return JSON.parse(n)}catch{return n}},w=(t,e,o)=>d({method:"GET",path:t,params:e,token:o}),A=(t,e)=>d({method:"POST",path:t,data:e});export{l as A,w as g,j as i,A as p};
