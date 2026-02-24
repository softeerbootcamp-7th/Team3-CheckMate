import{j as i}from"./jsx-runtime-u17CrQMm.js";import{B as e}from"./ButtonGroup-CU0liEIO.js";import"./periods-BlCP1VCB.js";import"./iframe-E6R7BP85.js";import"./preload-helper-Cv0CY36J.js";import"./toggle-group-VxMuUUdP.js";import"./index-C9cP_GGV.js";import"./index-CkKJIDaG.js";import"./index-DgO4bN1i.js";const C={title:"components/shared/button-group/ButtonGroup",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{}},o={args:{positiveLabel:"저장",negativeLabel:"취소",onPositiveClick:()=>{},onNegativeClick:()=>{},disabled:!1},render:({positiveLabel:n,negativeLabel:s,onPositiveClick:a,onNegativeClick:r,disabled:l})=>i.jsxs(e,{children:[i.jsx(e.Negative,{message:s,onClick:r}),i.jsx(e.Positive,{message:n,onClick:a,disabled:l})]})},t={args:{positiveLabel:"예",negativeLabel:"아니오",onPositiveClick:()=>{},onNegativeClick:()=>{},disabled:!0},render:({positiveLabel:n,negativeLabel:s,onPositiveClick:a,onNegativeClick:r,disabled:l})=>i.jsxs(e,{children:[i.jsx(e.Negative,{message:s,onClick:r}),i.jsx(e.Positive,{message:n,onClick:a,disabled:l})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const L=["Default","Disabled"];export{o as Default,t as Disabled,L as __namedExportsOrder,C as default};
