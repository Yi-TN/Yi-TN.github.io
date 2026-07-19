(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(()=>{function e(){if(typeof document>`u`)return{show(e){console.error(e)}};let e=document.createElement(`dialog`);e.close(),document.body.append(e);let t=document.createElement(`pre`);t.style.whiteSpace=`pre-wrap`,e.append(t);let n=document.createElement(`button`);return n.textContent=`OK`,n.onclick=()=>e.close(),e.append(n),{show(n){t.textContent=n,e.open||e.showModal(),console.error(n)}}}let t;return n=>{throw t||=e(),t.show(n),Error(n)}})();async function t(){navigator.gpu||e(`navigator.gpu is not defined - WebGPU is not available in this browser`);let t=await navigator.gpu.requestAdapter();t||e(`requestAdapter returned null - this renderer can't run on this system`);let n=[];t.features.has(`timestamp-query`)?n.push(`timestamp-query`):e(`timestamp-query is not supported`);let r=await t.requestDevice({requiredFeatures:n,requiredLimits:{maxBufferSize:t.limits.maxBufferSize,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize}});return r||e(`Unable to get a device for an unknown readson `),r.lost.then(t=>{e(`Device lost ("${t.reason}"):\n${t.message}`)}),r.addEventListener(`uncapturederror`,t=>{e(`Uncaptured error:\n${t.error.message}`)}),r}function n(e,t,n){let r=e.createShaderModule({label:t,code:n});return r.getCompilationInfo().then(e=>{e.messages.forEach(e=>{let n=`${t}:${e.lineNum}:${e.linePos}`,r=`[${e.type} ${n} - ${e.message}]`;e.type==`error`?console.error(r):e.type==`warning`?console.warn(r):console.info(r)})}),r}function r(e,t){let n=t.getContext(`webgpu`),r=navigator.gpu.getPreferredCanvasFormat();return n.configure({device:e,format:r,alphaMode:`premultiplied`}),console.log(`presentation format: ${r}`),{context:n,format:r}}function i(e,t,n){new ResizeObserver(t=>{t.forEach(t=>{let r=t.devicePixelContentBoxSize?.[0].inlineSize??t.contentBoxSize[0].inlineSize*devicePixelRatio,i=t.devicePixelContentBoxSize?.[0].blockSize??t.contentBoxSize[0].blockSize*devicePixelRatio,a=e.limits.maxTextureDimension2D,o=t.target;o.width=Math.max(1,Math.min(Math.floor(r),a)),o.height=Math.max(1,Math.min(Math.floor(i),a)),n?.()})}).observe(t)}function a(e,t){return class extends e{constructor(...e){super(...e),t(this)}}}var o=a(Array,e=>e.fill(0)),s=1e-6;function c(e){let t=s;return s=e,t}function l(e){return e*Math.PI/180}function u(e){return e*180/Math.PI}function d(e,t,n){return e+(t-e)*n}function f(e,t,n){let r=t-e;return Math.abs(t-e)<s?e:(n-e)/r}function p(e,t){return(e%t+t)%t}var m={__proto__:null,get EPSILON(){return s},degToRad:l,euclideanModulo:p,inverseLerp:f,lerp:d,radToDeg:u,setEpsilon:c};function h(e){function t(t=0,n=0){let r=new e(2);return t!==void 0&&(r[0]=t,n!==void 0&&(r[1]=n)),r}let n=t;function r(t,n,r){let i=r??new e(2);return i[0]=t,i[1]=n,i}function i(t,n){let r=n??new e(2);return r[0]=Math.ceil(t[0]),r[1]=Math.ceil(t[1]),r}function a(t,n){let r=n??new e(2);return r[0]=Math.floor(t[0]),r[1]=Math.floor(t[1]),r}function o(t,n){let r=n??new e(2);return r[0]=Math.round(t[0]),r[1]=Math.round(t[1]),r}function c(t,n=0,r=1,i){let a=i??new e(2);return a[0]=Math.min(r,Math.max(n,t[0])),a[1]=Math.min(r,Math.max(n,t[1])),a}function l(t,n,r){let i=r??new e(2);return i[0]=t[0]+n[0],i[1]=t[1]+n[1],i}function u(t,n,r,i){let a=i??new e(2);return a[0]=t[0]+n[0]*r,a[1]=t[1]+n[1]*r,a}function d(e,t){let n=e[0],r=e[1],i=t[0],a=t[1],o=Math.sqrt(n*n+r*r)*Math.sqrt(i*i+a*a),s=o&&E(e,t)/o;return Math.acos(s)}function f(t,n,r){let i=r??new e(2);return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i}let p=f;function m(e,t){return Math.abs(e[0]-t[0])<s&&Math.abs(e[1]-t[1])<s}function h(e,t){return e[0]===t[0]&&e[1]===t[1]}function g(t,n,r,i){let a=i??new e(2);return a[0]=t[0]+r*(n[0]-t[0]),a[1]=t[1]+r*(n[1]-t[1]),a}function _(t,n,r,i){let a=i??new e(2);return a[0]=t[0]+r[0]*(n[0]-t[0]),a[1]=t[1]+r[1]*(n[1]-t[1]),a}function v(t,n,r){let i=r??new e(2);return i[0]=Math.max(t[0],n[0]),i[1]=Math.max(t[1],n[1]),i}function y(t,n,r){let i=r??new e(2);return i[0]=Math.min(t[0],n[0]),i[1]=Math.min(t[1],n[1]),i}function b(t,n,r){let i=r??new e(2);return i[0]=t[0]*n,i[1]=t[1]*n,i}let x=b;function S(t,n,r){let i=r??new e(2);return i[0]=t[0]/n,i[1]=t[1]/n,i}function C(t,n){let r=n??new e(2);return r[0]=1/t[0],r[1]=1/t[1],r}let w=C;function T(t,n,r){let i=r??new e(3),a=t[0]*n[1]-t[1]*n[0];return i[0]=0,i[1]=0,i[2]=a,i}function E(e,t){return e[0]*t[0]+e[1]*t[1]}function D(e){let t=e[0],n=e[1];return Math.sqrt(t*t+n*n)}let O=D;function k(e){let t=e[0],n=e[1];return t*t+n*n}let A=k;function j(e,t){let n=e[0]-t[0],r=e[1]-t[1];return Math.sqrt(n*n+r*r)}let M=j;function N(e,t){let n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r}let P=N;function F(t,n){let r=n??new e(2),i=t[0],a=t[1],o=i*i+a*a,s=o>0?1/Math.sqrt(o):1;return r[0]=i*s,r[1]=a*s,r}function I(t,n){let r=n??new e(2);return r[0]=-t[0],r[1]=-t[1],r}function L(t,n){let r=n??new e(2);return r[0]=t[0],r[1]=t[1],r}let R=L;function z(t,n,r){let i=r??new e(2);return i[0]=t[0]*n[0],i[1]=t[1]*n[1],i}let B=z;function V(t,n,r){let i=r??new e(2);return i[0]=t[0]/n[0],i[1]=t[1]/n[1],i}let H=V;function U(t=1,n){let r=n??new e(2),i=Math.random()*2*Math.PI;return r[0]=Math.cos(i)*t,r[1]=Math.sin(i)*t,r}function W(t){let n=t??new e(2);return n[0]=0,n[1]=0,n}function G(t,n,r){let i=r??new e(2),a=t[0],o=t[1];return i[0]=a*n[0]+o*n[4]+n[12],i[1]=a*n[1]+o*n[5]+n[13],i}function K(t,n,r){let i=r??new e(2),a=t[0],o=t[1];return i[0]=n[0]*a+n[4]*o+n[8],i[1]=n[1]*a+n[5]*o+n[9],i}function q(t,n,r,i){let a=i??new e(2),o=t[0]-n[0],s=t[1]-n[1],c=Math.sin(r),l=Math.cos(r);return a[0]=o*l-s*c+n[0],a[1]=o*c+s*l+n[1],a}function J(t,n,r){let i=r??new e(2);return F(t,i),b(i,n,i)}function Y(t,n,r){let i=r??new e(2);return D(t)>n?J(t,n,i):L(t,i)}function ee(t,n,r){return g(t,n,.5,r??new e(2))}return{create:t,fromValues:n,set:r,ceil:i,floor:a,round:o,clamp:c,add:l,addScaled:u,angle:d,subtract:f,sub:p,equalsApproximately:m,equals:h,lerp:g,lerpV:_,max:v,min:y,mulScalar:b,scale:x,divScalar:S,inverse:C,invert:w,cross:T,dot:E,length:D,len:O,lengthSq:k,lenSq:A,distance:j,dist:M,distanceSq:N,distSq:P,normalize:F,negate:I,copy:L,clone:R,multiply:z,mul:B,divide:V,div:H,random:U,zero:W,transformMat4:G,transformMat3:K,rotate:q,setLength:J,truncate:Y,midpoint:ee}}var g=new Map;function _(e){let t=g.get(e);return t||(t=h(e),g.set(e,t)),t}function v(e){function t(t,n,r){let i=new e(3);return t!==void 0&&(i[0]=t,n!==void 0&&(i[1]=n,r!==void 0&&(i[2]=r))),i}let n=t;function r(t,n,r,i){let a=i??new e(3);return a[0]=t,a[1]=n,a[2]=r,a}function i(t,n){let r=n??new e(3);return r[0]=Math.ceil(t[0]),r[1]=Math.ceil(t[1]),r[2]=Math.ceil(t[2]),r}function a(t,n){let r=n??new e(3);return r[0]=Math.floor(t[0]),r[1]=Math.floor(t[1]),r[2]=Math.floor(t[2]),r}function o(t,n){let r=n??new e(3);return r[0]=Math.round(t[0]),r[1]=Math.round(t[1]),r[2]=Math.round(t[2]),r}function c(t,n=0,r=1,i){let a=i??new e(3);return a[0]=Math.min(r,Math.max(n,t[0])),a[1]=Math.min(r,Math.max(n,t[1])),a[2]=Math.min(r,Math.max(n,t[2])),a}function l(t,n,r){let i=r??new e(3);return i[0]=t[0]+n[0],i[1]=t[1]+n[1],i[2]=t[2]+n[2],i}function u(t,n,r,i){let a=i??new e(3);return a[0]=t[0]+n[0]*r,a[1]=t[1]+n[1]*r,a[2]=t[2]+n[2]*r,a}function d(e,t){let n=e[0],r=e[1],i=e[2],a=t[0],o=t[1],s=t[2],c=Math.sqrt(n*n+r*r+i*i)*Math.sqrt(a*a+o*o+s*s),l=c&&E(e,t)/c;return Math.acos(l)}function f(t,n,r){let i=r??new e(3);return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],i}let p=f;function m(e,t){return Math.abs(e[0]-t[0])<s&&Math.abs(e[1]-t[1])<s&&Math.abs(e[2]-t[2])<s}function h(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function g(t,n,r,i){let a=i??new e(3);return a[0]=t[0]+r*(n[0]-t[0]),a[1]=t[1]+r*(n[1]-t[1]),a[2]=t[2]+r*(n[2]-t[2]),a}function _(t,n,r,i){let a=i??new e(3);return a[0]=t[0]+r[0]*(n[0]-t[0]),a[1]=t[1]+r[1]*(n[1]-t[1]),a[2]=t[2]+r[2]*(n[2]-t[2]),a}function v(t,n,r){let i=r??new e(3);return i[0]=Math.max(t[0],n[0]),i[1]=Math.max(t[1],n[1]),i[2]=Math.max(t[2],n[2]),i}function y(t,n,r){let i=r??new e(3);return i[0]=Math.min(t[0],n[0]),i[1]=Math.min(t[1],n[1]),i[2]=Math.min(t[2],n[2]),i}function b(t,n,r){let i=r??new e(3);return i[0]=t[0]*n,i[1]=t[1]*n,i[2]=t[2]*n,i}let x=b;function S(t,n,r){let i=r??new e(3);return i[0]=t[0]/n,i[1]=t[1]/n,i[2]=t[2]/n,i}function C(t,n){let r=n??new e(3);return r[0]=1/t[0],r[1]=1/t[1],r[2]=1/t[2],r}let w=C;function T(t,n,r){let i=r??new e(3),a=t[2]*n[0]-t[0]*n[2],o=t[0]*n[1]-t[1]*n[0];return i[0]=t[1]*n[2]-t[2]*n[1],i[1]=a,i[2]=o,i}function E(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function D(e){let t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}let O=D;function k(e){let t=e[0],n=e[1],r=e[2];return t*t+n*n+r*r}let A=k;function j(e,t){let n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2];return Math.sqrt(n*n+r*r+i*i)}let M=j;function N(e,t){let n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2];return n*n+r*r+i*i}let P=N;function F(t,n){let r=n??new e(3),i=t[0],a=t[1],o=t[2],s=i*i+a*a+o*o,c=s>0?1/Math.sqrt(s):1;return r[0]=i*c,r[1]=a*c,r[2]=o*c,r}function I(t,n){let r=n??new e(3);return r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r}function L(t,n){let r=n??new e(3);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r}let R=L;function z(t,n,r){let i=r??new e(3);return i[0]=t[0]*n[0],i[1]=t[1]*n[1],i[2]=t[2]*n[2],i}let B=z;function V(t,n,r){let i=r??new e(3);return i[0]=t[0]/n[0],i[1]=t[1]/n[1],i[2]=t[2]/n[2],i}let H=V;function U(t=1,n){let r=n??new e(3),i=Math.random()*2*Math.PI,a=Math.random()*2-1,o=Math.sqrt(1-a*a)*t;return r[0]=Math.cos(i)*o,r[1]=Math.sin(i)*o,r[2]=a*t,r}function W(t){let n=t??new e(3);return n[0]=0,n[1]=0,n[2]=0,n}function G(t,n,r){let i=r??new e(3),a=t[0],o=t[1],s=t[2],c=n[3]*a+n[7]*o+n[11]*s+n[15]||1;return i[0]=(n[0]*a+n[4]*o+n[8]*s+n[12])/c,i[1]=(n[1]*a+n[5]*o+n[9]*s+n[13])/c,i[2]=(n[2]*a+n[6]*o+n[10]*s+n[14])/c,i}function K(t,n,r){let i=r??new e(3),a=t[0],o=t[1],s=t[2];return i[0]=a*n[0]+o*n[4]+s*n[8],i[1]=a*n[1]+o*n[5]+s*n[9],i[2]=a*n[2]+o*n[6]+s*n[10],i}function q(t,n,r){let i=r??new e(3),a=t[0],o=t[1],s=t[2];return i[0]=a*n[0]+o*n[4]+s*n[8],i[1]=a*n[1]+o*n[5]+s*n[9],i[2]=a*n[2]+o*n[6]+s*n[10],i}function J(t,n,r){let i=r??new e(3),a=n[0],o=n[1],s=n[2],c=n[3]*2,l=t[0],u=t[1],d=t[2],f=o*d-s*u,p=s*l-a*d,m=a*u-o*l;return i[0]=l+f*c+(o*m-s*p)*2,i[1]=u+p*c+(s*f-a*m)*2,i[2]=d+m*c+(a*p-o*f)*2,i}function Y(t,n){let r=n??new e(3);return r[0]=t[12],r[1]=t[13],r[2]=t[14],r}function ee(t,n,r){let i=r??new e(3),a=n*4;return i[0]=t[a+0],i[1]=t[a+1],i[2]=t[a+2],i}function te(t,n){let r=n??new e(3),i=t[0],a=t[1],o=t[2],s=t[4],c=t[5],l=t[6],u=t[8],d=t[9],f=t[10];return r[0]=Math.sqrt(i*i+a*a+o*o),r[1]=Math.sqrt(s*s+c*c+l*l),r[2]=Math.sqrt(u*u+d*d+f*f),r}function ne(t,n,r,i){let a=i??new e(3),o=[],s=[];return o[0]=t[0]-n[0],o[1]=t[1]-n[1],o[2]=t[2]-n[2],s[0]=o[0],s[1]=o[1]*Math.cos(r)-o[2]*Math.sin(r),s[2]=o[1]*Math.sin(r)+o[2]*Math.cos(r),a[0]=s[0]+n[0],a[1]=s[1]+n[1],a[2]=s[2]+n[2],a}function X(t,n,r,i){let a=i??new e(3),o=[],s=[];return o[0]=t[0]-n[0],o[1]=t[1]-n[1],o[2]=t[2]-n[2],s[0]=o[2]*Math.sin(r)+o[0]*Math.cos(r),s[1]=o[1],s[2]=o[2]*Math.cos(r)-o[0]*Math.sin(r),a[0]=s[0]+n[0],a[1]=s[1]+n[1],a[2]=s[2]+n[2],a}function re(t,n,r,i){let a=i??new e(3),o=[],s=[];return o[0]=t[0]-n[0],o[1]=t[1]-n[1],o[2]=t[2]-n[2],s[0]=o[0]*Math.cos(r)-o[1]*Math.sin(r),s[1]=o[0]*Math.sin(r)+o[1]*Math.cos(r),s[2]=o[2],a[0]=s[0]+n[0],a[1]=s[1]+n[1],a[2]=s[2]+n[2],a}function ie(t,n,r){let i=r??new e(3);return F(t,i),b(i,n,i)}function ae(t,n,r){let i=r??new e(3);return D(t)>n?ie(t,n,i):L(t,i)}function oe(t,n,r){return g(t,n,.5,r??new e(3))}return{create:t,fromValues:n,set:r,ceil:i,floor:a,round:o,clamp:c,add:l,addScaled:u,angle:d,subtract:f,sub:p,equalsApproximately:m,equals:h,lerp:g,lerpV:_,max:v,min:y,mulScalar:b,scale:x,divScalar:S,inverse:C,invert:w,cross:T,dot:E,length:D,len:O,lengthSq:k,lenSq:A,distance:j,dist:M,distanceSq:N,distSq:P,normalize:F,negate:I,copy:L,clone:R,multiply:z,mul:B,divide:V,div:H,random:U,zero:W,transformMat4:G,transformMat4Upper3x3:K,transformMat3:q,transformQuat:J,getTranslation:Y,getAxis:ee,getScaling:te,rotateX:ne,rotateY:X,rotateZ:re,setLength:ie,truncate:ae,midpoint:oe}}var y=new Map;function b(e){let t=y.get(e);return t||(t=v(e),y.set(e,t)),t}function x(e){let t=_(e),n=b(e);function r(t,n,r,i,a,o,s,c,l){let u=new e(12);return u[3]=0,u[7]=0,u[11]=0,t!==void 0&&(u[0]=t,n!==void 0&&(u[1]=n,r!==void 0&&(u[2]=r,i!==void 0&&(u[4]=i,a!==void 0&&(u[5]=a,o!==void 0&&(u[6]=o,s!==void 0&&(u[8]=s,c!==void 0&&(u[9]=c,l!==void 0&&(u[10]=l))))))))),u}function i(t,n,r,i,a,o,s,c,l,u){let d=u??new e(12);return d[0]=t,d[1]=n,d[2]=r,d[3]=0,d[4]=i,d[5]=a,d[6]=o,d[7]=0,d[8]=s,d[9]=c,d[10]=l,d[11]=0,d}function a(t,n){let r=n??new e(12);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=0,r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=0,r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=0,r}function o(t,n){let r=n??new e(12),i=t[0],a=t[1],o=t[2],s=t[3],c=i+i,l=a+a,u=o+o,d=i*c,f=a*c,p=a*l,m=o*c,h=o*l,g=o*u,_=s*c,v=s*l,y=s*u;return r[0]=1-p-g,r[1]=f+y,r[2]=m-v,r[3]=0,r[4]=f-y,r[5]=1-d-g,r[6]=h+_,r[7]=0,r[8]=m+v,r[9]=h-_,r[10]=1-d-p,r[11]=0,r}function c(t,n){let r=n??new e(12);return r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r[4]=-t[4],r[5]=-t[5],r[6]=-t[6],r[8]=-t[8],r[9]=-t[9],r[10]=-t[10],r}function l(t,n,r){let i=r??new e(12);return i[0]=t[0]*n,i[1]=t[1]*n,i[2]=t[2]*n,i[4]=t[4]*n,i[5]=t[5]*n,i[6]=t[6]*n,i[8]=t[8]*n,i[9]=t[9]*n,i[10]=t[10]*n,i}let u=l;function d(t,n,r){let i=r??new e(12);return i[0]=t[0]+n[0],i[1]=t[1]+n[1],i[2]=t[2]+n[2],i[4]=t[4]+n[4],i[5]=t[5]+n[5],i[6]=t[6]+n[6],i[8]=t[8]+n[8],i[9]=t[9]+n[9],i[10]=t[10]+n[10],i}function f(t,n){let r=n??new e(12);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[8]=t[8],r[9]=t[9],r[10]=t[10],r}let p=f;function m(e,t){return Math.abs(e[0]-t[0])<s&&Math.abs(e[1]-t[1])<s&&Math.abs(e[2]-t[2])<s&&Math.abs(e[4]-t[4])<s&&Math.abs(e[5]-t[5])<s&&Math.abs(e[6]-t[6])<s&&Math.abs(e[8]-t[8])<s&&Math.abs(e[9]-t[9])<s&&Math.abs(e[10]-t[10])<s}function h(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[8]===t[8]&&e[9]===t[9]&&e[10]===t[10]}function g(t){let n=t??new e(12);return n[0]=1,n[1]=0,n[2]=0,n[4]=0,n[5]=1,n[6]=0,n[8]=0,n[9]=0,n[10]=1,n}function v(t,n){let r=n??new e(12);if(r===t){let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,r}let i=t[0],a=t[1],o=t[2],s=t[4],c=t[5],l=t[6],u=t[8],d=t[9],f=t[10];return r[0]=i,r[1]=s,r[2]=u,r[4]=a,r[5]=c,r[6]=d,r[8]=o,r[9]=l,r[10]=f,r}function y(t,n){let r=n??new e(12),i=t[0],a=t[1],o=t[2],s=t[4],c=t[5],l=t[6],u=t[8],d=t[9],f=t[10],p=f*c-l*d,m=-f*s+l*u,h=d*s-c*u,g=1/(i*p+a*m+o*h);return r[0]=p*g,r[1]=(-f*a+o*d)*g,r[2]=(l*a-o*c)*g,r[4]=m*g,r[5]=(f*i-o*u)*g,r[6]=(-l*i+o*s)*g,r[8]=h*g,r[9]=(-d*i+a*u)*g,r[10]=(c*i-a*s)*g,r}function x(e){let t=e[0],n=e[1],r=e[2],i=e[4],a=e[5],o=e[6],s=e[8],c=e[9],l=e[10];return t*(a*l-c*o)-i*(n*l-c*r)+s*(n*o-a*r)}let S=y;function C(t,n,r){let i=r??new e(12),a=t[0],o=t[1],s=t[2],c=t[4],l=t[5],u=t[6],d=t[8],f=t[9],p=t[10],m=n[0],h=n[1],g=n[2],_=n[4],v=n[5],y=n[6],b=n[8],x=n[9],S=n[10];return i[0]=a*m+c*h+d*g,i[1]=o*m+l*h+f*g,i[2]=s*m+u*h+p*g,i[4]=a*_+c*v+d*y,i[5]=o*_+l*v+f*y,i[6]=s*_+u*v+p*y,i[8]=a*b+c*x+d*S,i[9]=o*b+l*x+f*S,i[10]=s*b+u*x+p*S,i}let w=C;function T(e,t,n){let r=n??g();return e!==r&&(r[0]=e[0],r[1]=e[1],r[2]=e[2],r[4]=e[4],r[5]=e[5],r[6]=e[6]),r[8]=t[0],r[9]=t[1],r[10]=1,r}function E(e,n){let r=n??t.create();return r[0]=e[8],r[1]=e[9],r}function D(e,n,r){let i=r??t.create(),a=n*4;return i[0]=e[a+0],i[1]=e[a+1],i}function O(e,t,n,r){let i=r===e?e:f(e,r),a=n*4;return i[a+0]=t[0],i[a+1]=t[1],i}function k(e,n){let r=n??t.create(),i=e[0],a=e[1],o=e[4],s=e[5];return r[0]=Math.sqrt(i*i+a*a),r[1]=Math.sqrt(o*o+s*s),r}function A(e,t){let r=t??n.create(),i=e[0],a=e[1],o=e[2],s=e[4],c=e[5],l=e[6],u=e[8],d=e[9],f=e[10];return r[0]=Math.sqrt(i*i+a*a+o*o),r[1]=Math.sqrt(s*s+c*c+l*l),r[2]=Math.sqrt(u*u+d*d+f*f),r}function j(t,n){let r=n??new e(12);return r[0]=1,r[1]=0,r[2]=0,r[4]=0,r[5]=1,r[6]=0,r[8]=t[0],r[9]=t[1],r[10]=1,r}function M(t,n,r){let i=r??new e(12),a=n[0],o=n[1],s=t[0],c=t[1],l=t[2],u=t[4],d=t[5],f=t[6],p=t[8],m=t[9],h=t[10];return t!==i&&(i[0]=s,i[1]=c,i[2]=l,i[4]=u,i[5]=d,i[6]=f),i[8]=s*a+u*o+p,i[9]=c*a+d*o+m,i[10]=l*a+f*o+h,i}function N(t,n){let r=n??new e(12),i=Math.cos(t),a=Math.sin(t);return r[0]=i,r[1]=a,r[2]=0,r[4]=-a,r[5]=i,r[6]=0,r[8]=0,r[9]=0,r[10]=1,r}function P(t,n,r){let i=r??new e(12),a=t[0],o=t[1],s=t[2],c=t[4],l=t[5],u=t[6],d=Math.cos(n),f=Math.sin(n);return i[0]=d*a+f*c,i[1]=d*o+f*l,i[2]=d*s+f*u,i[4]=d*c-f*a,i[5]=d*l-f*o,i[6]=d*u-f*s,t!==i&&(i[8]=t[8],i[9]=t[9],i[10]=t[10]),i}function F(t,n){let r=n??new e(12),i=Math.cos(t),a=Math.sin(t);return r[0]=1,r[1]=0,r[2]=0,r[4]=0,r[5]=i,r[6]=a,r[8]=0,r[9]=-a,r[10]=i,r}function I(t,n,r){let i=r??new e(12),a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10],d=Math.cos(n),f=Math.sin(n);return i[4]=d*a+f*c,i[5]=d*o+f*l,i[6]=d*s+f*u,i[8]=d*c-f*a,i[9]=d*l-f*o,i[10]=d*u-f*s,t!==i&&(i[0]=t[0],i[1]=t[1],i[2]=t[2]),i}function L(t,n){let r=n??new e(12),i=Math.cos(t),a=Math.sin(t);return r[0]=i,r[1]=0,r[2]=-a,r[4]=0,r[5]=1,r[6]=0,r[8]=a,r[9]=0,r[10]=i,r}function R(t,n,r){let i=r??new e(12),a=t[0],o=t[1],s=t[2],c=t[8],l=t[9],u=t[10],d=Math.cos(n),f=Math.sin(n);return i[0]=d*a-f*c,i[1]=d*o-f*l,i[2]=d*s-f*u,i[8]=d*c+f*a,i[9]=d*l+f*o,i[10]=d*u+f*s,t!==i&&(i[4]=t[4],i[5]=t[5],i[6]=t[6]),i}let z=N,B=P;function V(t,n){let r=n??new e(12);return r[0]=t[0],r[1]=0,r[2]=0,r[4]=0,r[5]=t[1],r[6]=0,r[8]=0,r[9]=0,r[10]=1,r}function H(t,n,r){let i=r??new e(12),a=n[0],o=n[1];return i[0]=a*t[0],i[1]=a*t[1],i[2]=a*t[2],i[4]=o*t[4],i[5]=o*t[5],i[6]=o*t[6],t!==i&&(i[8]=t[8],i[9]=t[9],i[10]=t[10]),i}function U(t,n){let r=n??new e(12);return r[0]=t[0],r[1]=0,r[2]=0,r[4]=0,r[5]=t[1],r[6]=0,r[8]=0,r[9]=0,r[10]=t[2],r}function W(t,n,r){let i=r??new e(12),a=n[0],o=n[1],s=n[2];return i[0]=a*t[0],i[1]=a*t[1],i[2]=a*t[2],i[4]=o*t[4],i[5]=o*t[5],i[6]=o*t[6],i[8]=s*t[8],i[9]=s*t[9],i[10]=s*t[10],i}function G(t,n){let r=n??new e(12);return r[0]=t,r[1]=0,r[2]=0,r[4]=0,r[5]=t,r[6]=0,r[8]=0,r[9]=0,r[10]=1,r}function K(t,n,r){let i=r??new e(12);return i[0]=n*t[0],i[1]=n*t[1],i[2]=n*t[2],i[4]=n*t[4],i[5]=n*t[5],i[6]=n*t[6],t!==i&&(i[8]=t[8],i[9]=t[9],i[10]=t[10]),i}function q(t,n){let r=n??new e(12);return r[0]=t,r[1]=0,r[2]=0,r[4]=0,r[5]=t,r[6]=0,r[8]=0,r[9]=0,r[10]=t,r}function J(t,n,r){let i=r??new e(12);return i[0]=n*t[0],i[1]=n*t[1],i[2]=n*t[2],i[4]=n*t[4],i[5]=n*t[5],i[6]=n*t[6],i[8]=n*t[8],i[9]=n*t[9],i[10]=n*t[10],i}return{add:d,clone:p,copy:f,create:r,determinant:x,equals:h,equalsApproximately:m,fromMat4:a,fromQuat:o,get3DScaling:A,getAxis:D,getScaling:k,getTranslation:E,identity:g,inverse:y,invert:S,mul:w,mulScalar:u,multiply:C,multiplyScalar:l,negate:c,rotate:P,rotateX:I,rotateY:R,rotateZ:B,rotation:N,rotationX:F,rotationY:L,rotationZ:z,scale:H,scale3D:W,scaling:V,scaling3D:U,set:i,setAxis:O,setTranslation:T,translate:M,translation:j,transpose:v,uniformScale:K,uniformScale3D:J,uniformScaling:G,uniformScaling3D:q}}var S=new Map;function C(e){let t=S.get(e);return t||(t=x(e),S.set(e,t)),t}function w(e){let t=b(e);function n(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){let _=new e(16);return t!==void 0&&(_[0]=t,n!==void 0&&(_[1]=n,r!==void 0&&(_[2]=r,i!==void 0&&(_[3]=i,a!==void 0&&(_[4]=a,o!==void 0&&(_[5]=o,s!==void 0&&(_[6]=s,c!==void 0&&(_[7]=c,l!==void 0&&(_[8]=l,u!==void 0&&(_[9]=u,d!==void 0&&(_[10]=d,f!==void 0&&(_[11]=f,p!==void 0&&(_[12]=p,m!==void 0&&(_[13]=m,h!==void 0&&(_[14]=h,g!==void 0&&(_[15]=g)))))))))))))))),_}function r(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_){let v=_??new e(16);return v[0]=t,v[1]=n,v[2]=r,v[3]=i,v[4]=a,v[5]=o,v[6]=s,v[7]=c,v[8]=l,v[9]=u,v[10]=d,v[11]=f,v[12]=p,v[13]=m,v[14]=h,v[15]=g,v}function i(t,n){let r=n??new e(16);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=0,r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=0,r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function a(t,n){let r=n??new e(16),i=t[0],a=t[1],o=t[2],s=t[3],c=i+i,l=a+a,u=o+o,d=i*c,f=a*c,p=a*l,m=o*c,h=o*l,g=o*u,_=s*c,v=s*l,y=s*u;return r[0]=1-p-g,r[1]=f+y,r[2]=m-v,r[3]=0,r[4]=f-y,r[5]=1-d-g,r[6]=h+_,r[7]=0,r[8]=m+v,r[9]=h-_,r[10]=1-d-p,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function o(t,n){let r=n??new e(16);return r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r[3]=-t[3],r[4]=-t[4],r[5]=-t[5],r[6]=-t[6],r[7]=-t[7],r[8]=-t[8],r[9]=-t[9],r[10]=-t[10],r[11]=-t[11],r[12]=-t[12],r[13]=-t[13],r[14]=-t[14],r[15]=-t[15],r}function c(t,n,r){let i=r??new e(16);return i[0]=t[0]+n[0],i[1]=t[1]+n[1],i[2]=t[2]+n[2],i[3]=t[3]+n[3],i[4]=t[4]+n[4],i[5]=t[5]+n[5],i[6]=t[6]+n[6],i[7]=t[7]+n[7],i[8]=t[8]+n[8],i[9]=t[9]+n[9],i[10]=t[10]+n[10],i[11]=t[11]+n[11],i[12]=t[12]+n[12],i[13]=t[13]+n[13],i[14]=t[14]+n[14],i[15]=t[15]+n[15],i}function l(t,n,r){let i=r??new e(16);return i[0]=t[0]*n,i[1]=t[1]*n,i[2]=t[2]*n,i[3]=t[3]*n,i[4]=t[4]*n,i[5]=t[5]*n,i[6]=t[6]*n,i[7]=t[7]*n,i[8]=t[8]*n,i[9]=t[9]*n,i[10]=t[10]*n,i[11]=t[11]*n,i[12]=t[12]*n,i[13]=t[13]*n,i[14]=t[14]*n,i[15]=t[15]*n,i}let u=l;function d(t,n){let r=n??new e(16);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15],r}let f=d;function p(e,t){return Math.abs(e[0]-t[0])<s&&Math.abs(e[1]-t[1])<s&&Math.abs(e[2]-t[2])<s&&Math.abs(e[3]-t[3])<s&&Math.abs(e[4]-t[4])<s&&Math.abs(e[5]-t[5])<s&&Math.abs(e[6]-t[6])<s&&Math.abs(e[7]-t[7])<s&&Math.abs(e[8]-t[8])<s&&Math.abs(e[9]-t[9])<s&&Math.abs(e[10]-t[10])<s&&Math.abs(e[11]-t[11])<s&&Math.abs(e[12]-t[12])<s&&Math.abs(e[13]-t[13])<s&&Math.abs(e[14]-t[14])<s&&Math.abs(e[15]-t[15])<s}function m(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]&&e[9]===t[9]&&e[10]===t[10]&&e[11]===t[11]&&e[12]===t[12]&&e[13]===t[13]&&e[14]===t[14]&&e[15]===t[15]}function h(t){let n=t??new e(16);return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function g(t,n){let r=n??new e(16);if(r===t){let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,r}let i=t[0],a=t[1],o=t[2],s=t[3],c=t[4],l=t[5],u=t[6],d=t[7],f=t[8],p=t[9],m=t[10],h=t[11],g=t[12],_=t[13],v=t[14],y=t[15];return r[0]=i,r[1]=c,r[2]=f,r[3]=g,r[4]=a,r[5]=l,r[6]=p,r[7]=_,r[8]=o,r[9]=u,r[10]=m,r[11]=v,r[12]=s,r[13]=d,r[14]=h,r[15]=y,r}function _(t,n){let r=n??new e(16),i=t[0],a=t[1],o=t[2],s=t[3],c=t[4],l=t[5],u=t[6],d=t[7],f=t[8],p=t[9],m=t[10],h=t[11],g=t[12],_=t[13],v=t[14],y=t[15],b=m*y,x=v*h,S=u*y,C=v*d,w=u*h,T=m*d,E=o*y,D=v*s,O=o*h,k=m*s,A=o*d,j=u*s,M=f*_,N=g*p,P=c*_,F=g*l,I=c*p,L=f*l,R=i*_,z=g*a,B=i*p,V=f*a,H=i*l,U=c*a,W=b*l+C*p+w*_-(x*l+S*p+T*_),G=x*a+E*p+k*_-(b*a+D*p+O*_),K=S*a+D*l+A*_-(C*a+E*l+j*_),q=T*a+O*l+j*p-(w*a+k*l+A*p),J=1/(i*W+c*G+f*K+g*q);return r[0]=J*W,r[1]=J*G,r[2]=J*K,r[3]=J*q,r[4]=J*(x*c+S*f+T*g-(b*c+C*f+w*g)),r[5]=J*(b*i+D*f+O*g-(x*i+E*f+k*g)),r[6]=J*(C*i+E*c+j*g-(S*i+D*c+A*g)),r[7]=J*(w*i+k*c+A*f-(T*i+O*c+j*f)),r[8]=J*(M*d+F*h+I*y-(N*d+P*h+L*y)),r[9]=J*(N*s+R*h+V*y-(M*s+z*h+B*y)),r[10]=J*(P*s+z*d+H*y-(F*s+R*d+U*y)),r[11]=J*(L*s+B*d+U*h-(I*s+V*d+H*h)),r[12]=J*(P*m+L*v+N*u-(I*v+M*u+F*m)),r[13]=J*(B*v+M*o+z*m-(R*m+V*v+N*o)),r[14]=J*(R*u+U*v+F*o-(H*v+P*o+z*u)),r[15]=J*(H*m+I*o+V*u-(B*u+U*m+L*o)),r}function v(e){let t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=d*g,v=h*f,y=s*g,b=h*c,x=s*f,S=d*c,C=r*g,w=h*i,T=r*f,E=d*i,D=r*c,O=s*i,k=_*o+b*u+x*m-(v*o+y*u+S*m),A=v*n+C*u+E*m-(_*n+w*u+T*m),j=y*n+w*o+D*m-(b*n+C*o+O*m),M=S*n+T*o+O*u-(x*n+E*o+D*u);return t*k+a*A+l*j+p*M}let y=_;function x(t,n,r){let i=r??new e(16),a=t[0],o=t[1],s=t[2],c=t[3],l=t[4],u=t[5],d=t[6],f=t[7],p=t[8],m=t[9],h=t[10],g=t[11],_=t[12],v=t[13],y=t[14],b=t[15],x=n[0],S=n[1],C=n[2],w=n[3],T=n[4],E=n[5],D=n[6],O=n[7],k=n[8],A=n[9],j=n[10],M=n[11],N=n[12],P=n[13],F=n[14],I=n[15];return i[0]=a*x+l*S+p*C+_*w,i[1]=o*x+u*S+m*C+v*w,i[2]=s*x+d*S+h*C+y*w,i[3]=c*x+f*S+g*C+b*w,i[4]=a*T+l*E+p*D+_*O,i[5]=o*T+u*E+m*D+v*O,i[6]=s*T+d*E+h*D+y*O,i[7]=c*T+f*E+g*D+b*O,i[8]=a*k+l*A+p*j+_*M,i[9]=o*k+u*A+m*j+v*M,i[10]=s*k+d*A+h*j+y*M,i[11]=c*k+f*A+g*j+b*M,i[12]=a*N+l*P+p*F+_*I,i[13]=o*N+u*P+m*F+v*I,i[14]=s*N+d*P+h*F+y*I,i[15]=c*N+f*P+g*F+b*I,i}let S=x;function C(e,t,n){let r=n??h();return e!==r&&(r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],r[4]=e[4],r[5]=e[5],r[6]=e[6],r[7]=e[7],r[8]=e[8],r[9]=e[9],r[10]=e[10],r[11]=e[11]),r[12]=t[0],r[13]=t[1],r[14]=t[2],r[15]=1,r}function w(e,n){let r=n??t.create();return r[0]=e[12],r[1]=e[13],r[2]=e[14],r}function T(e,n,r){let i=r??t.create(),a=n*4;return i[0]=e[a+0],i[1]=e[a+1],i[2]=e[a+2],i}function E(e,t,n,r){let i=r===e?r:d(e,r),a=n*4;return i[a+0]=t[0],i[a+1]=t[1],i[a+2]=t[2],i}function D(e,n){let r=n??t.create(),i=e[0],a=e[1],o=e[2],s=e[4],c=e[5],l=e[6],u=e[8],d=e[9],f=e[10];return r[0]=Math.sqrt(i*i+a*a+o*o),r[1]=Math.sqrt(s*s+c*c+l*l),r[2]=Math.sqrt(u*u+d*d+f*f),r}function O(t,n,r,i,a){let o=a??new e(16),s=Math.tan(Math.PI*.5-.5*t);if(o[0]=s/n,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=s,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[11]=-1,o[12]=0,o[13]=0,o[15]=0,Number.isFinite(i)){let e=1/(r-i);o[10]=i*e,o[14]=i*r*e}else o[10]=-1,o[14]=-r;return o}function k(t,n,r,i=1/0,a){let o=a??new e(16),s=1/Math.tan(t*.5);if(o[0]=s/n,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=s,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[11]=-1,o[12]=0,o[13]=0,o[15]=0,i===1/0)o[10]=0,o[14]=r;else{let e=1/(i-r);o[10]=r*e,o[14]=i*r*e}return o}function A(t,n,r,i,a,o,s){let c=s??new e(16);return c[0]=2/(n-t),c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=2/(i-r),c[6]=0,c[7]=0,c[8]=0,c[9]=0,c[10]=1/(a-o),c[11]=0,c[12]=(n+t)/(t-n),c[13]=(i+r)/(r-i),c[14]=a/(a-o),c[15]=1,c}function j(t,n,r,i,a,o,s){let c=s??new e(16),l=n-t,u=i-r,d=a-o;return c[0]=2*a/l,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=2*a/u,c[6]=0,c[7]=0,c[8]=(t+n)/l,c[9]=(i+r)/u,c[10]=o/d,c[11]=-1,c[12]=0,c[13]=0,c[14]=a*o/d,c[15]=0,c}function M(t,n,r,i,a,o=1/0,s){let c=s??new e(16),l=n-t,u=i-r;if(c[0]=2*a/l,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=2*a/u,c[6]=0,c[7]=0,c[8]=(t+n)/l,c[9]=(i+r)/u,c[11]=-1,c[12]=0,c[13]=0,c[15]=0,o===1/0)c[10]=0,c[14]=a;else{let e=1/(o-a);c[10]=a*e,c[14]=o*a*e}return c}let N=t.create(),P=t.create(),F=t.create();function I(n,r,i,a){let o=a??new e(16);return t.normalize(t.subtract(r,n,F),F),t.normalize(t.cross(i,F,N),N),t.normalize(t.cross(F,N,P),P),o[0]=N[0],o[1]=N[1],o[2]=N[2],o[3]=0,o[4]=P[0],o[5]=P[1],o[6]=P[2],o[7]=0,o[8]=F[0],o[9]=F[1],o[10]=F[2],o[11]=0,o[12]=n[0],o[13]=n[1],o[14]=n[2],o[15]=1,o}function L(n,r,i,a){let o=a??new e(16);return t.normalize(t.subtract(n,r,F),F),t.normalize(t.cross(i,F,N),N),t.normalize(t.cross(F,N,P),P),o[0]=N[0],o[1]=N[1],o[2]=N[2],o[3]=0,o[4]=P[0],o[5]=P[1],o[6]=P[2],o[7]=0,o[8]=F[0],o[9]=F[1],o[10]=F[2],o[11]=0,o[12]=n[0],o[13]=n[1],o[14]=n[2],o[15]=1,o}function R(n,r,i,a){let o=a??new e(16);return t.normalize(t.subtract(n,r,F),F),t.normalize(t.cross(i,F,N),N),t.normalize(t.cross(F,N,P),P),o[0]=N[0],o[1]=P[0],o[2]=F[0],o[3]=0,o[4]=N[1],o[5]=P[1],o[6]=F[1],o[7]=0,o[8]=N[2],o[9]=P[2],o[10]=F[2],o[11]=0,o[12]=-(N[0]*n[0]+N[1]*n[1]+N[2]*n[2]),o[13]=-(P[0]*n[0]+P[1]*n[1]+P[2]*n[2]),o[14]=-(F[0]*n[0]+F[1]*n[1]+F[2]*n[2]),o[15]=1,o}function z(t,n){let r=n??new e(16);return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=t[0],r[13]=t[1],r[14]=t[2],r[15]=1,r}function B(t,n,r){let i=r??new e(16),a=n[0],o=n[1],s=n[2],c=t[0],l=t[1],u=t[2],d=t[3],f=t[4],p=t[5],m=t[6],h=t[7],g=t[8],_=t[9],v=t[10],y=t[11],b=t[12],x=t[13],S=t[14],C=t[15];return t!==i&&(i[0]=c,i[1]=l,i[2]=u,i[3]=d,i[4]=f,i[5]=p,i[6]=m,i[7]=h,i[8]=g,i[9]=_,i[10]=v,i[11]=y),i[12]=c*a+f*o+g*s+b,i[13]=l*a+p*o+_*s+x,i[14]=u*a+m*o+v*s+S,i[15]=d*a+h*o+y*s+C,i}function V(t,n){let r=n??new e(16),i=Math.cos(t),a=Math.sin(t);return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=i,r[6]=a,r[7]=0,r[8]=0,r[9]=-a,r[10]=i,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function H(t,n,r){let i=r??new e(16),a=t[4],o=t[5],s=t[6],c=t[7],l=t[8],u=t[9],d=t[10],f=t[11],p=Math.cos(n),m=Math.sin(n);return i[4]=p*a+m*l,i[5]=p*o+m*u,i[6]=p*s+m*d,i[7]=p*c+m*f,i[8]=p*l-m*a,i[9]=p*u-m*o,i[10]=p*d-m*s,i[11]=p*f-m*c,t!==i&&(i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[3],i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]),i}function U(t,n){let r=n??new e(16),i=Math.cos(t),a=Math.sin(t);return r[0]=i,r[1]=0,r[2]=-a,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=a,r[9]=0,r[10]=i,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function W(t,n,r){let i=r??new e(16),a=t[0],o=t[1],s=t[2],c=t[3],l=t[8],u=t[9],d=t[10],f=t[11],p=Math.cos(n),m=Math.sin(n);return i[0]=p*a-m*l,i[1]=p*o-m*u,i[2]=p*s-m*d,i[3]=p*c-m*f,i[8]=p*l+m*a,i[9]=p*u+m*o,i[10]=p*d+m*s,i[11]=p*f+m*c,t!==i&&(i[4]=t[4],i[5]=t[5],i[6]=t[6],i[7]=t[7],i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]),i}function G(t,n){let r=n??new e(16),i=Math.cos(t),a=Math.sin(t);return r[0]=i,r[1]=a,r[2]=0,r[3]=0,r[4]=-a,r[5]=i,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function K(t,n,r){let i=r??new e(16),a=t[0],o=t[1],s=t[2],c=t[3],l=t[4],u=t[5],d=t[6],f=t[7],p=Math.cos(n),m=Math.sin(n);return i[0]=p*a+m*l,i[1]=p*o+m*u,i[2]=p*s+m*d,i[3]=p*c+m*f,i[4]=p*l-m*a,i[5]=p*u-m*o,i[6]=p*d-m*s,i[7]=p*f-m*c,t!==i&&(i[8]=t[8],i[9]=t[9],i[10]=t[10],i[11]=t[11],i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]),i}function q(t,n,r){let i=r??new e(16),a=t[0],o=t[1],s=t[2],c=Math.sqrt(a*a+o*o+s*s);a/=c,o/=c,s/=c;let l=a*a,u=o*o,d=s*s,f=Math.cos(n),p=Math.sin(n),m=1-f;return i[0]=l+(1-l)*f,i[1]=a*o*m+s*p,i[2]=a*s*m-o*p,i[3]=0,i[4]=a*o*m-s*p,i[5]=u+(1-u)*f,i[6]=o*s*m+a*p,i[7]=0,i[8]=a*s*m+o*p,i[9]=o*s*m-a*p,i[10]=d+(1-d)*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,i}let J=q;function Y(t,n,r,i){let a=i??new e(16),o=n[0],s=n[1],c=n[2],l=Math.sqrt(o*o+s*s+c*c);o/=l,s/=l,c/=l;let u=o*o,d=s*s,f=c*c,p=Math.cos(r),m=Math.sin(r),h=1-p,g=u+(1-u)*p,_=o*s*h+c*m,v=o*c*h-s*m,y=o*s*h-c*m,b=d+(1-d)*p,x=s*c*h+o*m,S=o*c*h+s*m,C=s*c*h-o*m,w=f+(1-f)*p,T=t[0],E=t[1],D=t[2],O=t[3],k=t[4],A=t[5],j=t[6],M=t[7],N=t[8],P=t[9],F=t[10],I=t[11];return a[0]=g*T+_*k+v*N,a[1]=g*E+_*A+v*P,a[2]=g*D+_*j+v*F,a[3]=g*O+_*M+v*I,a[4]=y*T+b*k+x*N,a[5]=y*E+b*A+x*P,a[6]=y*D+b*j+x*F,a[7]=y*O+b*M+x*I,a[8]=S*T+C*k+w*N,a[9]=S*E+C*A+w*P,a[10]=S*D+C*j+w*F,a[11]=S*O+C*M+w*I,t!==a&&(a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]),a}let ee=Y;function te(t,n){let r=n??new e(16);return r[0]=t[0],r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=t[1],r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=t[2],r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function ne(t,n,r){let i=r??new e(16),a=n[0],o=n[1],s=n[2];return i[0]=a*t[0],i[1]=a*t[1],i[2]=a*t[2],i[3]=a*t[3],i[4]=o*t[4],i[5]=o*t[5],i[6]=o*t[6],i[7]=o*t[7],i[8]=s*t[8],i[9]=s*t[9],i[10]=s*t[10],i[11]=s*t[11],t!==i&&(i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]),i}function X(t,n){let r=n??new e(16);return r[0]=t,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=t,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=t,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function re(t,n,r){let i=r??new e(16);return i[0]=n*t[0],i[1]=n*t[1],i[2]=n*t[2],i[3]=n*t[3],i[4]=n*t[4],i[5]=n*t[5],i[6]=n*t[6],i[7]=n*t[7],i[8]=n*t[8],i[9]=n*t[9],i[10]=n*t[10],i[11]=n*t[11],t!==i&&(i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]),i}return{add:c,aim:I,axisRotate:Y,axisRotation:q,cameraAim:L,clone:f,copy:d,create:n,determinant:v,equals:m,equalsApproximately:p,fromMat3:i,fromQuat:a,frustum:j,frustumReverseZ:M,getAxis:T,getScaling:D,getTranslation:w,identity:h,inverse:_,invert:y,lookAt:R,mul:S,mulScalar:u,multiply:x,multiplyScalar:l,negate:o,ortho:A,perspective:O,perspectiveReverseZ:k,rotate:ee,rotateX:H,rotateY:W,rotateZ:K,rotation:J,rotationX:V,rotationY:U,rotationZ:G,scale:ne,scaling:te,set:r,setAxis:E,setTranslation:C,translate:B,translation:z,transpose:g,uniformScale:re,uniformScaling:X}}var T=new Map;function E(e){let t=T.get(e);return t||(t=w(e),T.set(e,t)),t}function D(e){let t=b(e);function n(t,n,r,i){let a=new e(4);return t!==void 0&&(a[0]=t,n!==void 0&&(a[1]=n,r!==void 0&&(a[2]=r,i!==void 0&&(a[3]=i)))),a}let r=n;function i(t,n,r,i,a){let o=a??new e(4);return o[0]=t,o[1]=n,o[2]=r,o[3]=i,o}function a(t,n,r){let i=r??new e(4),a=n*.5,o=Math.sin(a);return i[0]=o*t[0],i[1]=o*t[1],i[2]=o*t[2],i[3]=Math.cos(a),i}function o(e,n){let r=n??t.create(3),i=Math.acos(e[3])*2,a=Math.sin(i*.5);return a>s?(r[0]=e[0]/a,r[1]=e[1]/a,r[2]=e[2]/a):(r[0]=1,r[1]=0,r[2]=0),{angle:i,axis:r}}function c(e,t){let n=O(e,t);return Math.acos(2*n*n-1)}function l(t,n,r){let i=r??new e(4),a=t[0],o=t[1],s=t[2],c=t[3],l=n[0],u=n[1],d=n[2],f=n[3];return i[0]=a*f+c*l+o*d-s*u,i[1]=o*f+c*u+s*l-a*d,i[2]=s*f+c*d+a*u-o*l,i[3]=c*f-a*l-o*u-s*d,i}let u=l;function d(t,n,r){let i=r??new e(4),a=n*.5,o=t[0],s=t[1],c=t[2],l=t[3],u=Math.sin(a),d=Math.cos(a);return i[0]=o*d+l*u,i[1]=s*d+c*u,i[2]=c*d-s*u,i[3]=l*d-o*u,i}function f(t,n,r){let i=r??new e(4),a=n*.5,o=t[0],s=t[1],c=t[2],l=t[3],u=Math.sin(a),d=Math.cos(a);return i[0]=o*d-c*u,i[1]=s*d+l*u,i[2]=c*d+o*u,i[3]=l*d-s*u,i}function p(t,n,r){let i=r??new e(4),a=n*.5,o=t[0],s=t[1],c=t[2],l=t[3],u=Math.sin(a),d=Math.cos(a);return i[0]=o*d+s*u,i[1]=s*d-o*u,i[2]=c*d+l*u,i[3]=l*d-c*u,i}function m(t,n,r,i){let a=i??new e(4),o=t[0],c=t[1],l=t[2],u=t[3],d=n[0],f=n[1],p=n[2],m=n[3],h=o*d+c*f+l*p+u*m;h<0&&(h=-h,d=-d,f=-f,p=-p,m=-m);let g,_;if(1-h>s){let e=Math.acos(h),t=Math.sin(e);g=Math.sin((1-r)*e)/t,_=Math.sin(r*e)/t}else g=1-r,_=r;return a[0]=g*o+_*d,a[1]=g*c+_*f,a[2]=g*l+_*p,a[3]=g*u+_*m,a}function h(t,n){let r=n??new e(4),i=t[0],a=t[1],o=t[2],s=t[3],c=i*i+a*a+o*o+s*s,l=c?1/c:0;return r[0]=-i*l,r[1]=-a*l,r[2]=-o*l,r[3]=s*l,r}function g(t,n){let r=n??new e(4);return r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r[3]=t[3],r}function _(t,n){let r=n??new e(4),i=t[0]+t[5]+t[10];if(i>0){let e=Math.sqrt(i+1);r[3]=.5*e;let n=.5/e;r[0]=(t[6]-t[9])*n,r[1]=(t[8]-t[2])*n,r[2]=(t[1]-t[4])*n}else{let e=0;t[5]>t[0]&&(e=1),t[10]>t[e*4+e]&&(e=2);let n=(e+1)%3,i=(e+2)%3,a=Math.sqrt(t[e*4+e]-t[n*4+n]-t[i*4+i]+1);r[e]=.5*a;let o=.5/a;r[3]=(t[n*4+i]-t[i*4+n])*o,r[n]=(t[n*4+e]+t[e*4+n])*o,r[i]=(t[i*4+e]+t[e*4+i])*o}return r}function v(t,n,r,i,a){let o=a??new e(4),s=t*.5,c=n*.5,l=r*.5,u=Math.sin(s),d=Math.cos(s),f=Math.sin(c),p=Math.cos(c),m=Math.sin(l),h=Math.cos(l);switch(i){case`xyz`:o[0]=u*p*h+d*f*m,o[1]=d*f*h-u*p*m,o[2]=d*p*m+u*f*h,o[3]=d*p*h-u*f*m;break;case`xzy`:o[0]=u*p*h-d*f*m,o[1]=d*f*h-u*p*m,o[2]=d*p*m+u*f*h,o[3]=d*p*h+u*f*m;break;case`yxz`:o[0]=u*p*h+d*f*m,o[1]=d*f*h-u*p*m,o[2]=d*p*m-u*f*h,o[3]=d*p*h+u*f*m;break;case`yzx`:o[0]=u*p*h+d*f*m,o[1]=d*f*h+u*p*m,o[2]=d*p*m-u*f*h,o[3]=d*p*h-u*f*m;break;case`zxy`:o[0]=u*p*h-d*f*m,o[1]=d*f*h+u*p*m,o[2]=d*p*m+u*f*h,o[3]=d*p*h-u*f*m;break;case`zyx`:o[0]=u*p*h-d*f*m,o[1]=d*f*h+u*p*m,o[2]=d*p*m-u*f*h,o[3]=d*p*h+u*f*m;break;default:throw Error(`Unknown rotation order: ${i}`)}return o}function y(t,n){let r=n??new e(4);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r}let x=y;function S(t,n,r){let i=r??new e(4);return i[0]=t[0]+n[0],i[1]=t[1]+n[1],i[2]=t[2]+n[2],i[3]=t[3]+n[3],i}function C(t,n,r){let i=r??new e(4);return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],i[3]=t[3]-n[3],i}let w=C;function T(t,n,r){let i=r??new e(4);return i[0]=t[0]*n,i[1]=t[1]*n,i[2]=t[2]*n,i[3]=t[3]*n,i}let E=T;function D(t,n,r){let i=r??new e(4);return i[0]=t[0]/n,i[1]=t[1]/n,i[2]=t[2]/n,i[3]=t[3]/n,i}function O(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function k(t,n,r,i){let a=i??new e(4);return a[0]=t[0]+r*(n[0]-t[0]),a[1]=t[1]+r*(n[1]-t[1]),a[2]=t[2]+r*(n[2]-t[2]),a[3]=t[3]+r*(n[3]-t[3]),a}function A(e){let t=e[0],n=e[1],r=e[2],i=e[3];return Math.sqrt(t*t+n*n+r*r+i*i)}let j=A;function M(e){let t=e[0],n=e[1],r=e[2],i=e[3];return t*t+n*n+r*r+i*i}let N=M;function P(t,n){let r=n??new e(4),i=t[0],a=t[1],o=t[2],s=t[3],c=Math.sqrt(i*i+a*a+o*o+s*s);return c>1e-5?(r[0]=i/c,r[1]=a/c,r[2]=o/c,r[3]=s/c):(r[0]=0,r[1]=0,r[2]=0,r[3]=1),r}function F(e,t){return Math.abs(e[0]-t[0])<s&&Math.abs(e[1]-t[1])<s&&Math.abs(e[2]-t[2])<s&&Math.abs(e[3]-t[3])<s}function I(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]}function L(t){let n=t??new e(4);return n[0]=0,n[1]=0,n[2]=0,n[3]=1,n}let R=t.create(),z=t.create(),B=t.create();function V(n,r,i){let o=i??new e(4),s=t.dot(n,r);return s<-.999999?(t.cross(z,n,R),t.len(R)<1e-6&&t.cross(B,n,R),t.normalize(R,R),a(R,Math.PI,o),o):s>.999999?(o[0]=0,o[1]=0,o[2]=0,o[3]=1,o):(t.cross(n,r,R),o[0]=R[0],o[1]=R[1],o[2]=R[2],o[3]=1+s,P(o,o))}let H=new e(4),U=new e(4);function W(t,n,r,i,a,o){let s=o??new e(4);return m(t,i,a,H),m(n,r,a,U),m(H,U,2*a*(1-a),s),s}return{create:n,fromValues:r,set:i,fromAxisAngle:a,toAxisAngle:o,angle:c,multiply:l,mul:u,rotateX:d,rotateY:f,rotateZ:p,slerp:m,inverse:h,conjugate:g,fromMat:_,fromEuler:v,copy:y,clone:x,add:S,subtract:C,sub:w,mulScalar:T,scale:E,divScalar:D,dot:O,lerp:k,length:A,len:j,lengthSq:M,lenSq:N,normalize:P,equalsApproximately:F,equals:I,identity:L,rotationTo:V,sqlerp:W}}var O=new Map;function k(e){let t=O.get(e);return t||(t=D(e),O.set(e,t)),t}function A(e){function t(t,n,r,i){let a=new e(4);return t!==void 0&&(a[0]=t,n!==void 0&&(a[1]=n,r!==void 0&&(a[2]=r,i!==void 0&&(a[3]=i)))),a}let n=t;function r(t,n,r,i,a){let o=a??new e(4);return o[0]=t,o[1]=n,o[2]=r,o[3]=i,o}function i(t,n){let r=n??new e(4);return r[0]=Math.ceil(t[0]),r[1]=Math.ceil(t[1]),r[2]=Math.ceil(t[2]),r[3]=Math.ceil(t[3]),r}function a(t,n){let r=n??new e(4);return r[0]=Math.floor(t[0]),r[1]=Math.floor(t[1]),r[2]=Math.floor(t[2]),r[3]=Math.floor(t[3]),r}function o(t,n){let r=n??new e(4);return r[0]=Math.round(t[0]),r[1]=Math.round(t[1]),r[2]=Math.round(t[2]),r[3]=Math.round(t[3]),r}function c(t,n=0,r=1,i){let a=i??new e(4);return a[0]=Math.min(r,Math.max(n,t[0])),a[1]=Math.min(r,Math.max(n,t[1])),a[2]=Math.min(r,Math.max(n,t[2])),a[3]=Math.min(r,Math.max(n,t[3])),a}function l(t,n,r){let i=r??new e(4);return i[0]=t[0]+n[0],i[1]=t[1]+n[1],i[2]=t[2]+n[2],i[3]=t[3]+n[3],i}function u(t,n,r,i){let a=i??new e(4);return a[0]=t[0]+n[0]*r,a[1]=t[1]+n[1]*r,a[2]=t[2]+n[2]*r,a[3]=t[3]+n[3]*r,a}function d(t,n,r){let i=r??new e(4);return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],i[3]=t[3]-n[3],i}let f=d;function p(e,t){return Math.abs(e[0]-t[0])<s&&Math.abs(e[1]-t[1])<s&&Math.abs(e[2]-t[2])<s&&Math.abs(e[3]-t[3])<s}function m(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]}function h(t,n,r,i){let a=i??new e(4);return a[0]=t[0]+r*(n[0]-t[0]),a[1]=t[1]+r*(n[1]-t[1]),a[2]=t[2]+r*(n[2]-t[2]),a[3]=t[3]+r*(n[3]-t[3]),a}function g(t,n,r,i){let a=i??new e(4);return a[0]=t[0]+r[0]*(n[0]-t[0]),a[1]=t[1]+r[1]*(n[1]-t[1]),a[2]=t[2]+r[2]*(n[2]-t[2]),a[3]=t[3]+r[3]*(n[3]-t[3]),a}function _(t,n,r){let i=r??new e(4);return i[0]=Math.max(t[0],n[0]),i[1]=Math.max(t[1],n[1]),i[2]=Math.max(t[2],n[2]),i[3]=Math.max(t[3],n[3]),i}function v(t,n,r){let i=r??new e(4);return i[0]=Math.min(t[0],n[0]),i[1]=Math.min(t[1],n[1]),i[2]=Math.min(t[2],n[2]),i[3]=Math.min(t[3],n[3]),i}function y(t,n,r){let i=r??new e(4);return i[0]=t[0]*n,i[1]=t[1]*n,i[2]=t[2]*n,i[3]=t[3]*n,i}let b=y;function x(t,n,r){let i=r??new e(4);return i[0]=t[0]/n,i[1]=t[1]/n,i[2]=t[2]/n,i[3]=t[3]/n,i}function S(t,n){let r=n??new e(4);return r[0]=1/t[0],r[1]=1/t[1],r[2]=1/t[2],r[3]=1/t[3],r}let C=S;function w(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function T(e){let t=e[0],n=e[1],r=e[2],i=e[3];return Math.sqrt(t*t+n*n+r*r+i*i)}let E=T;function D(e){let t=e[0],n=e[1],r=e[2],i=e[3];return t*t+n*n+r*r+i*i}let O=D;function k(e,t){let n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2],a=e[3]-t[3];return Math.sqrt(n*n+r*r+i*i+a*a)}let A=k;function j(e,t){let n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2],a=e[3]-t[3];return n*n+r*r+i*i+a*a}let M=j;function N(t,n){let r=n??new e(4),i=t[0],a=t[1],o=t[2],s=t[3],c=i*i+a*a+o*o+s*s,l=c>0?1/Math.sqrt(c):1;return r[0]=i*l,r[1]=a*l,r[2]=o*l,r[3]=s*l,r}function P(t,n){let r=n??new e(4);return r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r[3]=-t[3],r}function F(t,n){let r=n??new e(4);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r}let I=F;function L(t,n,r){let i=r??new e(4);return i[0]=t[0]*n[0],i[1]=t[1]*n[1],i[2]=t[2]*n[2],i[3]=t[3]*n[3],i}let R=L;function z(t,n,r){let i=r??new e(4);return i[0]=t[0]/n[0],i[1]=t[1]/n[1],i[2]=t[2]/n[2],i[3]=t[3]/n[3],i}let B=z;function V(t){let n=t??new e(4);return n[0]=0,n[1]=0,n[2]=0,n[3]=0,n}function H(t,n,r){let i=r??new e(4),a=t[0],o=t[1],s=t[2],c=t[3];return i[0]=n[0]*a+n[4]*o+n[8]*s+n[12]*c,i[1]=n[1]*a+n[5]*o+n[9]*s+n[13]*c,i[2]=n[2]*a+n[6]*o+n[10]*s+n[14]*c,i[3]=n[3]*a+n[7]*o+n[11]*s+n[15]*c,i}function U(t,n,r){let i=r??new e(4);return N(t,i),y(i,n,i)}function W(t,n,r){let i=r??new e(4);return T(t)>n?U(t,n,i):F(t,i)}function G(t,n,r){return h(t,n,.5,r??new e(4))}return{create:t,fromValues:n,set:r,ceil:i,floor:a,round:o,clamp:c,add:l,addScaled:u,subtract:d,sub:f,equalsApproximately:p,equals:m,lerp:h,lerpV:g,max:_,min:v,mulScalar:y,scale:b,divScalar:x,inverse:S,invert:C,dot:w,length:T,len:E,lengthSq:D,lenSq:O,distance:k,dist:A,distanceSq:j,distSq:M,normalize:N,negate:P,copy:F,clone:I,multiply:L,mul:R,divide:z,div:B,zero:V,transformMat4:H,setLength:U,truncate:W,midpoint:G}}var j=new Map;function M(e){let t=j.get(e);return t||(t=A(e),j.set(e,t)),t}function N(e,t,n,r,i,a){return{mat3:C(e),mat4:E(t),quat:k(n),vec2:_(r),vec3:b(i),vec4:M(a)}}var{mat3:P,mat4:F,quat:I,vec2:L,vec3:R,vec4:z}=N(Float32Array,Float32Array,Float32Array,Float32Array,Float32Array,Float32Array),{mat3:B,mat4:V,quat:H,vec2:U,vec3:W,vec4:G}=N(Float64Array,Float64Array,Float64Array,Float64Array,Float64Array,Float64Array),{mat3:K,mat4:q,quat:J,vec2:Y,vec3:ee,vec4:te}=N(o,Array,Array,Array,Array,Array),ne=class{#e;#t;#n;#r;#i;#a;#o;#s=[];#c=0;#l=!1;#u=null;#d=new Map;#f=[];#p=0;constructor(e,{capacity:t=32,printEvery:n=8}={}){if(this.#e=e.features.has(`timestamp-query`),this.#t=e,this.#n=t,this.#r=n,!this.#e){console.warn(`GpuProfiler disabled: 'timestamp-query' feature unavailable`);return}console.log(`GpuProfiler enabled — averaging every ${n} rendered frames`),this.#i=e.createQuerySet({type:`timestamp`,count:t*2}),this.#a=e.createBuffer({label:`profiler resolve buffer`,size:t*2*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.#o=e.createBuffer({label:`profiler read buffer`,size:t*2*8,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ})}begin(){this.#c=0,this.#s=[]}write(e){if(!this.#e||this.#c>=this.#n)return;let t=this.#c++;return this.#s.push(e),{querySet:this.#i,beginningOfPassWriteIndex:t*2,endOfPassWriteIndex:t*2+1}}resolve(e){if(!this.#e||this.#s.length===0)return;let t=this.#s.length;e.resolveQuerySet(this.#i,0,t*2,this.#a,0),this.#l||(e.copyBufferToBuffer(this.#a,0,this.#o,0,t*2*8),this.#u=this.#s.slice())}afterSubmit(){if(!this.#e||this.#l||!this.#u)return;let e=this.#u;this.#u=null,this.#l=!0,this.#o.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigInt64Array(this.#o.getMappedRange().slice(0));this.#o.unmap(),this.#l=!1,t(e,n)}).catch(e=>{this.#l=!1,console.error(`GpuProfiler readback failed:`,e)});let t=(e,t)=>{for(let n=0;n<e.length;++n){let r=Number(t[n*2+1]-t[n*2]),i=e[n];this.#d.has(i)||this.#f.push(i),this.#d.set(i,(this.#d.get(i)??0)+r/1e6)}++this.#p;let n={},r=0;for(let e of this.#f){let t=this.#d.get(e)/this.#p;r+=t,n[e]={ms:+t.toFixed(3)}}n.TOTAL={ms:+r.toFixed(3)},console.clear(),console.log(`GPU pass ms (avg of ${this.#p} frames):`),console.table(n),this.#p>=this.#r&&(this.#d.clear(),this.#f=[],this.#p=0)}}},{degToRad:X}=m,re=-90,ie=0,ae=60,oe=1,se=1,ce=R.create(0,1,0),le=.2,ue=1e3,de=class{#e;#t;#n;#r;#i;#a;#o;#s;#c;#l=new Set;#u=!0;constructor(e,t){this.reset(e,t),window.addEventListener(`keydown`,e=>this.#l.add(e.code)),window.addEventListener(`keyup`,e=>this.#l.delete(e.code)),window.addEventListener(`mousemove`,e=>{this.#l.has(`ShiftLeft`)&&(this.#r+=e.movementX*se,this.#i-=e.movementY*se,this.#i=Math.max(-89,Math.min(89,this.#i)),this.#d(),this.#u=!0)})}reset(e,t){this.#s=e,this.#c=t,this.#n=R.create(),this.#r=re,this.#i=ie,this.#a=ae,this.#o=e/t,this.#d(),this.#f(),this.#u=!0}resize(e,t){this.#s=e,this.#c=t,this.#o=e/t,this.#f(),this.#u=!0}pollDirty(){let e=this.#u;return this.#u=!1,e}getUniform(){let e=Math.tan(X(this.#a)/2),t=e*this.#o;return{view:this.#e,projView:F.multiply(this.#t,this.#e),eye:this.#n,focal:[this.#s/(2*t),this.#c/(2*e)],tanFov:[t,e]}}update(e){let{forward:t,right:n}=this.#p(),r=R.negate(t),i=R.negate(n),a=oe*e,o=!1,s=(e,t)=>{this.#n=R.addScaled(this.#n,e,t*a),o=!0};this.#l.has(`KeyW`)&&s(r,1),this.#l.has(`KeyS`)&&s(r,-1),this.#l.has(`KeyD`)&&s(i,1),this.#l.has(`KeyA`)&&s(i,-1),this.#l.has(`KeyQ`)&&s(ce,1),this.#l.has(`KeyE`)&&s(ce,-1),o&&(this.#d(),this.#u=!0)}#d(){let{forward:e,right:t,up:n}=this.#p();this.#e=F.lookAt(this.#n,R.add(this.#n,e),n)}#f(){this.#t=F.perspective(X(this.#a),this.#o,le,ue)}#p(){let e=X(this.#r),t=X(this.#i),n=R.normalize(R.create(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t))),r=R.normalize(R.cross(n,ce));return{forward:n,right:r,up:R.normalize(R.cross(r,n))}}},fe=`@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var srcSampler: sampler;

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vid: u32) -> VSOut {
    let positions = array<vec2f, 4>(
        vec2f(-1.0f, -1.0f),
        vec2f(-1.0f, 1.0f),
        vec2f(1.0f, -1.0f),
        vec2f(1.0f, 1.0f),
    );

    let p = positions[vid];
    var out: VSOut;
    out.position = vec4f(p, 0.0, 1.0);

    out.uv = vec2f((p.x + 1.0) * 0.5, (1.0 - p.y) * 0.5);
    return out;
}

