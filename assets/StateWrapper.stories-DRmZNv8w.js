import{j as e}from"./jsx-runtime-u17CrQMm.js";import{S as n}from"./Spinner-BT136tNK.js";import{S as c}from"./StateWrapper-BxNYA60k.js";import"./iframe-CzL-WXHF.js";import"./preload-helper-Cv0CY36J.js";import"./periods-BlCP1VCB.js";const p={title:"Components/Shared/state-wrapper/StateWrapper",component:c,tags:["autodocs"],argTypes:{className:{control:"text"}},decorators:[a=>e.jsx("div",{className:"flex min-h-75 items-center justify-center bg-gray-50 p-10",children:e.jsx(a,{})})]},t={args:{children:e.jsx("div",{})}},s={args:{children:e.jsxs("div",{className:"flex flex-col items-center text-center",children:[e.jsx("span",{className:"mb-2 text-3xl",children:"⚠️"}),e.jsx("h4",{className:"text-md font-bold text-red-600",children:"오류 발생"}),e.jsx("p",{className:"mb-4 text-xs text-gray-400",children:"잠시 후 다시 시도해주세요."}),e.jsx("button",{className:"text-xs text-gray-600 underline transition hover:text-black",children:"다시 시도"})]})}},r={args:{children:e.jsxs("div",{className:"flex flex-col items-center gap-4 text-gray-400",children:[e.jsx(n,{className:"size-12"}),e.jsx("p",{className:"text-sm italic",children:"로딩중 입니다"})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div></div>
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="flex flex-col items-center text-center">
        <span className="mb-2 text-3xl">⚠️</span>
        <h4 className="text-md font-bold text-red-600">오류 발생</h4>
        <p className="mb-4 text-xs text-gray-400">잠시 후 다시 시도해주세요.</p>
        <button className="text-xs text-gray-600 underline transition hover:text-black">
          다시 시도
        </button>
      </div>
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="flex flex-col items-center gap-4 text-gray-400">
        <Spinner className="size-12" />
        <p className="text-sm italic">로딩중 입니다</p>
      </div>
  }
}`,...r.parameters?.docs?.source}}};const h=["Default","WithError","WithLoading"];export{t as Default,s as WithError,r as WithLoading,h as __namedExportsOrder,p as default};
