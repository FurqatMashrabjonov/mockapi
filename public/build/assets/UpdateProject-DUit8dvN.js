import{W as u,j as e}from"./app-BN9jrRPK.js";import{I as d}from"./InputError-D54ftZFD.js";import{I as p}from"./InputLabel-CwdDp_Vi.js";import{S as x}from"./SecondaryButton-gDNQYCmU.js";import{T as j}from"./TextInput-CAjRt6mS.js";import{P as f}from"./PrimaryButton-BTJ9P4Gu.js";function I({project:t,closeModal:s,auth:h}){const{data:r,setData:m,post:o,processing:n,reset:l,errors:c}=u({name:t==null?"":t.name}),i=a=>{a.preventDefault(),o(route("projects.update",{project:t}),{preserveScroll:!0,onSuccess:()=>s(),onError:()=>{},onFinish:()=>l()})};return e.jsx("section",{className:"space-y-6",children:e.jsxs("form",{onSubmit:i,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Create Project"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Please fill out the form below to create a new project"}),e.jsxs("div",{className:"mt-6",children:[e.jsx(p,{htmlFor:"name-project",value:"Project Name"}),e.jsx(j,{id:"name",type:"text",name:"name",value:r.name,onChange:a=>m("name",a.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"..."}),e.jsx(d,{message:c.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(x,{onClick:s,children:"Cancel"}),e.jsx(f,{className:"ms-3",disabled:n,children:"Edit"})]})]})})}export{I as default};