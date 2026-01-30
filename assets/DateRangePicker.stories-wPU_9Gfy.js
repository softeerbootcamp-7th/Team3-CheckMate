import{j as r}from"./jsx-runtime-u17CrQMm.js";import{r as a}from"./iframe-BKZCiM7p.js";import{D as o,a as t}from"./periods-CGUdhn70.js";import"./utils-DVKmrS1B.js";import"./popover-DnuW29ss.js";import"./DateRangeLabel-CynlVEKX.js";import"./SectionTitle-C_HL0TmH.js";import"./OnboardingLayout-DnCskMVD.js";import"./Input-Blp9Hmu6.js";import"./preload-helper-Cv0CY36J.js";import"./index-C-PRLKvl.js";import"./index-DJGB_wwz.js";const y={title:"components/shared/date-range-picker/DateRangePicker",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{startDate:{control:"date"},endDate:{control:"date",defaultValue:void 0},dateRangePickerType:{control:"select",options:Object.values(t)},setStartDate:{table:{disable:!0}},setEndDate:{table:{disable:!0}}}},c=()=>{const[s,n]=a.useState(void 0),[d,i]=a.useState(void 0);return r.jsx(o,{startDate:s,setStartDate:n,endDate:d,setEndDate:i,dateRangePickerType:t.date})},e={args:{startDate:void 0,endDate:void 0,dateRangePickerType:t.date},render:()=>r.jsx(c,{})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    startDate: undefined,
    endDate: undefined,
    dateRangePickerType: DATE_RANGE_PICKER_TYPE.date
  },
  render: () => <DateRangePickerStory />
}`,...e.parameters?.docs?.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,y as default};