@fragment
fn fragmentMain(@location(0) uv: vec2f) -> @location(0) vec4f {
    return textureSample(src, srcSampler, uv);
}
`,pe=`// Mostly based on https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu\r
struct GlobalUniforms {\r
    view: mat4x4f,\r
    viewProj: mat4x4f,\r
    cameraPos: vec3f,\r
    count: u32,\r
    focal: vec2f,\r
    tanFov: vec2f,\r
    textureSize: vec2f,\r
    padding0: u32,\r
    padding1: u32,\r
};\r
\r
@group(0) @binding(0) var<uniform> uniforms: GlobalUniforms;\r
\r
// gsParams layout:\r
// positions: array<f32, count * 3>\r
// scales: array<f32, count * 3>\r
// quaternions: array<f32, count * 4>\r
// colors: array<f32, count * 3>\r
// opacites: array<f32, count>\r
// shs: array<f32, count * 45>\r
// All data is stored in a flat array<f32>\r
@group(0) @binding(1) var<storage, read> gsParams: array<f32>;\r
\r
@group(1) @binding(0) var<storage, read_write> outputTilesTouched: array<u32>;\r
@group(1) @binding(1) var<storage, read_write> outputSplatMeta: array<vec4u>;\r
@group(1) @binding(2) var<storage, read_write> outputConicOpacity: array<vec4f>;\r
@group(1) @binding(3) var<storage, read_write> outputPixelPositons: array<vec2f>;\r
@group(1) @binding(4) var<storage, read_write> outputColors: array<vec3f>;\r
\r
const SMALL_VALUE = 0.0000001f;\r
\r
const Z_NEAR_VIEW = 0.2f;\r
const FRUSTUM_EXTENTED = 1.3f;\r
const TILE_SIZE_X = 16u;\r
const TILE_SIZE_Y = 16u;\r
const DEGREE = 3u;\r
const MAX_COEFFICIENTS = 16u;\r
\r
const SH_C0 = 0.28209479177387814f;\r
const SH_C1 = 0.4886025119029199f;\r
const SH_C2_0 = 1.0925484305920792f;\r
const SH_C2_1 = -1.0925484305920792f;\r
const SH_C2_2 = 0.31539156525252005f;\r
const SH_C2_3 = -1.0925484305920792f;\r
const SH_C2_4 = 0.5462742152960396f;\r
const SH_C3_0 = -0.5900435899266435f;\r
const SH_C3_1 = 2.890611442640554f;\r
const SH_C3_2 = -0.4570457994644658f;\r
const SH_C3_3 = 0.3731763325901154f;\r
const SH_C3_4 = -0.4570457994644658f;\r
const SH_C3_5 = 1.445305721320277f;\r
const SH_C3_6 = -0.5900435899266435f;\r
\r
const PREPROCESS_WORKGROUP_SIZE = 32u;\r
\r
@compute @workgroup_size(PREPROCESS_WORKGROUP_SIZE)\r
fn computeMain(@builtin(global_invocation_id) gid: vec3u) {\r
    let gindex = gid.x;\r
    let count = uniforms.count;\r
    if gindex >= count {\r
        return;\r
    }\r
\r
    let positionOffset = u32(0);\r
    let scaleOffset = positionOffset + count * 3;\r
    let quaternionOffset = scaleOffset + count * 3;\r
    let colorOffset = quaternionOffset + count * 4;\r
    let opacityOffset = colorOffset + count * 3;\r
    let shOffest = opacityOffset + count;\r
\r
    let position = getPropertyVec3f(positionOffset, gindex);\r
\r
    let positionView = uniforms.view * vec4f(position, 1.0f);\r
\r
    // Near culling\r
    if positionView.z <= Z_NEAR_VIEW {\r
        return;\r
    }\r
\r
    let positionClip = uniforms.viewProj * vec4f(position, 1.0f);\r
    let positionNdc = positionClip.xyz / (positionClip.w + SMALL_VALUE);\r
    let positionPixel = vec2f(\r
        ndcToPixel(positionNdc.x, uniforms.textureSize.x),\r
        ndcToPixel(positionNdc.y, uniforms.textureSize.y)\r
    );\r
    outputPixelPositons[gindex] = positionPixel;\r
\r
    let scale = getPropertyVec3f(scaleOffset, gindex);\r
    let quaternion = getPropertyVec4f(quaternionOffset, gindex);\r
\r
    let scaleMat3 = scaleToMat3(exp(scale));    // .PLY stores scale as log(scale)\r
    let rotationMat3 = quantToMat3(normalize(vec4f(quaternion.y, quaternion.z, quaternion.w, quaternion.x)));\r
    let covariance = rotationMat3 * scaleMat3 * transpose(scaleMat3) * transpose(rotationMat3);\r
\r
    let covariance2D = calculateCovariance2D(positionView, covariance);\r
    let det = covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y;\r
    let radius = calculateRadius(covariance2D, det);\r
\r
    let conic = vec3f(\r
        covariance2D.z / det,\r
        -covariance2D.y / det,\r
        covariance2D.x / det\r
    );\r
    let opacity = getPropertyF(opacityOffset, gindex);\r
    outputConicOpacity[gindex] = vec4f(conic, opacity);\r
\r
    let dir = normalize(position - uniforms.cameraPos);\r
    outputColors[gindex] = calculateColor(gindex, colorOffset, shOffest, dir);\r
\r
    // Frustum culling\r
    if !isInFrustum(radius, positionPixel) {\r
        return;\r
    }\r
\r
    let boundingMinPx = positionPixel - vec2f(radius);\r
    let boundingMaxPx = positionPixel + vec2f(radius);\r
\r
    let tilesPerRow = (u32(uniforms.textureSize.x) + TILE_SIZE_X - 1u) / TILE_SIZE_X;\r
    let tilesPerColumn = (u32(uniforms.textureSize.y) + TILE_SIZE_Y - 1u) / TILE_SIZE_Y;\r
\r
    // Tile AABB\r
    let minTileX = u32(clamp(floor(boundingMinPx.x / f32(TILE_SIZE_X)), 0.0f, f32(tilesPerRow - 1u)));\r
    let minTileY = u32(clamp(floor(boundingMinPx.y / f32(TILE_SIZE_Y)), 0.0f, f32(tilesPerColumn - 1u)));\r
    let maxTileX = u32(clamp(floor(boundingMaxPx.x / f32(TILE_SIZE_X)), 0.0f, f32(tilesPerRow - 1u)));\r
    let maxTileY = u32(clamp(floor(boundingMaxPx.y / f32(TILE_SIZE_Y)), 0.0f, f32(tilesPerColumn - 1u)));\r
\r
    let depthU16 = u32(saturate(positionNdc.z) * 65535.0f);\r
    let tilesTouched = (maxTileX - minTileX + 1u) * (maxTileY - minTileY + 1u);\r
\r
    outputTilesTouched[gindex] = tilesTouched;\r
    outputSplatMeta[gindex] = vec4u(\r
        (minTileY << 16u) | minTileX,\r
        (maxTileY << 16u) | maxTileX,\r
        depthU16,\r
        0u\r
    );\r
}\r
\r
// Helpers to get property \r
fn getPropertyF(offset: u32, propIndex: u32) -> f32 {\r
    return gsParams[offset + propIndex];\r
}\r
\r
fn getPropertyVec3f(offset: u32, propIndex: u32) -> vec3f {\r
    return vec3f(\r
        gsParams[offset + propIndex * 3],\r
        gsParams[offset + propIndex * 3 + 1],\r
        gsParams[offset + propIndex * 3 + 2]\r
    );\r
}\r
\r
fn getShRest(offset: u32, propIndex: u32, c: u32) -> vec3f {\r
    let base = offset + propIndex * 45u + c;\r
    return vec3f(gsParams[base], gsParams[base + 15u], gsParams[base + 30u]);\r
}\r
\r
fn getPropertyVec4f(offset: u32, propIndex: u32) -> vec4f {\r
    return vec4f(\r
        gsParams[offset + propIndex * 4],\r
        gsParams[offset + propIndex * 4 + 1],\r
        gsParams[offset + propIndex * 4 + 2],\r
        gsParams[offset + propIndex * 4 + 3]\r
    );\r
}\r
\r
fn scaleToMat3(s: vec3f) -> mat3x3f {\r
    return mat3x3f(\r
        vec3f(s.x, 0.0f, 0.0f),\r
        vec3f(0.0f, s.y, 0.0f),\r
        vec3f(0.0f, 0.0f, s.z)\r
    );\r
}\r
\r
fn quantToMat3(q: vec4f) -> mat3x3f {\r
    let x2 = q.x + q.x;\r
    let y2 = q.y + q.y;\r
    let z2 = q.z + q.z;\r
\r
    let xx = q.x * x2;\r
    let xy = q.x * y2;\r
    let xz = q.x * z2;\r
    let yy = q.y * y2;\r
    let yz = q.y * z2;\r
    let zz = q.z * z2;\r
    let wx = q.w * x2;\r
    let wy = q.w * y2;\r
    let wz = q.w * z2;\r
\r
    return mat3x3f(\r
        vec3f(1.0f - (yy + zz), xy + wz, xz - wy),\r
        vec3f(xy - wz, 1.0f - (xx + zz), yz + wx),\r
        vec3f(xz + wy, yz - wx, 1.0f - (xx + yy))\r
    );\r
}\r
\r
fn ndcToPixel(v: f32, s: f32) -> f32 {\r
    return ((v + 1.0f) * s - 1.0f) * 0.5f;\r
}\r
\r
fn calculateJocabian(u: vec4f, f: vec2f) -> mat3x2f {\r
    return mat3x2f(\r
        vec2f(f.x / u.z, 0.0),\r
        vec2f(0.0, f.y / u.z),\r
        vec2f(-f.x * u.x / (u.z * u.z), -f.y * u.y / (u.z * u.z))\r
    );\r
}\r
\r
fn calculateColor(propIndex: u32, colorOffset: u32, shOffset: u32, dir: vec3f) -> vec3f {\r
    let x = dir.x;\r
    let y = dir.y;\r
    let z = dir.z;\r
    let xx = x * x;\r
    let yy = y * y;\r
    let zz = z * z;\r
    let xy = x * y;\r
    let yz = y * z;\r
    let xz = x * z;\r
\r
    var result = SH_C0 * getPropertyVec3f(colorOffset, propIndex)\r
        - SH_C1 * y * getShRest(shOffset, propIndex, 0u)\r
        + SH_C1 * z * getShRest(shOffset, propIndex, 1u)\r
        - SH_C1 * x * getShRest(shOffset, propIndex, 2u)\r
        + SH_C2_0 * xy * getShRest(shOffset, propIndex, 3u)\r
        + SH_C2_1 * yz * getShRest(shOffset, propIndex, 4u)\r
        + SH_C2_2 * (2.0f * zz - xx - yy) * getShRest(shOffset, propIndex, 5u)\r
        + SH_C2_3 * xz * getShRest(shOffset, propIndex, 6u)\r
        + SH_C2_4 * (xx - yy) * getShRest(shOffset, propIndex, 7u)\r
        + SH_C3_0 * y * (3.0f * xx - yy) * getShRest(shOffset, propIndex, 8u)\r
        + SH_C3_1 * xy * z * getShRest(shOffset, propIndex, 9u)\r
        + SH_C3_2 * y * (4.0f * zz - xx - yy) * getShRest(shOffset, propIndex, 10u)\r
        + SH_C3_3 * z * (2.0f * zz - 3.0f * xx - 3.0f * yy) * getShRest(shOffset, propIndex, 11u)\r
        + SH_C3_4 * x * (4.0f * zz - xx - yy) * getShRest(shOffset, propIndex, 12u)\r
        + SH_C3_5 * z * (xx - yy) * getShRest(shOffset, propIndex, 13u)\r
        + SH_C3_6 * x * (xx - 3.0f * yy) * getShRest(shOffset, propIndex, 14u);\r
\r
    result += 0.5f;\r
    return max(result, vec3f(0.0f));\r
}\r
\r
fn calculateCovariance2D(positionView: vec4f, covariance: mat3x3f) -> vec3f {\r
    let lim = FRUSTUM_EXTENTED * uniforms.tanFov;\r
    var t = positionView.xyz;\r
    t.x = min(lim.x, max(-lim.x, t.x / t.z)) * t.z;\r
    t.y = min(lim.y, max(-lim.y, t.y / t.z)) * t.z;\r
\r
    let J = calculateJocabian(vec4f(t, 1.0f), uniforms.focal);\r
    let W = mat3x3f(\r
        uniforms.view[0].xyz,\r
        uniforms.view[1].xyz,\r
        uniforms.view[2].xyz\r
    );\r
\r
    let covariance2D = J * W * covariance * transpose(W) * transpose(J);\r
\r
    // Apply low-pass filter: every Gaussian should be at least\r
    // one pixel wide/high. Discard 3rd row and column.   \r
    return vec3f(covariance2D[0][0] + 0.3f, covariance2D[0][1], covariance2D[1][1] + 0.3f);\r
}\r
\r
fn calculateRadius(covariance: vec3f, det: f32) -> f32 {\r
    let mid = 0.5f * (covariance.x + covariance.z);\r
    let lambda = mid + sqrt(max(0.1f, mid * mid - det));\r
    return ceil(3.0f * sqrt(lambda));\r
}\r
\r
fn isInFrustum(radius: f32, positionPixel: vec2f) -> bool {\r
    if positionPixel.x + radius < 0.0f || positionPixel.x - radius > uniforms.textureSize.x ||\r
        positionPixel.y + radius < 0.0f || positionPixel.y - radius > uniforms.textureSize.y {\r
        return false;\r
    }\r
\r
    return true;\r
}\r
`,me=`struct IndirectArgUniform {\r
    maxInstanceCount: u32,\r
};\r
@group(0) @binding(0) var<uniform> uniforms: IndirectArgUniform;\r
@group(0) @binding(1) var<storage, read> instanceCount: u32;\r
@group(0) @binding(2) var<storage, read_write> outArgBuffer: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> outRadixUniform: array<u32>;\r
\r
const RADIX_BLOCK_SIZE = 256u;    \r
const RADIX_PASS_COUNT = 4u;\r
const RADIX_UNIFORM_STRIDE_U32 = 64u;  \r
\r
@compute @workgroup_size(1)\r
fn computeMain() {\r
    let n = min(instanceCount, uniforms.maxInstanceCount);\r
\r
    outArgBuffer[0] = (n + RADIX_BLOCK_SIZE - 1u) / RADIX_BLOCK_SIZE; \r
    outArgBuffer[1] = 1u;\r
    outArgBuffer[2] = 1u;\r
\r
    for (var p = 0u; p < RADIX_PASS_COUNT; p++) {\r
        outRadixUniform[p * RADIX_UNIFORM_STRIDE_U32] = n;\r
    }\r
}`,Z=`// Radix sort (parallel scan variant): count -> 3-phase prefix sum -> reorder.
// Scan based on 39.2.4 Arrays of Arbitrary Size
// https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-39-parallel-prefix-sum-scan-cuda
struct RadixUniforms {
    instanceCount: u32,
    blockCountMax: u32,
    shiftAmount: u32,
    countsBufferLength: u32,
};

