import{W as i,j as e}from"./app-BN9jrRPK.js";import{D as m}from"./DangerButton-deqwNbpp.js";import{S as u}from"./SecondaryButton-gDNQYCmU.js";function D({resource:s,closeModal:t,onDelete:r,auth:x}){const{data:f,setData:p,delete:a,processing:o,reset:n,errors:h}=i(),l=()=>{t()},c=d=>{d.preventDefault(),a(route("resources.destroy",{resource:s}),{preserveScroll:!0,onSuccess:()=>{t(),r(!0)},onError:()=>{r(!1)},onFinish:()=>n()})};return e.jsx("section",{className:"space-y-6",children:e.jsxs("form",{onSubmit:c,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Delete Resource"}),e.jsxs("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:["Are you sure you want to delete ",e.jsx("span",{className:"font-bold",children:s?s.name:""}),"?"]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(u,{onClick:l,children:"Cancel"}),e.jsx(m,{className:"ms-3",disabled:o,children:"Delete"})]})]})})}export{D as default};
