import{r as s,j as e,a as p}from"./app-5jPogs4x.js";import{q as u}from"./transition-DdgJfmWj.js";const g=s.createContext({open:!1,setOpen:()=>{},toggleOpen:()=>{}}),a=({children:t})=>{const[n,o]=s.useState(!1),r=()=>{o(i=>!i)};return e.jsx(g.Provider,{value:{open:n,setOpen:o,toggleOpen:r},children:e.jsx("div",{className:"relative",children:t})})},x=({children:t})=>{const{open:n,setOpen:o,toggleOpen:r}=s.useContext(g);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:r,children:t}),n&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>o(!1)})]})},f=({align:t="right",width:n="48",contentClasses:o="py-1 bg-white dark:bg-gray-700",children:r})=>{const{open:i,setOpen:d}=s.useContext(g);let l="origin-top";t==="left"?l="ltr:origin-top-left rtl:origin-top-right start-0":t==="right"&&(l="ltr:origin-top-right rtl:origin-top-left end-0");let c="";return n==="48"&&(c="w-48"),e.jsx(e.Fragment,{children:e.jsx(u,{as:s.Fragment,show:i,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${l} ${c}`,onClick:()=>d(!1),style:{zIndex:1e3},children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+o,children:r})})})})},m=({className:t="",children:n,...o})=>e.jsx(p,{...o,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+t,children:n}),y=({className:t="",children:n,...o})=>e.jsx("button",{...o,className:"flex border-none shadow-none w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+t,children:n});a.Trigger=x;a.Content=f;a.Link=m;a.Button=y;const v=a;export{v as D};