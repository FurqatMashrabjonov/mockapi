import{e as g,r as a,j as e,a as v}from"./app-D1unxA-f.js";import{D as o}from"./Dropdown-Bt-HDPGT.js";import{M as x}from"./Modal-DcgIYIug.js";import w from"./DeleteProject-Ck0pWl1l.js";import P from"./UpdateProject-DU0_OgrH.js";import{b as N,I as b,a as M}from"./IconTrash-D0PaUipJ.js";import"./transition-CFDaQrZ9.js";import"./DangerButton-dGcrh2Bo.js";import"./SecondaryButton-BmcPXZax.js";import"./InputError-Bs7pknJ6.js";import"./InputLabel-DYAxIf6S.js";import"./TextInput-BXw4Iy1d.js";import"./PrimaryButton-DyzRAmLH.js";import"./createReactComponent-BWJ8PNlr.js";function y({avatar:s}){return g.createElement("div",{dangerouslySetInnerHTML:{__html:s}})}function L({projects:s,auth:r}){const[j,l]=a.useState(!1),[h,i]=a.useState(!1),[n,d]=a.useState(null),p=t=>{d(t),i(!0)},u=t=>{d(t),l(!0)},c=()=>{l(!1)},m=()=>{i(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 gap-2",children:s.map((t,f)=>e.jsxs("div",{className:"p-1 cursor-pointer flex items-center justify-between border rounded-lg border-gray-300 hover:shadow-md transition duration-200",children:[e.jsxs(v,{className:"flex items-center ml-2",href:route("projects.show",{project:t}),children:[e.jsx("div",{className:"",children:e.jsx(y,{auth:r,avatar:t.avatar})}),e.jsx("div",{className:"p-4",children:e.jsx("div",{className:"font-bold text-lg",children:t.name})})]}),e.jsx("div",{className:"mr-4",children:e.jsxs(o,{children:[e.jsx("div",{"data-tooltip-id":"project-actions","data-tooltip-content":"Project actions",children:e.jsx(o.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsx("button",{type:"button",className:"inline-flex hover:shadow-md items-center px-3 py-2 border border-gray-400 text-sm leading-4 font-medium rounded-full dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150",children:e.jsx(N,{size:"20"})})})})}),e.jsxs(o.Content,{children:[e.jsxs(o.Button,{onClick:()=>p(t),children:[e.jsx(b,{size:"20"})," ",e.jsx("h6",{className:"ml-2",children:"Edit"})]}),e.jsx("hr",{className:"m-1"}),e.jsxs(o.Button,{onClick:()=>u(t),children:[e.jsx(M,{size:"20",color:"red"})," ",e.jsx("h6",{className:"ml-2",children:"Delete"})]})]})]})})]},f))}),e.jsx(x,{show:j,onClose:c,maxWidth:"xl",children:e.jsx(w,{project:n,closeModal:c,auth:r})}),e.jsx(x,{show:h,onClose:m,maxWidth:"2xl",children:e.jsx(P,{project:n,closeModal:m,auth:r})})]})}export{L as default};