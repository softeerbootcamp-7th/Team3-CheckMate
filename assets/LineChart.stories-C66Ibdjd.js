import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as h}from"./iframe-BerYgGyH.js";import{T as m,B as d}from"./index-BPdhQbxg.js";import"./periods-BueKGNxC.js";import{W as v,S as C,P as x}from"./lineChartStoryData-DuLhpI9z.js";import{L as u}from"./LineChart-DILQPoxR.js";import"./preload-helper-Cv0CY36J.js";import"./index-GF96FoPb.js";import"./index-DrlJUwJX.js";import"./index-CLtTxuVJ.js";import"./YGuideLine-BdU_btBD.js";const M={title:"components/shared/line-chart/LineChart",component:u,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{viewBoxWidth:{control:"number"},viewBoxHeight:{control:"number"},hasXAxis:{control:"boolean"},hasGradient:{control:"boolean"},showXGuideLine:{control:"boolean"},showYGuideLine:{control:"boolean"},yGuideLineCount:{control:"number"},primarySeries:{control:"object"},secondarySeries:{control:"object"},activeTooltip:{control:"boolean"},tooltipContent:{disable:!0},chartTitle:{control:"text"},chartDescription:{control:"text"},xAxisType:{control:"select",options:["default","tick","right-arrow"]}}},s={args:{viewBoxWidth:1e3,viewBoxHeight:156,hasXAxis:!0,hasGradient:!1,showXGuideLine:!0,showYGuideLine:!0,yGuideLineCount:4,primarySeries:v,activeTooltip:!1,tooltipContent:(e,o)=>`${e} (${o})`,chartTitle:"일별 매출 꺾은선 차트",chartDescription:"일별 매출 꺾은선 차트 설명",xAxisType:"right-arrow"},render:e=>n.jsx(m,{children:n.jsx("div",{style:{width:`${e.viewBoxWidth}px`,height:`${e.viewBoxHeight}px`},children:n.jsx(u,{...e})})})},f=e=>{const[o,c]=h.useState(e.primarySeries),[p]=h.useState(e.secondarySeries),w=()=>{let i=o.data.mainY.filter(t=>t.amount!==null).length-1;i<0&&(i=0),c(t=>{const r=[...t.data.mainY],a=[...t.data.subY],y=r[i].amount??0,g=a[i]?.amount??0;return r[i]={...r[i],amount:+y+Math.floor(Math.random()*10),unit:"건"},a[i]={...a[i],amount:+g+Math.floor(Math.random()*10),unit:"만"},{...t,data:{...t.data,mainY:r,subY:a}}})},Y=()=>{const i=o.data.mainY.filter(t=>t.amount!==null).length;i!==o.data.mainY.length&&c(t=>({...t,data:{...t.data,mainY:[...t.data.mainY.slice(0,i),{amount:0,unit:"건"},...t.data.mainY.slice(i+1)],subY:[...t.data.subY.slice(0,i),{amount:0,unit:"만"},...t.data.subY.slice(i+1)]}}))},S=()=>{c(x)};return n.jsxs("div",{className:"flex flex-col gap-5",children:[n.jsx("div",{style:{width:`${e.viewBoxWidth}px`,height:`${e.viewBoxHeight}px`},children:n.jsx(u,{...e,primarySeries:o,secondarySeries:p})}),n.jsx(d,{onClick:w,variant:"outline",size:"sm",className:"w-fit",children:"실시간 업데이트"}),n.jsx(d,{onClick:Y,variant:"outline",size:"sm",className:"w-fit",children:"다음 시간대 업데이트"}),n.jsx(d,{onClick:S,variant:"outline",size:"sm",className:"w-fit",children:"초기화"})]})},l={args:{viewBoxWidth:1020,viewBoxHeight:156,hasXAxis:!0,hasGradient:!0,showXGuideLine:!0,showYGuideLine:!0,primarySeries:x,secondarySeries:C,activeTooltip:!0,tooltipContent:(e,o)=>`${e} (${o})`,yGuideLineCount:4,xAxisType:"tick"},render:e=>n.jsx(m,{children:n.jsx(f,{...e})})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    viewBoxWidth: 1000,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasGradient: false,
    showXGuideLine: true,
    showYGuideLine: true,
    yGuideLineCount: 4,
    primarySeries: WEEKLY_DATA,
    activeTooltip: false,
    tooltipContent: (mainY, subY) => \`\${mainY} (\${subY})\`,
    chartTitle: '일별 매출 꺾은선 차트',
    chartDescription: '일별 매출 꺾은선 차트 설명',
    xAxisType: 'right-arrow'
  },
  render: args => <TooltipProvider>
      <div style={{
      width: \`\${args.viewBoxWidth}px\`,
      height: \`\${args.viewBoxHeight}px\`
    }}>
        <LineChart {...args} />
      </div>
    </TooltipProvider>
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    viewBoxWidth: 1020,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    primarySeries: PRIMARY_SERIES_MOCK,
    secondarySeries: SECONDARY_SERIES_MOCK,
    activeTooltip: true,
    tooltipContent: (mainY, subY) => \`\${mainY} (\${subY})\`,
    yGuideLineCount: 4,
    xAxisType: 'tick'
  },
  render: args => <TooltipProvider>
      <RealtimeLineChart {...args} />
    </TooltipProvider>
}`,...l.parameters?.docs?.source}}};const P=["Default","Realtime"];export{s as Default,l as Realtime,P as __namedExportsOrder,M as default};
