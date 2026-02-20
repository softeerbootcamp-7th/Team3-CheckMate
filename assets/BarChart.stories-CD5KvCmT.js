import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as g}from"./iframe-BP2KJWnZ.js";import{T as A,W as T,S as G,P as L}from"./lineChartStoryData-DuLhpI9z.js";import{T as C,B as s}from"./index-yq_gOtzD.js";import"./periods-BueKGNxC.js";import{B as h}from"./BarChart-C3c7PIcy.js";import"./preload-helper-Cv0CY36J.js";import"./index-GF96FoPb.js";import"./index-Bwwy8NIs.js";import"./index-DLiQEdEz.js";import"./YGuideLine-BOswJuJ_.js";import"./rankingColors-YVpIGQhO.js";const y={color:"var(--color-grey-400)",data:{mainX:[{amount:"월",unit:""},{amount:"화",unit:""},{amount:"수",unit:""},{amount:"목",unit:""},{amount:"금",unit:""},{amount:"토",unit:""},{amount:"일",unit:""}],mainY:[[{amount:45,unit:"건",label:"아메리카노"},{amount:12,unit:"건",label:"카페라떼"},{amount:5,unit:"건",label:"샌드위치"}],[{amount:38,unit:"건",label:"아메리카노"},{amount:22,unit:"건",label:"자몽에이드"},{amount:15,unit:"건",label:"말차라떼"},{amount:7,unit:"건",label:"조각케이크"}],[{amount:5,unit:"건",label:"아메리카노"},{amount:25,unit:"건",label:"카페라떼"},{amount:18,unit:"건",label:"바닐라빈라떼"},{amount:12,unit:"건",label:"베이글"},{amount:8,unit:"건",label:"밀크티"}],[{amount:20,unit:"건",label:"아메리카노"},{amount:5,unit:"건",label:"스무디"}],[{amount:60,unit:"건",label:"아메리카노"},{amount:40,unit:"건",label:"자몽에이드"},{amount:35,unit:"건",label:"조각케이크"},{amount:15,unit:"건",label:"샌드위치"}],[{amount:25,unit:"건",label:"아메리카노"},{amount:50,unit:"건",label:"딸기스무디"},{amount:45,unit:"건",label:"초코와플"},{amount:30,unit:"건",label:"자몽에이드"},{amount:20,unit:"건",label:"바닐라빈라떼"}],[{amount:30,unit:"건",label:"아메리카노"},{amount:30,unit:"건",label:"카페라떼"},{amount:25,unit:"건",label:"말차라떼"},{amount:25,unit:"건",label:"샌드위치"}]]}},v={color:"var(--color-grey-400)",data:{mainX:A,mainY:[[{amount:45,unit:"건",label:"아메리카노"},{amount:12,unit:"건",label:"카페라떼"},{amount:5,unit:"건",label:"샌드위치"}],[{amount:38,unit:"건",label:"아메리카노"},{amount:22,unit:"건",label:"자몽에이드"},{amount:15,unit:"건",label:"말차라떼"},{amount:7,unit:"건",label:"조각케이크"}],[{amount:5,unit:"건",label:"아메리카노"},{amount:25,unit:"건",label:"카페라떼"},{amount:18,unit:"건",label:"바닐라빈라떼"},{amount:12,unit:"건",label:"베이글"},{amount:8,unit:"건",label:"밀크티"}],[{amount:20,unit:"건",label:"아메리카노"},{amount:5,unit:"건",label:"스무디"}],[{amount:60,unit:"건",label:"아메리카노"},{amount:40,unit:"건",label:"자몽에이드"},{amount:35,unit:"건",label:"조각케이크"},{amount:15,unit:"건",label:"샌드위치"}],[{amount:25,unit:"건",label:"아메리카노"},{amount:50,unit:"건",label:"딸기스무디"},{amount:45,unit:"건",label:"초코와플"},{amount:30,unit:"건",label:"자몽에이드"},{amount:20,unit:"건",label:"바닐라빈라떼"}],[{amount:30,unit:"건",label:"아메리카노"},{amount:30,unit:"건",label:"카페라떼"},{amount:25,unit:"건",label:"말차라떼"},{amount:25,unit:"건",label:"샌드위치"}],[{amount:45,unit:"건",label:"아메리카노"},{amount:12,unit:"건",label:"카페라떼"},{amount:5,unit:"건",label:"샌드위치"}],[{amount:38,unit:"건",label:"아메리카노"},{amount:22,unit:"건",label:"자몽에이드"},{amount:15,unit:"건",label:"말차라떼"},{amount:7,unit:"건",label:"조각케이크"}],[{amount:5,unit:"건",label:"아메리카노"},{amount:25,unit:"건",label:"카페라떼"},{amount:18,unit:"건",label:"바닐라빈라떼"},{amount:12,unit:"건",label:"베이글"},{amount:8,unit:"건",label:"밀크티"}],[{amount:20,unit:"건",label:"아메리카노"},{amount:5,unit:"건",label:"스무디"}],[{amount:60,unit:"건",label:"아메리카노"},{amount:40,unit:"건",label:"자몽에이드"},{amount:35,unit:"건",label:"조각케이크"},{amount:15,unit:"건",label:"샌드위치"}]]}},k={title:"components/shared/bar-chart/BarChart",component:h,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{viewBoxWidth:{control:"number"},viewBoxHeight:{control:"number"},hasXAxis:{control:"boolean"},hasBarGradient:{control:"boolean"},showXGuideLine:{control:"boolean"},showYGuideLine:{control:"boolean"},yGuideLineCount:{control:"number"},barChartSeries:{control:"object"},activeTooltip:{control:"boolean"},tooltipContent:{disable:!0},chartTitle:{control:"text"},chartDescription:{control:"text"}}},c={args:{viewBoxWidth:1e3,viewBoxHeight:156,hasXAxis:!0,hasBarGradient:!0,showXGuideLine:!0,showYGuideLine:!0,yGuideLineCount:4,barChartSeries:T,activeTooltip:!0,tooltipContent:(t,o)=>`${t} (${o})`,chartTitle:"일별 매출 꺾은선 차트",chartDescription:"일별 매출 꺾은선 차트 설명",xAxisType:"right-arrow",activeDataIndex:3,barColorChangeOnHover:!0},render:t=>e.jsx(C,{children:e.jsx("div",{style:{width:`${t.viewBoxWidth}px`,height:`${t.viewBoxHeight}px`},children:e.jsx(h,{...t})})})},x={args:{viewBoxWidth:1e3,viewBoxHeight:250,hasXAxis:!0,hasBarGradient:!0,showXGuideLine:!0,showYGuideLine:!0,yGuideLineCount:4,barChartSeries:y,activeTooltip:!0,chartTitle:"일별 매출 꺾은선 차트",chartDescription:"일별 매출 꺾은선 차트 설명",xAxisType:"right-arrow",activeDataIndex:3,barColorChangeOnHover:!0},render:t=>e.jsx(C,{children:e.jsx("div",{style:{width:`${t.viewBoxWidth}px`,height:`${t.viewBoxHeight}px`},children:e.jsx(h,{...t})})})},f=t=>{const[o,l]=g.useState(t.barChartSeries),[w,d]=g.useState(t.barChartSeries.data.mainX.length-1),B=()=>{let n=o.data.mainY.filter(a=>a.amount!==null).length-1;n<0&&(n=0),d(n),l(a=>{const r=[...a.data.mainY],m=r[n].amount??0;return r[n]={...r[n],amount:+m+Math.floor(Math.random()*10),unit:"건"},{...a,data:{...a.data,mainY:r}}})},u=()=>{const n=o.data.mainY.filter(a=>a.amount!==null).length;d(n),l(a=>({...a,data:{...a.data,mainX:[...a.data.mainX.slice(0,n),{amount:`${n*2}:00`,unit:""},...a.data.mainX.slice(n+1)],mainY:[...a.data.mainY.slice(0,n),{amount:0,unit:"건"},...a.data.mainY.slice(n+1)]}}))},i=()=>{l(L)};return e.jsx(C,{children:e.jsxs("div",{className:"flex flex-col gap-5",children:[e.jsx("div",{style:{width:`${t.viewBoxWidth}px`,height:`${t.viewBoxHeight}px`},children:e.jsx(h,{...t,barChartSeries:o,activeDataIndex:w})}),e.jsx(s,{onClick:B,variant:"outline",size:"sm",className:"w-fit",children:"실시간 업데이트"}),e.jsx(s,{onClick:u,variant:"outline",size:"sm",className:"w-fit",children:"다음 시간 축 추가"}),e.jsx(s,{onClick:i,variant:"outline",size:"sm",className:"w-fit",children:"초기화"})]})})},R=t=>{const[o,l]=g.useState(t.barChartSeries),w=()=>{const u=o.data.mainY.filter(n=>n&&n.length>0).length-1,i=Math.max(0,u);l(n=>{const a=[...n.data.mainY];(!a[i]||a[i].length===0)&&(a[i]=[]);const r=a[i].map(Y=>({...Y})),m=Math.floor(Math.random()*r.length),S=Number(r[m].amount??0);return r[m].amount=S+Math.floor(Math.random()*10),r[m].unit="건",a[i]=r,{...n,data:{...n.data,mainY:a}}})},d=()=>{const u=o.data.mainY.filter(i=>i&&i.length>0).length;l(i=>({...i,data:{...i.data,mainX:[...i.data.mainX.slice(0,u),{amount:`${u*2}:00`,unit:""},...i.data.mainX.slice(u+1)],mainY:[...i.data.mainY.slice(0,u),[{amount:45,unit:"건",label:"아메리카노"}],...i.data.mainY.slice(u+1)]}}))},B=()=>{l(v)};return e.jsx(C,{children:e.jsxs("div",{className:"flex flex-col gap-5",children:[e.jsx("div",{style:{width:`${t.viewBoxWidth}px`,height:`${t.viewBoxHeight}px`},children:e.jsx(h,{...t,barChartSeries:o})}),e.jsx(s,{onClick:w,variant:"outline",size:"sm",className:"w-fit",children:"실시간 업데이트"}),e.jsx(s,{onClick:d,variant:"outline",size:"sm",className:"w-fit",children:"다음 시간 축 추가"}),e.jsx(s,{onClick:B,variant:"outline",size:"sm",className:"w-fit",children:"초기화"})]})})},b={args:{viewBoxWidth:1020,viewBoxHeight:156,hasXAxis:!0,hasBarGradient:!0,showXGuideLine:!0,showYGuideLine:!0,barChartSeries:G,activeTooltip:!0,tooltipContent:(t,o)=>`${t} (${o})`,yGuideLineCount:4,xAxisType:"right-arrow"},render:t=>e.jsx(f,{...t})},p={args:{viewBoxWidth:1020,viewBoxHeight:300,hasXAxis:!0,hasBarGradient:!0,showXGuideLine:!0,showYGuideLine:!0,barChartSeries:v,activeTooltip:!0,yGuideLineCount:4,xAxisType:"right-arrow"},render:t=>e.jsx(R,{...t})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    viewBoxWidth: 1000,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    yGuideLineCount: 4,
    barChartSeries: WEEKLY_DATA,
    activeTooltip: true,
    tooltipContent: (mainY, subY) => \`\${mainY} (\${subY})\`,
    chartTitle: '일별 매출 꺾은선 차트',
    chartDescription: '일별 매출 꺾은선 차트 설명',
    xAxisType: 'right-arrow',
    activeDataIndex: 3,
    barColorChangeOnHover: true
  },
  render: args => <TooltipProvider>
      <div style={{
      width: \`\${args.viewBoxWidth}px\`,
      height: \`\${args.viewBoxHeight}px\`
    }}>
        <BarChart {...args} />
      </div>
    </TooltipProvider>
}`,...c.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    viewBoxWidth: 1000,
    viewBoxHeight: 250,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    yGuideLineCount: 4,
    barChartSeries: STACK_BAR,
    activeTooltip: true,
    chartTitle: '일별 매출 꺾은선 차트',
    chartDescription: '일별 매출 꺾은선 차트 설명',
    xAxisType: 'right-arrow',
    activeDataIndex: 3,
    barColorChangeOnHover: true
  },
  render: args => <TooltipProvider>
      <div style={{
      width: \`\${args.viewBoxWidth}px\`,
      height: \`\${args.viewBoxHeight}px\`
    }}>
        <BarChart {...args} />
      </div>
    </TooltipProvider>
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    viewBoxWidth: 1020,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    barChartSeries: SECONDARY_SERIES_MOCK,
    //secondarySeries: SECONDARY_SERIES_MOCK,
    activeTooltip: true,
    tooltipContent: (mainY, subY) => \`\${mainY} (\${subY})\`,
    yGuideLineCount: 4,
    xAxisType: 'right-arrow'
  },
  render: args => <RealtimeBarChart {...args} />
}`,...b.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    viewBoxWidth: 1020,
    viewBoxHeight: 300,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    barChartSeries: STACK_BAR_HOURLY,
    //secondarySeries: SECONDARY_SERIES_MOCK,
    activeTooltip: true,
    yGuideLineCount: 4,
    xAxisType: 'right-arrow'
  },
  render: args => <RealtimeStackBarChart {...args} />
}`,...p.parameters?.docs?.source}}};const K=["Default","StackBar","Realtime","RealtimeStackBar"];export{c as Default,b as Realtime,p as RealtimeStackBar,x as StackBar,K as __namedExportsOrder,k as default};
