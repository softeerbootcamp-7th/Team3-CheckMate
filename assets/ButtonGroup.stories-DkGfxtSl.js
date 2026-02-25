import{j as o}from"./jsx-runtime-u17CrQMm.js";import{c as u}from"./periods-BlCP1VCB.js";import"./iframe-CebIkQcA.js";import{B as m}from"./toggle-group-DUYoxuf0.js";import"./preload-helper-Cv0CY36J.js";import"./index-C9cP_GGV.js";import"./index-BO5hQCtG.js";import"./index-C9HOMjRH.js";const t=({children:n,...e})=>o.jsx("div",{className:"flex justify-end gap-2.5",...e,children:n}),c=({message:n,disabled:e=!1,...s})=>o.jsx(m,{...s,className:u(e?"bg-grey-200 text-grey-400 pointer-events-none":"bg-grey-900 text-grey-50","body-medium-bold! rounded-200 w-20 border-none px-350 py-200 pt-250",s.className),children:n}),d=({message:n,...e})=>o.jsx(m,{...e,className:u("rounded-200 text-grey-700 body-medium-bold! w-20 border-none px-350 py-200",e.className),children:n});t.Positive=c;t.Negative=d;t.__docgenInfo={description:"",methods:[{name:"Positive",docblock:null,modifiers:["static"],params:[{name:`{
  message,
  disabled = false,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>`,optional:!1,type:{name:"intersection",raw:"ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>",elements:[{name:"ButtonProps"},{name:"ButtonHTMLAttributes",elements:[{name:"HTMLButtonElement"}],raw:"ButtonHTMLAttributes<HTMLButtonElement>"}]}}],returns:null},{name:"Negative",docblock:null,modifiers:["static"],params:[{name:`{
  message,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>`,optional:!1,type:{name:"intersection",raw:"ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>",elements:[{name:"ButtonProps"},{name:"ButtonHTMLAttributes",elements:[{name:"HTMLButtonElement"}],raw:"ButtonHTMLAttributes<HTMLButtonElement>"}]}}],returns:null}],displayName:"ButtonGroup"};const N={title:"components/shared/button-group/ButtonGroup",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{}},i={args:{positiveLabel:"저장",negativeLabel:"취소",onPositiveClick:()=>{},onNegativeClick:()=>{},disabled:!1},render:({positiveLabel:n,negativeLabel:e,onPositiveClick:s,onNegativeClick:r,disabled:l})=>o.jsxs(t,{children:[o.jsx(t.Negative,{message:e,onClick:r}),o.jsx(t.Positive,{message:n,onClick:s,disabled:l})]})},a={args:{positiveLabel:"예",negativeLabel:"아니오",onPositiveClick:()=>{},onNegativeClick:()=>{},disabled:!0},render:({positiveLabel:n,negativeLabel:e,onPositiveClick:s,onNegativeClick:r,disabled:l})=>o.jsxs(t,{children:[o.jsx(t.Negative,{message:e,onClick:r}),o.jsx(t.Positive,{message:n,onClick:s,disabled:l})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    positiveLabel: '저장',
    negativeLabel: '취소',
    onPositiveClick: () => {},
    onNegativeClick: () => {},
    disabled: false
  },
  render: ({
    positiveLabel,
    negativeLabel,
    onPositiveClick,
    onNegativeClick,
    disabled
  }) => <ButtonGroup>
      <ButtonGroup.Negative message={negativeLabel} onClick={onNegativeClick} />
      <ButtonGroup.Positive message={positiveLabel} onClick={onPositiveClick} disabled={disabled} />
    </ButtonGroup>
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    positiveLabel: '예',
    negativeLabel: '아니오',
    onPositiveClick: () => {},
    onNegativeClick: () => {},
    disabled: true
  },
  render: ({
    positiveLabel,
    negativeLabel,
    onPositiveClick,
    onNegativeClick,
    disabled
  }) => <ButtonGroup>
      <ButtonGroup.Negative message={negativeLabel} onClick={onNegativeClick} />
      <ButtonGroup.Positive message={positiveLabel} onClick={onPositiveClick} disabled={disabled} />
    </ButtonGroup>
}`,...a.parameters?.docs?.source}}};const P=["Default","Disabled"];export{i as Default,a as Disabled,P as __namedExportsOrder,N as default};
