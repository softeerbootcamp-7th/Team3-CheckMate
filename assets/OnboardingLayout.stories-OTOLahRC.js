import{j as r}from"./jsx-runtime-u17CrQMm.js";const n=({children:a})=>r.jsx("div",{className:"onboarding-layout",children:a}),o=({children:a})=>r.jsx("aside",{className:"onboarding-sidebar bg-special-dashboard-bg size-full",children:a}),s=({children:a})=>r.jsx("main",{className:"onboarding-main bg-special-card-bg size-full",children:a}),i=({children:a})=>r.jsx("footer",{className:"onboarding-footer bg-special-card-bg size-full",children:a});n.Sidebar=o;n.Main=s;n.Footer=i;n.__docgenInfo={description:"",methods:[{name:"Sidebar",docblock:null,modifiers:["static"],params:[{name:"{ children }: PropsWithChildren",optional:!1,type:{name:"PropsWithChildren",alias:"PropsWithChildren"}}],returns:null},{name:"Main",docblock:null,modifiers:["static"],params:[{name:"{ children }: PropsWithChildren",optional:!1,type:{name:"PropsWithChildren",alias:"PropsWithChildren"}}],returns:null},{name:"Footer",docblock:null,modifiers:["static"],params:[{name:"{ children }: PropsWithChildren",optional:!1,type:{name:"PropsWithChildren",alias:"PropsWithChildren"}}],returns:null}],displayName:"OnboardingLayout"};const d={title:"components/shared/onboarding-layout/OnboardingLayout",component:n,tags:["autodocs"],parameters:{layout:"fullscreen"}},e={decorators:[a=>r.jsx("div",{className:"h-screen w-screen",children:r.jsx(a,{})})],render:()=>r.jsxs(n,{children:[r.jsx(n.Sidebar,{children:"sidebar"}),r.jsx(n.Main,{children:"main"})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  // #storybook-root 요소의 크기를 조절하기 위해 사용
  decorators: [Story => <div className="h-screen w-screen">
        <Story />
      </div>],
  render: () => <OnboardingLayout>
      <OnboardingLayout.Sidebar>sidebar</OnboardingLayout.Sidebar>
      <OnboardingLayout.Main>main</OnboardingLayout.Main>
    </OnboardingLayout>
}`,...e.parameters?.docs?.source}}};const l=["Default"];export{e as Default,l as __namedExportsOrder,d as default};
