import{e as g,r as a,j as e,a as v}from"./app-Bfv3GMc6.js";import{D as o}from"./Dropdown-ycu12ubr.js";import{M as x}from"./Modal-CTE7Vq7C.js";import w from"./DeleteProject-CGLT9VVf.js";import P from"./UpdateProject-BJOSXFdB.js";import{a as N,b,I as M}from"./IconTrash-5LH0onsY.js";import"./transition-DHpjhY5I.js";import"./DangerButton-B3-B_5q2.js";import"./SecondaryButton-QNtoH7kM.js";import"./InputError-AfcPBs2v.js";import"./InputLabel-DQ-I2VZW.js";import"./TextInput-_JHfbmkg.js";import"./PrimaryButton-_KXdAZ-4.js";import"./createReactComponent-BEmKhJzi.js";function y({avatar:s}){return g.createElement("div",{dangerouslySetInnerHTML:{__html:s}})}function L({projects:s,auth:r}){const[j,l]=a.useState(!1),[h,i]=a.useState(!1),[n,d]=a.useState(null),p=t=>{d(t),i(!0)},u=t=>{d(t),l(!0)},c=()=>{l(!1)},m=()=>{i(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 gap-2",children:s.map((t,f)=>e.jsxs("div",{className:"p-1 cursor-pointer flex items-center justify-between border rounded-lg border-gray-300 hover:shadow-md transition duration-200",children:[e.jsxs(v,{className:"flex items-center ml-2",href:route("projects.show",{project:t}),children:[e.jsx("div",{className:"",children:e.jsx(y,{auth:r,avatar:t.avatar})}),e.jsx("div",{className:"p-4",children:e.jsx("div",{className:"font-bold text-lg",children:t.name})})]}),e.jsx("div",{className:"mr-4",children:e.jsxs(o,{children:[e.jsx("div",{"data-tooltip-id":"project-actions","data-tooltip-content":"Project actions",children:e.jsx(o.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsx("button",{type:"button",className:"inline-flex hover:shadow-md items-center px-3 py-2 border border-gray-400 text-sm leading-4 font-medium rounded-full dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150",children:e.jsx(N,{size:"20"})})})})}),e.jsxs(o.Content,{children:[e.jsxs(o.Button,{onClick:()=>p(t),children:[e.jsx(b,{size:"20"})," ",e.jsx("h6",{className:"ml-2",children:"Edit"})]}),e.jsx("hr",{className:"m-1"}),e.jsxs(o.Button,{onClick:()=>u(t),children:[e.jsx(M,{size:"20",color:"red"})," ",e.jsx("h6",{className:"ml-2",children:"Delete"})]})]})]})})]},f))}),e.jsx(x,{show:j,onClose:c,maxWidth:"xl",children:e.jsx(w,{project:n,closeModal:c,auth:r})}),e.jsx(x,{show:h,onClose:m,maxWidth:"2xl",children:e.jsx(P,{project:n,closeModal:m,auth:r})})]})}export{L as default};
