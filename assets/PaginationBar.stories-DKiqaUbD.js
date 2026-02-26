import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as l}from"./iframe-BYnmhMS_.js";import{P as s}from"./PaginationBar-4_E09UJg.js";import"./preload-helper-Cv0CY36J.js";import"./toggle-group-DffW7fGY.js";import"./periods-BlCP1VCB.js";import"./index-C9cP_GGV.js";import"./index-DXF2T1Mc.js";import"./index-BTsOOIdf.js";import"./chevron-right-CwnCf9k0.js";import"./createLucideIcon-nPFQ87x7.js";import"./chevron-left-CLRE6-ta.js";const M={title:"Components/shared/pagination-bar/PaginationBar",component:s,tags:["autodocs"],parameters:{layout:"centered"}},u=t=>{const[r,o]=l.useState(t.currentPage||1),i=r===1,c=r===t.totalPageCount,m=()=>o(a=>Math.max(1,a-1)),p=()=>o(a=>Math.min(t.totalPageCount,a+1)),g=a=>o(a);return n.jsx(s,{...t,currentPage:r,isFirstPage:i,isLastPage:c,handleClickPrev:m,handleClickNext:p,handleClickPage:g})},e={args:{totalPageCount:5,currentPage:1},render:t=>n.jsx(u,{...t})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    totalPageCount: 5,
    currentPage: 1
  },
  render: args => <PaginationContainer {...args} />
}`,...e.parameters?.docs?.source}}};const N=["Default"];export{e as Default,N as __namedExportsOrder,M as default};