@group(0) @binding(0) var<uniform> uniforms: RadixUniforms;
@group(0) @binding(1) var<storage, read> keys: array<u32>;
@group(0) @binding(2) var<storage, read_write> counts: array<u32>;
@group(0) @binding(3) var<storage, read_write> blockSums: array<u32>;
@group(0) @binding(4) var<storage, read> physicalIndex: array<u32>;

@group(1) @binding(0) var<storage, read_write> outKeys: array<u32>;
@group(1) @binding(1) var<storage, read_write> outPhysicalIndices: array<u32>;

const RADIX_BLOCK_SIZE = 256u;
const RADIX_DIGITS = 256u;
const SCAN_PARALLEL_WORKGROUP_SIZE = 256u;

// ---- Count ----
var<workgroup> localCounts: array<atomic<u32>, RADIX_DIGITS>;

@compute @workgroup_size(RADIX_BLOCK_SIZE)
fn countMain(@builtin(local_invocation_index) lindex: u32, @builtin(workgroup_id) wid: vec3u) {
    atomicStore(&localCounts[lindex], 0u);
    workgroupBarrier();

    let windex = wid.x;
    let i = windex * RADIX_BLOCK_SIZE + lindex;
    if i < uniforms.instanceCount {
        let d = (keys[i] >> uniforms.shiftAmount) & 0xFFu;
        atomicAdd(&localCounts[d], 1u);
    }
    workgroupBarrier();

    counts[lindex * uniforms.blockCountMax + windex] = atomicLoad(&localCounts[lindex]);
}

