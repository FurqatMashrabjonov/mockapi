import{W as u,r as f,j as e,Y as g}from"./app-Bp55PmTp.js";import{A as N}from"./AuthenticatedLayout-DZNKLpoC.js";import y from"./Projects-hjKQJts5.js";import{M as v}from"./Modal-CVyiaehd.js";import{P as b}from"./PrimaryButton-DpH1iX6k.js";import{c as w}from"./cn-C-5SdYIA.js";import{I as P}from"./InputLabel-BmBlfFZK.js";import{T as k}from"./TextInput-DWpBbICx.js";import{I as C}from"./InputError-DLMOv9hH.js";import{S as l}from"./SecondaryButton-tR_viVSE.js";import{I as S}from"./IconPlus-F0I-Ioqq.js";import"./ApplicationLogo-CDFuJMGo.js";import"./Dropdown-DESXUhjI.js";import"./transition-Bc6AtdzQ.js";import"./index-MJ-nuXU9.js";import"./DeleteProject-Dm-o6Sxl.js";import"./DangerButton-gZxwdA9S.js";import"./UpdateProject-D51Rhjrz.js";import"./IconTrash-Da-4h3Ui.js";import"./createReactComponent-Bsb2yQec.js";function U({auth:r,projects:a}){const{data:c,setData:i,post:n,processing:d,errors:x,reset:p}=u({name:""}),[o,m]=f.useState(!1),t=()=>{m(!1),p("name")},j=()=>{m(!0)},h=s=>{s.preventDefault(),n(route("projects.store"),{preserveScroll:!0,onSuccess:()=>t()})};return e.jsxs(N,{user:r.user,header:e.jsx("h2",{className:"flex font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Projects"}),children:[e.jsx(g,{title:"Projects"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsx("div",{className:"flex justify-end",children:e.jsxs(l,{onClick:j,disabled:o,className:"rounded-full m-4",children:[e.jsx(S,{className:w("mr-2")})," Create"]})}),e.jsxs("div",{className:"p-6 text-gray-900 dark:text-gray-100 h-[30rem]",children:[a.length===0&&e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-lg font-medium",children:"No projects found"}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Create a new project to get started"})]}),e.jsx(y,{projects:a,auth:r})]})]})})}),e.jsx(v,{show:o,onClose:t,children:e.jsxs("form",{onSubmit:h,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Create Project"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Please fill out the form below to create a new project"}),e.jsxs("div",{className:"mt-6",children:[e.jsx(P,{htmlFor:"name-project",value:"Project Name"}),e.jsx(k,{id:"name",type:"text",name:"name",value:c.name,onChange:s=>i("name",s.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"..."}),e.jsx(C,{message:x.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(l,{onClick:t,children:"Cancel"}),e.jsx(b,{className:"ms-3",disabled:d,children:"Submit"})]})]})})]})}export{U as default};