import{U as y,S as O,i as $,s as C,e as v,t as p,k as T,c as w,a as E,h as b,d as c,m as k,g as m,J as g,O as q,j as U,n as x,V as W}from"../../chunks/index-39dc649e.js";/* empty css                         */import{r as j}from"../../chunks/fetch-706ffe26.js";const A=()=>{const e=y("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session,updated:e.updated}},S=e=>{throw new Error(`Cannot ${e} session store before subscribing`)},_={subscribe(e){const s=A().session;return _.set=s.set,_.update=s.update,s.subscribe(e)},set:()=>S("set"),update:()=>S("update")};function B(e){let s,o,n=e[0].user.email+"",u,i,r,l,d,f;return{c(){s=v("h1"),o=p("Welcome "),u=p(n),i=T(),r=v("button"),l=p("Signout")},l(t){s=w(t,"H1",{});var a=E(s);o=b(a,"Welcome "),u=b(a,n),a.forEach(c),i=k(t),r=w(t,"BUTTON",{});var h=E(r);l=b(h,"Signout"),h.forEach(c)},m(t,a){m(t,s,a),g(s,o),g(s,u),m(t,i,a),m(t,r,a),g(r,l),d||(f=q(r,"click",e[1]),d=!0)},p(t,[a]){a&1&&n!==(n=t[0].user.email+"")&&U(u,n)},i:x,o:x,d(t){t&&c(s),t&&c(i),t&&c(r),d=!1,f()}}}const N=async({session:e})=>e.user.exists?{}:{status:301,redirect:"/ddtamn"};function D(e,s,o){let n;return W(e,_,i=>o(0,n=i)),[n,async()=>{await j("/ddtamn/auth","DELETE"),window.location.replace("/ddtamn")}]}class V extends O{constructor(s){super(),$(this,s,D,B,C,{})}}export{V as default,N as load};
