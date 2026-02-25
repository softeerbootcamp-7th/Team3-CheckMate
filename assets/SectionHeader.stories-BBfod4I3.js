import{j as r}from"./jsx-runtime-u17CrQMm.js";import{P as n}from"./periods-BlCP1VCB.js";import"./iframe-BJVKgXnS.js";import{P as d}from"./PeriodSelect-3b7s9Qk1.js";import{S as p}from"./SectionTitle-DlG2uG83.js";import"./preload-helper-Cv0CY36J.js";import"./RevenueCalendar-DKxthYrx.js";import"./toggle-group-DvP5iZj1.js";import"./index-C9cP_GGV.js";import"./index-qKy8dLdH.js";import"./index-jDpbOQ6d.js";import"./chevron-right-DPDJsBs3.js";import"./createLucideIcon-2RzovL3-.js";import"./formatNumber-CteuW3K-.js";import"./DateRangeLabel-CcJOsopq.js";import"./DateRangePicker-DzE84G8Z.js";const o=({title:i,description:s,rightSlot:a})=>r.jsxs("header",{className:"flex justify-between gap-600",children:[r.jsx("div",{className:"flex min-w-0 items-center gap-3",children:r.jsx(p,{title:i,description:s})}),a]});o.__docgenInfo={description:"",methods:[],displayName:"SectionHeader",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},rightSlot:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const j={title:"components/shared/section-header/SectionHeader",component:o,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{title:{control:"text",defaultValue:"섹션 제목"},description:{control:"text",defaultValue:"섹션에 대한 설명이 들어가는 자리입니다."}}},e={args:{title:"섹션 제목",description:"섹션에 대한 설명이 들어가는 자리입니다."}},t={args:{title:"섹션 제목",description:"섹션에 대한 설명이 들어가는 자리입니다.",rightSlot:r.jsx(d,{periodPreset:n.dayWeekMonth,periodType:void 0,setPeriodType:()=>{},setStartDate:()=>{},setEndDate:()=>{}})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: '섹션 제목',
    description: '섹션에 대한 설명이 들어가는 자리입니다.'
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: '섹션 제목',
    description: '섹션에 대한 설명이 들어가는 자리입니다.',
    rightSlot: <PeriodSelect periodPreset={PERIOD_PRESET_KEYS.dayWeekMonth} periodType={undefined} setPeriodType={() => {}} setStartDate={() => {}} setEndDate={() => {}} />
  }
}`,...t.parameters?.docs?.source}}};const N=["Default","WithPeriodSelect"];export{e as Default,t as WithPeriodSelect,N as __namedExportsOrder,j as default};