// ---- Scan (3-phase parallel prefix sum over counts) ----
var<workgroup> temp: array<u32, SCAN_PARALLEL_WORKGROUP_SIZE>;

@compute @workgroup_size(SCAN_PARALLEL_WORKGROUP_SIZE)
fn scanLocalMain(@builtin(local_invocation_index) lindex: u32, @builtin(workgroup_id) wid: vec3u, @builtin(num_workgroups) numWg: vec3u) {
    let windex = wid.y * numWg.x + wid.x;
    let numBlocks = (uniforms.countsBufferLength + SCAN_PARALLEL_WORKGROUP_SIZE - 1u) / SCAN_PARALLEL_WORKGROUP_SIZE;

    let n = uniforms.countsBufferLength;
    let i = windex * SCAN_PARALLEL_WORKGROUP_SIZE + lindex;

    var c = 0u;
    if i < n {
        c = counts[i];
    }
    temp[lindex] = c;
    workgroupBarrier();

    scanBlockInclusive(lindex);

    let blockTotal = temp[SCAN_PARALLEL_WORKGROUP_SIZE - 1u];
    if i < n {
        counts[i] = temp[lindex] - c;   // block local prefix
    }
    if lindex == 0u && windex < numBlocks {
        blockSums[windex] = blockTotal;     // block sum
    }
}

