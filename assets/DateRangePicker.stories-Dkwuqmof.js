import{j as r}from"./jsx-runtime-u17CrQMm.js";import{r as a}from"./iframe-CbFTtvIt.js";import{D as o,a as t}from"./calendarFactory-DEBv-Xf8.js";import"./popover-CkKxQe0d.js";import"./SectionTitle-DgbieCdg.js";import"./OnboardingLayout-DnCskMVD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cx4ryLvZ.js";import"./index-Ud3jnWHZ.js";const f={title:"components/shared/date-range-picker/DateRangePicker",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{startDate:{control:"date"},endDate:{control:"date",defaultValue:void 0},dateRangePickerType:{control:"select",options:Object.values(t)},setStartDate:{table:{disable:!0}},setEndDate:{table:{disable:!0}}}},c=()=>{const[s,n]=a.useState(void 0),[d,i]=a.useState(void 0);return r.jsx(o,{startDate:s,setStartDate:n,endDate:d,setEndDate:i,dateRangePickerType:t.date})},e={args:{startDate:void 0,endDate:void 0,dateRangePickerType:t.date},render:()=>r.jsx(c,{})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    startDate: undefined,
    endDate: undefined,
    dateRangePickerType: DATE_RANGE_PICKER_TYPE.date
  },
  render: () => <DateRangePickerStory />
}`,...e.parameters?.docs?.source}}};const k=["Default"];export{e as Default,k as __namedExportsOrder,f as default};
