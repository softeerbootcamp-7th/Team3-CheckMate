import{j as s}from"./jsx-runtime-u17CrQMm.js";const o={title:"components/shared/images/images"},r="https://d2h7xu7fzk5nsk.cloudfront.net",n="/assets/images",g=["logoWithTitle.svg","ai_chat_column.png","ai_chat_row.svg","ai_chat_loading.svg","google.svg","analysis.svg","dashboard.svg","robot.svg","report.svg","pos.svg","check.svg","congratulation.svg","warning.svg","empty_dashboard.png","empty_ingridient.svg","up.svg","down.svg","graph_down.svg","graph_same.svg","graph_up.svg","line_graph.svg","bar_graph.svg","donut_chart.svg","number.svg","weather.svg","pos_not_connected.svg","precipitation.svg","sun.svg","sun_cloud.svg","cloud.svg","rain.svg","heavy_rain.svg","snow.svg","alarm_none.svg"],a=()=>{const l=e=>{navigator.clipboard.writeText(`${r}${n}/${e}`)};return s.jsxs("div",{className:"p-5",children:[s.jsxs("p",{className:"body-small-regular text-grey-600",children:["S3에 저장된 ",g.length,"개의 정적 이미지입니다. 각 이미지 클릭 시 이미지의 링크를 복사할 수 있습니다."]}),s.jsx("div",{className:"mt-5 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",children:g.map(e=>s.jsxs("div",{className:"border-grey-200 bg-grey-0 rounded-md border p-2.5 text-center",children:[s.jsx("div",{className:"bg-grey-0 flex h-30 w-full items-center justify-center",children:s.jsx("img",{src:`${r}${n}/${e}`,alt:e,className:"max-h-full max-w-full cursor-pointer object-contain",onClick:()=>l(e)})}),s.jsx("span",{className:"body-small-regular text-grey-600 word-break-all",children:e})]},e))})]})};a.__docgenInfo={description:"",methods:[],displayName:"ImageGallery"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  const handleImageClick = (filename: string) => {
    navigator.clipboard.writeText(\`\${CDN_BASE_URL}\${PATH}/\${filename}\`);
  };
  return <div className="p-5">
      <p className="body-small-regular text-grey-600">
        S3에 저장된 {images.length}개의 정적 이미지입니다. 각 이미지 클릭 시
        이미지의 링크를 복사할 수 있습니다.
      </p>
      <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {images.map(filename => <div key={filename} className="border-grey-200 bg-grey-0 rounded-md border p-2.5 text-center">
            <div className="bg-grey-0 flex h-30 w-full items-center justify-center">
              <img src={\`\${CDN_BASE_URL}\${PATH}/\${filename}\`} alt={filename} className="max-h-full max-w-full cursor-pointer object-contain" onClick={() => handleImageClick(filename)} />
            </div>
            <span className="body-small-regular text-grey-600 word-break-all">
              {filename}
            </span>
          </div>)}
      </div>
    </div>;
}`,...a.parameters?.docs?.source}}};const i=["ImageGallery"];export{a as ImageGallery,i as __namedExportsOrder,o as default};