@compute @workgroup_size(SCAN_PARALLEL_WORKGROUP_SIZE)
fn scanBlockSumsMain(@builtin(local_invocation_index) lindex: u32) {
    let numBlocks = (uniforms.countsBufferLength + SCAN_PARALLEL_WORKGROUP_SIZE - 1) / SCAN_PARALLEL_WORKGROUP_SIZE;

    var carry = 0u;
    let chunks = (numBlocks + SCAN_PARALLEL_WORKGROUP_SIZE - 1u) / SCAN_PARALLEL_WORKGROUP_SIZE;
    for (var b = 0u; b < chunks; b++) {
        let i = b * SCAN_PARALLEL_WORKGROUP_SIZE + lindex;

        var c = 0u;
        if i < numBlocks {
            c = blockSums[i];
        }
        temp[lindex] = c;
        workgroupBarrier();

        scanBlockInclusive(lindex);

        let inLanePrefix = temp[lindex] - c; // exclusive within chunk
        let chunkTotal = temp[SCAN_PARALLEL_WORKGROUP_SIZE - 1u];

        if i < numBlocks {
            blockSums[i] = carry + inLanePrefix; // global exclusive offset
        }
        workgroupBarrier();

        carry += chunkTotal;
        workgroupBarrier();
    }
}

