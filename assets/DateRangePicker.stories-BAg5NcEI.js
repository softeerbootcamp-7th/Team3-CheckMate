import{j as r}from"./jsx-runtime-u17CrQMm.js";import{r as a}from"./iframe-BwK5-MMJ.js";import{D as o,a as t}from"./periods-JH-ccVAg.js";import"./utils-DVKmrS1B.js";import"./popover-CMzx79Zy.js";import"./DateRangeLabel-Bc7ObZkr.js";import"./SectionTitle-CzDGNraM.js";import"./OnboardingLayout-DnCskMVD.js";import"./Input-CB-URYut.js";import"./preload-helper-Cv0CY36J.js";import"./index-Cm4EVxGA.js";import"./index-cOCiuv2d.js";const y={title:"components/shared/date-range-picker/DateRangePicker",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{startDate:{control:"date"},endDate:{control:"date",defaultValue:void 0},dateRangePickerType:{control:"select",options:Object.values(t)},setStartDate:{table:{disable:!0}},setEndDate:{table:{disable:!0}}}},c=()=>{const[s,n]=a.useState(void 0),[d,i]=a.useState(void 0);return r.jsx(o,{startDate:s,setStartDate:n,endDate:d,setEndDate:i,dateRangePickerType:t.date})},e={args:{startDate:void 0,endDate:void 0,dateRangePickerType:t.date},render:()=>r.jsx(c,{})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    startDate: undefined,
    endDate: undefined,
    dateRangePickerType: DATE_RANGE_PICKER_TYPE.date
  },
  render: () => <DateRangePickerStory />
}`,...e.parameters?.docs?.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,y as default};