@compute @workgroup_size(SCAN_PARALLEL_WORKGROUP_SIZE)
fn scanAddOffsetMain(@builtin(local_invocation_index) lindex: u32, @builtin(workgroup_id) wid: vec3u, @builtin(num_workgroups) numWg: vec3u) {
    let windex = wid.y * numWg.x + wid.x;
    let n = uniforms.countsBufferLength;
    let i = windex * SCAN_PARALLEL_WORKGROUP_SIZE + lindex;
    if i < n {
        counts[i] += blockSums[windex];
    }
}

// Inclusive Hillis-Steele over temp[], caller converts to exclusive
fn scanBlockInclusive(lindex: u32) {
    for (var shift = 1u; shift < SCAN_PARALLEL_WORKGROUP_SIZE; shift = shift << 1u) {
        var prefix = 0u;

        if shift <= lindex {
            prefix = temp[lindex - shift];
        }

        workgroupBarrier();
        temp[lindex] = temp[lindex] + prefix;
        workgroupBarrier();
    }
}

// ---- Reorder (stable scatter using scanned prefix sums in counts) ----
var<workgroup> localDigit: array<u32, RADIX_BLOCK_SIZE>;

@compute @workgroup_size(RADIX_BLOCK_SIZE)
fn reorderMain(@builtin(local_invocation_index) lindex: u32, @builtin(workgroup_id) wid: vec3u) {
    let windex = wid.x;
    let i = windex * RADIX_BLOCK_SIZE + lindex; // global index

    var d = 0u;
    var valid = false;
    if i < uniforms.instanceCount {
        valid = true;
        d = (keys[i] >> uniforms.shiftAmount) & 0xFFu;
    }
    localDigit[lindex] = d;
    workgroupBarrier();

    if valid {
        var rank = 0u;
        // Count same digits before current thread in this workgroup
        for (var j = 0u; j < lindex; j++) {
            if localDigit[j] == d {
                rank++;
            }
        }

        let base = counts[d * uniforms.blockCountMax + windex];
        let pos = base + rank;

        outKeys[pos] = keys[i];
        outPhysicalIndices[pos] = physicalIndex[i];
    }
}
`,he=`@group(0) @binding(0) var<storage, read> keys: array<u32>;\r
@group(0) @binding(1) var<storage, read> instanceCount: u32;\r
@group(0) @binding(2) var<storage, read_write> outRanges: array<u32>; \r
\r
const TILE_RANGE_WORKGROUP_SIZE = 256u;\r
\r
@compute @workgroup_size(TILE_RANGE_WORKGROUP_SIZE)\r
fn computeMain(@builtin(global_invocation_id) gid: vec3u) {\r
    let gindex = gid.x;\r
    if gindex >= instanceCount {\r
        return;\r
    }\r
\r
    let tileIndex = keys[gindex] >> 16u;\r
\r
    if gindex == 0u {\r
        outRanges[tileIndex * 2] = 0u;\r
    }\r
    else {\r
        let prevTileIndex = keys[gindex - 1] >> 16u;\r
\r
        if tileIndex > prevTileIndex {\r
            outRanges[prevTileIndex * 2 + 1] = gindex;\r
            outRanges[tileIndex * 2] = gindex;\r
        }\r
    }\r
\r
    if gindex == instanceCount - 1u {\r
        outRanges[tileIndex * 2 + 1] = instanceCount;\r
    }\r
}`,ge=`// Based on https://github1s.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu\r
struct GlobalUniforms {\r
    view: mat4x4f,\r
    viewProj: mat4x4f,\r
    cameraPos: vec3f,\r
    count: u32,\r
    focal: vec2f,\r
    tanFov: vec2f,\r
    textureSize: vec2f,\r
    padding0: u32,\r
    padding1: u32,\r
};\r
@group(0) @binding(0) var<uniform> uniforms: GlobalUniforms;\r
@group(0) @binding(1) var<storage, read> conicOpacities: array<vec4f>;\r
@group(0) @binding(2) var<storage, read> pixelPositons: array<vec2f>;\r
@group(0) @binding(3) var<storage, read> colors: array<vec3f>;\r
@group(0) @binding(4) var<storage, read> physicalIndices: array<u32>;\r
@group(0) @binding(5) var<storage, read> tileRanges: array<u32>;\r
@group(0) @binding(6) var output: texture_storage_2d<rgba8unorm, write>;\r
\r
const TILE_SIZE_X = 16u;\r
const TILE_SIZE_Y = 16u;\r
const TIlE_SIZE = TILE_SIZE_X * TILE_SIZE_Y;\r
\r
const ALPHA_CLAMP = 0.99f;\r
const EPSILON = 1.0f / 255.0f;\r
const BLEND_THRESHOLD = 0.0001f;\r
\r
var<workgroup> localPhysicalIndices: array<u32, 256>;\r
var<workgroup> localConicOpacities: array<vec4f, 256>;\r
var<workgroup> localPixelPositions: array<vec2f, 256>;\r
var<workgroup> doneCount: atomic<u32>;\r
var<workgroup> allDone: u32;\r
\r
@compute @workgroup_size(TILE_SIZE_X, TILE_SIZE_Y )\r
fn computeMain(@builtin(local_invocation_index) lindex: u32, @builtin(workgroup_id) wid: vec3u, @builtin(global_invocation_id) gid: vec3u) {\r
    let px = gid.xy;\r
    let isInside = all(px < vec2u(uniforms.textureSize));\r
    var done = !isInside;\r
\r
    let tilesPerRow = (u32(uniforms.textureSize.x) + TILE_SIZE_X - 1u) / TILE_SIZE_X;\r
    let tileIndex = wid.y * tilesPerRow + wid.x;\r
    let start = tileRanges[tileIndex * 2];\r
    let end = tileRanges[tileIndex * 2 + 1];\r
    var toDo = end - start;\r
\r
    var contributor = 0u;\r
    var lastContributor = 0u;\r
    var T = 1.0f;\r
    var color = vec3f(0.0f);\r
\r
    for (var i = start; i < end; i += TIlE_SIZE) {\r
        // Break once every pixel in the tile is done (saturated or outside).\r
        workgroupBarrier();\r
        if lindex == 0u {\r
            atomicStore(&doneCount, 0u);\r
        }\r
        workgroupBarrier();\r
        if done {\r
            atomicAdd(&doneCount, 1u);\r
        }\r
        workgroupBarrier();\r
        if lindex == 0u {\r
            allDone = select(0u, 1u, atomicLoad(&doneCount) == TIlE_SIZE);\r
        }\r
        if workgroupUniformLoad(&allDone) == 1u {\r
            break;\r
        }\r
\r
        // Cooperatively load this batch into shared mem (guard against reading past the tile range).\r
        let loadIndex = i + lindex;\r
        if loadIndex < end {\r
            let physicalIndex = physicalIndices[loadIndex];\r
            localPhysicalIndices[lindex] = physicalIndex;\r
            localConicOpacities[lindex] = conicOpacities[physicalIndex];\r
            localPixelPositions[lindex] = pixelPositons[physicalIndex];\r
        }\r
        workgroupBarrier();\r
\r
        for (var j = 0u; !done && j < min(TIlE_SIZE, toDo); j++) {\r
            contributor++;\r
\r
            let conicOpacity = localConicOpacities[j];\r
            let power = calculatePower(j, conicOpacity, vec2f(px));\r
            if power > 0.0f {\r
                continue;\r
            }\r
\r
            let alpha = min(ALPHA_CLAMP, conicOpacity.w * exp(power));\r
            if alpha < EPSILON {\r
                continue;\r
            }\r
            let testT = T * (1.0f - alpha);\r
            if testT < BLEND_THRESHOLD {\r
                done = true;\r
                continue;\r
            }\r
\r
            color += colors[localPhysicalIndices[j]] * alpha * T;\r
\r
            T = testT;\r
            lastContributor = contributor;\r
        }\r
\r
        toDo -= TIlE_SIZE;\r
    }\r
\r
    if isInside {\r
        textureStore(output, px, vec4f(color, 1.0f));\r
    }\r
}\r
\r
fn calculatePower(localIndex: u32, conicOpacity: vec4f, px: vec2f) -> f32 {\r
    let positionPixel = localPixelPositions[localIndex];\r
    let d = positionPixel - px;\r
    return -0.5f * (conicOpacity.x * d.x * d.x + conicOpacity.z * d.y * d.y) - conicOpacity.y * d.x * d.y;\r
}`,_e=`struct GlobalUniforms {\r
    view: mat4x4f,\r
    viewProj: mat4x4f,\r
    cameraPos: vec3f,\r
    count: u32,\r
    focal: vec2f,\r
    tanFov: vec2f,\r
    textureSize: vec2f,\r
    padding0: u32,\r
    padding1: u32,\r
};\r
\r
@group(0) @binding(0) var<uniform> uniforms: GlobalUniforms;\r
@group(0) @binding(1) var<storage, read_write> offsets: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> outInstanceCount: u32;\r
\r
const OFFSET_SCAN_WORKGROUP_SIZE = 256u;\r
\r
var<workgroup> temp: array<u32, OFFSET_SCAN_WORKGROUP_SIZE>;\r
var<workgroup> carry: u32;\r
\r
@compute @workgroup_size(OFFSET_SCAN_WORKGROUP_SIZE)\r
fn computeMain(@builtin(local_invocation_index) lindex: u32) {\r
    let n = uniforms.count + 1u;\r
    if lindex == 0u {\r
        carry = 0u;\r
    }\r
    workgroupBarrier();\r
\r
    // Similar to Radix sort\r
    let blockCounts = (n + OFFSET_SCAN_WORKGROUP_SIZE - 1u) / OFFSET_SCAN_WORKGROUP_SIZE;\r
    for (var b = 0u; b < blockCounts; b++) {\r
        let i = b * OFFSET_SCAN_WORKGROUP_SIZE + lindex;\r
        var c = 0u;\r
        if i < n {\r
            c = offsets[i];\r
        }\r
        temp[lindex] = c;\r
        workgroupBarrier();\r
\r
        for (var shift = 1u; shift < OFFSET_SCAN_WORKGROUP_SIZE; shift = shift << 1u) {\r
            var prefix = 0u;\r
            if shift <= lindex {\r
                prefix = temp[lindex - shift];\r
            }\r
            workgroupBarrier();\r
            temp[lindex] = temp[lindex] + prefix;\r
            workgroupBarrier();\r
        }\r
\r
        let inLanePrefix = temp[lindex] - c;\r
        let blockTotal = temp[OFFSET_SCAN_WORKGROUP_SIZE - 1u];\r
\r
        if i < n {\r
            offsets[i] = carry + inLanePrefix;\r
        }\r
        workgroupBarrier();\r
\r
        if lindex == 0u {\r
            carry += blockTotal;\r
        }\r
        workgroupBarrier();\r
    }\r
\r
    if lindex == 0u {\r
        outInstanceCount = carry;\r
    }\r
}`,ve=`struct GlobalUniforms {\r
    view: mat4x4f,\r
    viewProj: mat4x4f,\r
    cameraPos: vec3f,\r
    count: u32,\r
    focal: vec2f,\r
    tanFov: vec2f,\r
    textureSize: vec2f,\r
    padding0: u32,\r
    padding1: u32,\r
};\r
\r
struct IndirectArgUniform {\r
    maxInstanceCount: u32,\r
};\r
\r
@group(0) @binding(0) var<uniform> uniforms: GlobalUniforms;\r
@group(0) @binding(1) var<storage, read> offsets: array<u32>;\r
@group(0) @binding(2) var<storage, read> splatMeta: array<vec4u>;\r
@group(0) @binding(3) var<uniform> arg: IndirectArgUniform;\r
\r
@group(1) @binding(0) var<storage, read_write> outKeys: array<u32>;\r
@group(1) @binding(1) var<storage, read_write> outPhysicaslIndices: array<u32>;\r
\r
const TILE_SIZE_X = 16u;\r
const EMIT_WORKGROUP_SIZE = 256u;\r
\r
@compute @workgroup_size(EMIT_WORKGROUP_SIZE)\r
fn computeMain(@builtin(global_invocation_id) gid: vec3u) {\r
    let gindex = gid.x;\r
    if gindex >= uniforms.count {\r
        return;\r
    }\r
\r
    let base = offsets[gindex];\r
    let n = offsets[gindex + 1] - base;\r
    if n == 0u {\r
        return;\r
    }\r
\r
    let metaData = splatMeta[gindex];\r
    let minTileX = metaData.x & 0xFFFFu;\r
    let minTileY = metaData.x >> 16u;\r
    let maxTileX = metaData.y & 0xFFFFu;\r
    let maxTileY = metaData.y >> 16u;\r
    let depth16U = metaData.z & 0xFFFFu;\r
\r
    let tilesPerRow = (u32(uniforms.textureSize.x) + TILE_SIZE_X - 1u) / TILE_SIZE_X;\r
\r
    var slot = base;\r
    for (var ty = minTileY; ty <= maxTileY; ty++) {\r
        for (var tx = minTileX; tx <= maxTileX; tx++) {\r
            if slot >= arg.maxInstanceCount {\r
                return;\r
            }\r
\r
            let tileId = ty * tilesPerRow + tx;\r
            outKeys[slot] = (tileId << 16u) | depth16U;\r
            outPhysicaslIndices[slot] = gindex;\r
            slot++;\r
        }\r
    }\r
}`,ye=4,be=64,xe=32,Se=256,Q=256,Ce=2,we=16,Te=16,Ee=16,De=8,Oe=16,ke=8,Ae=176,je=4,$=16,Me=256,Ne=4,Pe=256,Fe=256,Ie=65535,Le=class{#e;#t;#n;#r;#i;#a;#o;#s;#c;#l;#u;#d;#f;#p;#m;#h;#g;#_;#v;#y;#b;#x;#S;#C;#w;#T;#E;#D;#O;#k;#A;#j;#M;#N;#P;#F;#I;#L;#R;#z;#B;#V;#H;#U;#W;#G;#K;#q;#J;#Y;#X;#Z;#Q;#$;#ee;#te;#ne;#re;constructor(e,t,r){this.#e=e,this.#t=t,this.#n=r,this.#re=new ne(e),this.#w=this.#e.createBuffer({label:`global uniform buffer`,size:Ae,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.#T=this.#e.createBuffer({label:`radix uniform buffer`,size:Ne*Pe,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.#E=this.#e.createBuffer({label:`indirect arg uniform buffer`,size:je,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.#g=this.#e.createBuffer({label:`instance count buffer`,size:4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.#_=this.#e.createBuffer({label:`indirect args buffer`,size:12,usage:GPUBufferUsage.INDIRECT|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});let i=(t,n,r,i=`compute`)=>this.#e.createComputePipeline({label:`${t} compute pipeline`,layout:e.createPipelineLayout({bindGroupLayouts:r}),compute:{module:n,entryPoint:`${i}Main`}}),a=(t,n,r,i)=>this.#e.createRenderPipeline({label:`${t} render pipeline`,layout:e.createPipelineLayout({bindGroupLayouts:r}),vertex:{module:n,entryPoint:`vertexMain`},fragment:{module:n,entryPoint:`fragmentMain`,targets:[{format:this.#n}]},primitive:i}),o=(t,r,i,a)=>i(t,n(e,`${t} shader`,r),a.map(e=>this.#e.createBindGroupLayout({entries:e})));this.#O=o(`preprocess`,pe,i,[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}}],[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]]),this.#j=o(`indirect arg`,me,i,[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]]),this.#N=o(`count`,Z,(e,t,n)=>i(e,t,n,`count`),[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`,hasDynamicOffset:!0}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]]);let s=[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`,hasDynamicOffset:!0}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]];this.#F=o(`scan local`,Z,(e,t,n)=>i(e,t,n,`scanLocal`),s),this.#I=o(`scan block sums`,Z,(e,t,n)=>i(e,t,n,`scanBlockSums`),s),this.#L=o(`scan add offset`,Z,(e,t,n)=>i(e,t,n,`scanAddOffset`),s),this.#z=o(`offset scan`,_e,i,[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]]),this.#V=o(`emit`,ve,i,[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`}}],[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]]),this.#W=o(`reorder`,Z,(e,t,n)=>i(e,t,n,`reorder`),[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`,hasDynamicOffset:!0}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}}],[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]]),this.#q=o(`blit`,fe,(e,t,n)=>a(e,t,n,{topology:`triangle-strip`,cullMode:`none`}),[[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{format:this.#n,viewDimension:`2d`}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:`filtering`}}]]),this.#Y=o(`tile ranges`,he,i,[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]]),this.#Z=o(`raster`,ge,i,[[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:`read-only-storage`}},{binding:6,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:`write-only`,format:`rgba8unorm`,viewDimension:`2d`}}]]),this.#D=this.#e.createSampler({label:`linear sampler`,magFilter:`linear`,minFilter:`linear`}),this.#r=0,this.#i=0,this.#ne=new de(this.#r,this.#i),this.#s=new Map,this.#c=``,this.#l=``,this.#f=[],this.#p=[],this.#m=null,this.#h=null,this.#v=null,this.#y=null,this.#b=null,this.#x=null,this.#S=null,this.#C=null,this.#k=null,this.#A=null,this.#M=null,this.#P=[],this.#R=null,this.#B=null,this.#H=null,this.#U=null,this.#G=[],this.#K=[],this.#J=null,this.#X=null,this.#Q=null,this.#te=!0}setGs(t){this.#s.has(t)||e(`Invalid Gs buffer for name "${t}"`),this.#c=t}uploadGsData(e,t){let n=this.#e.createBuffer({label:`${t} gs buffer`,size:e.packed.byteLength,usage:GPUBufferUsage.STORAGE,mappedAtCreation:!0});new Float32Array(n.getMappedRange()).set(e.packed),n.unmap(),this.#s.set(t,{buffer:n,count:e.count})}execute(){let e=performance.now(),t=this.#o===void 0?0:(e-this.#o)/1e3;if(this.#o=e,this.#ie(),this.#ne.update(t),!this.#ne.pollDirty()&&!this.#te&&this.#c===this.#l)return;this.#ae();let n=this.#e.createCommandEncoder({label:`frame encoder`});this.#oe(n),this.#e.queue.submit([n.finish()]),this.#re.afterSubmit(),++this.#a}#ie(){let{width:e,height:t}=this.#t.canvas;e===this.#r&&t===this.#i||(this.#r=e,this.#i=t,this.#ne.resize(e,t),this.#u?.destroy(),this.#u=this.#e.createTexture({label:`compute output`,size:[e,t],format:`rgba8unorm`,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),this.#d=this.#u.createView(),this.#te=!0)}#ae(){this.#s.has(this.#c)||e(`GS ${name} does not exist`);let t=this.#s.get(this.#c),n=t.count*be,r=!1;if(this.#c!==this.#l){this.#l=this.#c;let e=(e,t)=>this.#e.createBuffer({label:e,size:t,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});this.#f=Array.from({length:Ce},(t,r)=>(this.#f[r]?.destroy(),e(`key buffer ${r}`,n*4))),this.#p=Array.from({length:Ce},(t,r)=>(this.#p[r]?.destroy(),e(`physical indices buffer ${r}`,n*4))),this.#m?.destroy(),this.#m=e(`count prefix sum buffer`,Me*Math.ceil(n/Q)*4),this.#h?.destroy(),this.#h=e(`scan block sums buffer`,Math.ceil(Me*Math.ceil(n/Q)/Fe)*4),this.#v?.destroy(),this.#v=e(`offsets buffer`,(t.count+1)*4),this.#y?.destroy(),this.#y=e(`splat meta buffer`,t.count*16),this.#b?.destroy(),this.#b=e(`conic opacity buffer`,t.count*Ee),this.#x?.destroy(),this.#x=e(`pixel positions buffer`,t.count*De),this.#S?.destroy(),this.#S=e(`colors buffer`,t.count*Oe),r=!0}let i=this;a(),s(),o(),this.#te&&(()=>{this.#$=Math.ceil(this.#r/we),this.#ee=Math.ceil(this.#i/Te);let e=this.#$*this.#ee;this.#C?.destroy(),this.#C=this.#e.createBuffer({label:`tile ranges buffer`,size:e*ke,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.#J=this.#e.createBindGroup({label:`blit bindGroup`,layout:this.#q.getBindGroupLayout(0),entries:[{binding:0,resource:this.#d},{binding:1,resource:this.#D}]})})(),r&&(this.#k=this.#e.createBindGroup({label:`preprocess bind group 0`,layout:this.#O.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#w}},{binding:1,resource:{buffer:t.buffer}}]}),this.#A=this.#e.createBindGroup({label:`preprocess bind group 1`,layout:this.#O.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this.#v}},{binding:1,resource:{buffer:this.#y}},{binding:2,resource:{buffer:this.#b}},{binding:3,resource:{buffer:this.#x}},{binding:4,resource:{buffer:this.#S}}]}),this.#M=this.#e.createBindGroup({label:`indirect arg bind group`,layout:this.#j.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#E}},{binding:1,resource:{buffer:this.#g}},{binding:2,resource:{buffer:this.#_}},{binding:3,resource:{buffer:this.#T}}]}),this.#P[0]=this.#e.createBindGroup({label:`count bind group (ping, read keys[0])`,layout:this.#N.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#T,size:$}},{binding:1,resource:{buffer:this.#f[0]}},{binding:2,resource:{buffer:this.#m}}]}),this.#P[1]=this.#e.createBindGroup({label:`count bind group (pong, read keys[1])`,layout:this.#N.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#T,size:$}},{binding:1,resource:{buffer:this.#f[1]}},{binding:2,resource:{buffer:this.#m}}]}),this.#R=this.#e.createBindGroup({label:`scan parallel bind group`,layout:this.#F.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#T,size:$}},{binding:2,resource:{buffer:this.#m}},{binding:3,resource:{buffer:this.#h}}]}),this.#B=this.#e.createBindGroup({label:`offset scan bind group`,layout:this.#z.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#w}},{binding:1,resource:{buffer:this.#v}},{binding:2,resource:{buffer:this.#g}}]}),this.#H=this.#e.createBindGroup({label:`emit bind group 0`,layout:this.#V.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#w}},{binding:1,resource:{buffer:this.#v}},{binding:2,resource:{buffer:this.#y}},{binding:3,resource:{buffer:this.#E}}]}),this.#U=this.#e.createBindGroup({label:`emit bind group 1`,layout:this.#V.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this.#f[0]}},{binding:1,resource:{buffer:this.#p[0]}}]}),this.#G[0]=this.#e.createBindGroup({label:`reorder bind group 0 (ping, read keys[0])`,layout:this.#W.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#T,size:$}},{binding:1,resource:{buffer:this.#f[0]}},{binding:2,resource:{buffer:this.#m}},{binding:4,resource:{buffer:this.#p[0]}}]}),this.#K[0]=this.#e.createBindGroup({label:`reorder bind group 1 (ping, write keys[1])`,layout:this.#W.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this.#f[1]}},{binding:1,resource:{buffer:this.#p[1]}}]}),this.#G[1]=this.#e.createBindGroup({label:`reorder bind group 0 (pong, read keys[1])`,layout:this.#W.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#T,size:$}},{binding:1,resource:{buffer:this.#f[1]}},{binding:2,resource:{buffer:this.#m}},{binding:4,resource:{buffer:this.#p[1]}}]}),this.#K[1]=this.#e.createBindGroup({label:`reorder bind group 1 (pong, write keys[0])`,layout:this.#W.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this.#f[0]}},{binding:1,resource:{buffer:this.#p[0]}}]})),(this.#te||r)&&(this.#X=this.#e.createBindGroup({label:`tile ranges bind group`,layout:this.#Y.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#f[0]}},{binding:1,resource:{buffer:this.#g}},{binding:2,resource:{buffer:this.#C}}]}),this.#Q=this.#e.createBindGroup({label:`raster bind group`,layout:this.#Z.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#w}},{binding:1,resource:{buffer:this.#b}},{binding:2,resource:{buffer:this.#x}},{binding:3,resource:{buffer:this.#S}},{binding:4,resource:{buffer:this.#p[0]}},{binding:5,resource:{buffer:this.#C}},{binding:6,resource:this.#d}]})),this.#te=!1;function a(){let e=new ArrayBuffer(Ae),n=new Float32Array(e),r=new Uint32Array(e),{view:a,projView:o,eye:s,focal:c,tanFov:l}=i.#ne.getUniform();n.set(a,0),n.set(o,16),n.set(s,32),r[35]=t.count,n.set(c,36),n.set(l,38),n.set([i.#r,i.#i],40),i.#e.queue.writeBuffer(i.#w,0,e)}function o(){let e=Math.ceil(n/Q),t=Me*e,r=new ArrayBuffer(Ne*Pe);for(let i=0;i<Ne;++i){let a=new Uint32Array(r,i*Pe,4);a[0]=n,a[1]=e,a[2]=i*8,a[3]=t}i.#e.queue.writeBuffer(i.#T,0,r)}function s(){let e=new ArrayBuffer(je),t=new Uint32Array(e);t[0]=n,i.#e.queue.writeBuffer(i.#E,0,e)}}#oe(e){let t=this.#s.get(this.#c).count;this.#re.begin(),e.clearBuffer(this.#v);let n=(e,t,n,r)=>{e.setPipeline(t),n.forEach((t,n)=>{let[r,i]=Array.isArray(t)?t:[t];e.setBindGroup(n,r,i)}),r(e),e.end()};n(e.beginComputePass({label:`preprocess pass`,timestampWrites:this.#re.write(`preprocess`)}),this.#O,[this.#k,this.#A],e=>e.dispatchWorkgroups(Math.ceil(t/xe))),n(e.beginComputePass({label:`offset scan pass`,timestampWrites:this.#re.write(`offset scan`)}),this.#z,[this.#B],e=>e.dispatchWorkgroups(1)),n(e.beginComputePass({label:`emit pass`,timestampWrites:this.#re.write(`emit`)}),this.#V,[this.#H,this.#U],e=>e.dispatchWorkgroups(Math.ceil(t/Se))),n(e.beginComputePass({label:`indirect arg pass`,timestampWrites:this.#re.write(`indirect arg`)}),this.#j,[this.#M],e=>e.dispatchWorkgroups(1));let r=Me*Math.ceil(t*be/Q),i=Math.ceil(r/Fe),a=Math.min(i,Ie),o=Math.ceil(i/a);for(let t=0;t<Ne;++t){let r=t&1,i=[t*Pe];e.clearBuffer(this.#m),n(e.beginComputePass({label:`count pass`,timestampWrites:this.#re.write(`count`)}),this.#N,[[this.#P[r],i]],e=>e.dispatchWorkgroupsIndirect(this.#_,0)),n(e.beginComputePass({label:`scan local pass`,timestampWrites:this.#re.write(`scan local`)}),this.#F,[[this.#R,i]],e=>e.dispatchWorkgroups(a,o)),n(e.beginComputePass({label:`scan block sums pass`,timestampWrites:this.#re.write(`scan block sums`)}),this.#I,[[this.#R,i]],e=>e.dispatchWorkgroups(1)),n(e.beginComputePass({label:`scan add offset pass`,timestampWrites:this.#re.write(`scan add offset`)}),this.#L,[[this.#R,i]],e=>e.dispatchWorkgroups(a,o)),n(e.beginComputePass({label:`reorder pass`,timestampWrites:this.#re.write(`reorder`)}),this.#W,[[this.#G[r],i],this.#K[r]],e=>e.dispatchWorkgroupsIndirect(this.#_,0))}e.clearBuffer(this.#C),n(e.beginComputePass({label:`tile ranges pass`,timestampWrites:this.#re.write(`tile ranges`)}),this.#Y,[this.#X],e=>e.dispatchWorkgroupsIndirect(this.#_,0)),n(e.beginComputePass({label:`raster pass`,timestampWrites:this.#re.write(`raster`)}),this.#Z,[this.#Q],e=>e.dispatchWorkgroups(this.#$,this.#ee)),n(e.beginRenderPass({label:`blit pass`,colorAttachments:[{view:this.#t.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:`clear`,storeOp:`store`}],timestampWrites:this.#re.write(`blit`)}),this.#q,[this.#J],e=>e.draw(ye)),this.#re.resolve(e)}},Re=[`x`,`y`,`z`,`scale_0`,`scale_1`,`scale_2`,`rot_0`,`rot_1`,`rot_2`,`rot_3`,`opacity`,`f_dc_0`,`f_dc_1`,`f_dc_2`,...Array.from({length:45},(e,t)=>`f_rest_${t}`)],ze={char:1,uchar:1,int8:1,uint8:1,short:2,ushort:2,int16:2,uint16:2,int:4,uint:4,int32:4,uint32:4,float:4,float32:4,double:8,float64:8},Be={char:(e,t)=>e.getInt8(t),uchar:(e,t)=>e.getUint8(t),int8:(e,t)=>e.getInt8(t),uint8:(e,t)=>e.getUint8(t),short:(e,t)=>e.getInt16(t,!0),ushort:(e,t)=>e.getUint16(t,!0),int16:(e,t)=>e.getInt16(t,!0),uint16:(e,t)=>e.getUint16(t,!0),int:(e,t)=>e.getInt32(t,!0),uint:(e,t)=>e.getUint32(t,!0),int32:(e,t)=>e.getInt32(t,!0),uint32:(e,t)=>e.getUint32(t,!0),float:(e,t)=>e.getFloat32(t,!0),float32:(e,t)=>e.getFloat32(t,!0),double:(e,t)=>e.getFloat64(t,!0),float64:(e,t)=>e.getFloat64(t,!0)};async function Ve(t){let n=await fetch(t);return n.ok||e(`Failed to load PLY (${t}): ${n.status} ${n.statusText}`),He(t,await n.arrayBuffer())}function He(t,n){let r=new Date;console.log(`[${r.getHours()}:${r.getMinutes()}:${r.getSeconds()}:${r.getMilliseconds()}]Started loading ${t}`);let i=new Uint8Array(n),a=b(),o=Ue(t,new TextDecoder(`ascii`).decode(i.subarray(0,a))),s=new Set(o.properties.map(e=>e.name));for(let n of Re)s.has(n)||e(`Invalid PLY (${t}): missing required property "${n}"`);let{count:c,properties:l,stride:u}=o,d=new DataView(n),f=new Map(l.map(e=>[e.name,e])),p={count:c,packed:new Float32Array(c*59)},m=0+c*3,h=m+c*3,g=h+c*4,_=g+c*3,v=_+c,y=0;for(let e=0;e<c;++e)y=a+e*u,p.packed[0+e*3]=x(`x`),p.packed[0+e*3+1]=x(`y`),p.packed[0+e*3+2]=x(`z`),p.packed[m+e*3]=x(`scale_0`),p.packed[m+e*3+1]=x(`scale_1`),p.packed[m+e*3+2]=x(`scale_2`),p.packed[h+e*4]=x(`rot_0`),p.packed[h+e*4+1]=x(`rot_1`),p.packed[h+e*4+2]=x(`rot_2`),p.packed[h+e*4+3]=x(`rot_3`),p.packed[g+e*3]=x(`f_dc_0`),p.packed[g+e*3+1]=x(`f_dc_1`),p.packed[g+e*3+2]=x(`f_dc_2`),p.packed[_+e]=x(`opacity`),S(e);return r=new Date,console.log(`[${r.getHours()}:${r.getMinutes()}:${r.getSeconds()}:${r.getMilliseconds()}]Finish loading ${t}`),p;function b(){let n=new TextDecoder(`ascii`).decode(i).indexOf(`end_header`);n===-1&&e(`Invalid PLY (${t}): "end_header" not found`);let r=n+10;return i[r]===13&&++r,i[r]===10&&++r,r}function x(e){let t=f.get(e);return Be[t.type](d,y+t.offset)}function S(e){for(let t=0;t<45;++t)p.packed[v+e*45+t]=x(`f_rest_${t}`)}}function Ue(t,n){let r=0,i=!1,a=null,o=!1,s=[],c=0;return n.split(`
`).forEach(e=>{let t=e.trim().split(/\s+/);t[0]===`format`&&l(t),t[0]===`element`&&u(t),t[0]===`property`&&a===`vertex`&&d(t)}),o||e(`Invalid PLY (${t}): missing "format" line`),i||e(`Invalid PLY (${t}): unsupported format`),r<=0&&e(`Invalid PLY (${t}): vertex count missing or zero`),{count:r,properties:s,stride:c};function l(e){o=!0,i=e[1]===`binary_little_endian`}function u(e){a=e[1],a===`vertex`&&(r=parseInt(e[2],10))}function d(n){n[1]===`list`&&e(`Invalid PLY (${t}): list properties are not supported"`);let r=n[1],i=n[2];r in ze||e(`Invalid PLY (${t}): unknown property type "${r}"`),s.push({name:i,type:r,offset:c}),c+=ze[r]}}var We=`gpu-canvas`,Ge=`../assets/strawberry.ply`,Ke=`../assets/castle.ply`;async function qe(){let e=await t(),n=document.getElementById(We),{context:a,format:o}=r(e,n),s=Promise.all([Ve(Ge),Ve(Ke)]),c=new Le(e,a,o),[l,u]=await s;c.uploadGsData(l,`strawberry`),c.uploadGsData(u,`castle`),c.setGs(`strawberry`),i(e,n,()=>{c.execute()});function d(){c.execute(),requestAnimationFrame(d)}requestAnimationFrame(d)}try{await qe()}catch(e){console.error(`Fatal error in main: ${e}`)}