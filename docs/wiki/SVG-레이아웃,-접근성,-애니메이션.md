- [SVG 초급 (레이아웃, 접근성, 애니메이션)](#svg-초급-레이아웃-접근성-애니메이션)
- [SVG 레이아웃](#svg-레이아웃)
    + [SVG 캔버스(Canvas) 혹은 뷰포트(Viewport)](#svg-캔버스canvas-혹은-뷰포트viewport)
    + [SVG 뷰박스(viewBox)](#svg-뷰박스viewbox)
- [SVG 컨테이너 요소](#svg-컨테이너-요소)
    + [\<g> 요소](#g-요소)
    + [\<use> 요소](#use-요소)
    + [\<defs> 요소](#defs-요소)
    + [\<symbol> 요소](#symbol-요소)
    + [\<svg> 요소](#svg-요소)
- [SVG 하이퍼링크](#svg-하이퍼링크)
    + [xlink 네임스페이스 속성](#xlink-네임스페이스-속성)
- [SVG 텍스트](#svg-텍스트)
    + [\<text> 요소](#text-요소)
    + [\<tspan> 요소](#tspan-요소)
    + [\<textPath> 요소](#textpath-요소)
- [SVG 마스크](#svg-마스크)
    + [이미지 마스크](#이미지-마스크)
    + [마스크(mask)와 클립패스(clipPath)의 차이점](#마스크mask와-클립패스clippath의-차이점)
    + [그레디언트 마스크 이미지](#그레디언트-마스크-이미지)
    + [텍스트 마스크](#텍스트-마스크)
- [SVG 클립 패스](#svg-클립-패스)
    + [\<clipPath> 요소, clip-path 속성](#clippath-요소-clip-path-속성)
- [SVG 그레디언트](#svg-그레디언트)
    + [\<linearGradient> 요소](#lineargradient-요소)
    + [\<radialGradient> 요소](#radialgradient-요소)
- [SVG 접근성](#svg-접근성)
    + [SVG 1.1 접근성](#svg-11-접근성)
    + [SVG 텍스트 접근성](#svg-텍스트-접근성)
    + [SVG 포커스 설정](#svg-포커스-설정)
    + [SVG 2.0 접근성 지원](#svg-20-접근성-지원)
    + [SVG 최적화](#svg-최적화)
- [SVG 애니메이션](#svg-애니메이션)
  * [Synchronized Multimedia Integration Language (SMIL)](#synchronized-multimedia-integration-language-smil)
    + [\<animate> 요소: numeric attribute 애니메이션](#animate-요소-numeric-attribute-애니메이션)
    + [\<animateTransform> 요소: transform attribute 애니메이션](#animatetransform-요소-transform-attribute-애니메이션)
    + [\<animateMotion> 요소: Path 따라가기](#animatemotion-요소-path-따라가기)
  * [CSS 애니메이션](#css-애니메이션)
    + [외부 CSS 애니메이션](#외부-css-애니메이션)
    + [SVG 내장 CSS 스타일링](#svg-내장-css-스타일링)
- [SVG Attribute](#svg-attribute)
- [참고자료](#참고자료)


https://codepen.io/anthonydugois/full/mewdyZ/ SVG Path 연습하기

# **SVG 레이아웃**

SVG 코드가 화면에 렌더링 되고, 레이아웃 되는 영역에 대한 개념을 정리해봅니다.

### **SVG 캔버스(Canvas) 혹은 뷰포트(Viewport)**

너비(width), 높이(height)를 설정

```jsx
<svg width="512" height="512">
  ...
</svg>
```

### **SVG 뷰박스(viewBox)**

`viewBox` 속성은 값으로 `min-x`, `min-y`, `width`, `height`숫자 배열 값을 전달 받습니다. 이 값은 뷰포트에 맵핑 되는 공간을 명시 하며, `preserveAspectRatio` 속성과 관계를 가집니다.

```jsx
<svg 
  width="512" height="512" 
  viewBox="0 0 512 512">
  ...
</svg>
```

**PreserveAspectRatio**

SVG 뷰포트와 뷰박스 크기가 다를 경우, 그래픽의 가로:세로 비율을 유지하거나 크기를 확대/축소하는 스케일링 설정은 `preserveAspectRatio` 속성을 사용합니다. `viewBox` 속성과 관련된 속성으로 `viewBox` 속성이 설정되지 않으면 무시됩니다.

- `<align>`: 뷰박스와 뷰포트 크기가 다른 경우, SVG 그래픽 요소를 공간에 정렬하는 설정입니다.
    
    
    | `none` | 가로:세로 비율을 보존하지 않습니다. (<meetOrSlide> 매개변수 값 무시) |
    | --- | --- |
    | `xMinYMin` | 가로:세로 비율을 유지합니다. 뷰포트의 **왼쪽 x, 상단 y 축 값에 위치** 시킵니다. |
    | `xMidYMin` | 가로:세로 비율을 유지합니다. 뷰포트의 **가운데 x, 상단 y 축 값에 위치** 시킵니다. |
    | `xMaxYMin` | 가로:세로 비율을 유지합니다. 뷰포트의 **오른쪽 x, 상단 y 축 값에 위치** 시킵니다. |
    | `xMinYMid` | 가로:세로 비율을 유지합니다. 뷰포트의 **왼쪽 x, 중앙 y 축 값에 위치** 시킵니다. |
    | `xMidYMid` | 가로:세로 비율을 유지합니다. 뷰포트의 **가운데 x, 중앙 y 축 값에 위치** 시킵니다. |
    | `xMaxYMid` | 가로:세로 비율을 유지합니다. 뷰포트의 **오른쪽 x, 중앙 y 축 값에 위치** 시킵니다. |
    | `xMinYMax` | 가로:세로 비율을 유지합니다. 뷰포트의 **왼쪽 x, 하단 y 축 값에 위치** 시킵니다. |
    | `xMidYMax` | 가로:세로 비율을 유지합니다. 뷰포트의 **가운데 x, 하단 y 축 값에 위치** 시킵니다. |
    | `xMaxYMax` | 가로:세로 비율을 유지합니다. 뷰포트의 **오른쪽 x, 하단 y 축 값에 위치** 시킵니다. |
- `<meetOrSlide>` (옵션): 뷰박스와 뷰포트 크기가 다른 경우, SVG 그래픽 요소를 채우거나 자름
    
    
    | `meet` | 가로:세로 비율을 유지합니다.
    뷰박스와 뷰포트 크기가 다를 경우, 뷰박스를 뷰포트 안에 모두 표시합니다. |
    | --- | --- |
    | `slice` | 가로:세로 비율을 유지합니다.
    뷰박스와 뷰포트 크기가 다를 경우, 뷰박스를 잘라 화면에 표시합니다 |

```jsx

<svg
  width="512" height="512"
  viewBox="0 0 512 512"
  preserveAspectRatio="xMaxYMin meet">
  ...
</svg>
```

<img width="450" height="300" alt="image" src="https://github.com/user-attachments/assets/9dd153d3-5e04-46f4-a122-45a707c6fcef" />

# **SVG 컨테이너 요소**

### \<g> 요소

`<g>` 요소는 그룹화하기 위한 컨테이너 요소입니다. 

- 내부에 `<title>`, `<desc>` 요소를 사용하면 그룹화 된 요소에 접근 가능한 정보를 제공할 수 있습니다.
- 관련 요소를 그룹화하여 그룹 전체를 개별 부분과 비교하여 조작 할 수 있습니다.
- 애니메이션을 그룹에 적용 할 수 있습니다.
- <g> 요소에 포함되지 않은 요소는 자체 그룹 요소로 간주 됩니다.

```markup
<svg width="512" height="512" viewBox="0 0 512 512">

  <!-- 그룹 요소 -->
  <g id="fruit-cherry">
    <g id="stems-leaf">
      <path class="stems" fill="none" stroke="#7AA20D" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" d="M54.817,169.848c0,0,77.943-73.477,82.528-104.043c4.585-30.566,46.364,91.186,27.512,121.498" />
      <path class="leaf" fill="#7AA20D" stroke="#7AA20D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M134.747,62.926c-1.342-6.078,0.404-12.924,5.762-19.681c11.179-14.098,23.582-17.539,40.795-17.846 c0.007,0,22.115-0.396,26.714-20.031c-2.859,12.205-5.58,24.168-9.774,36.045c-6.817,19.301-22.399,48.527-47.631,38.028 C141.823,75.784,136.277,69.855,134.747,62.926z" />
    </g>
    <g id="cherrys">
      <path class="r-cherry" fill="#ED6E46" stroke="#ED6E46" stroke-width="12" d="M164.836,193.136 c1.754-0.12,3.609-0.485,5.649-1.148c8.512-2.768,21.185-6.985,28.181,3.152c15.076,21.845,5.764,55.876-18.387,66.523 c-27.61,12.172-58.962-16.947-56.383-45.005c1.266-13.779,8.163-35.95,26.136-27.478   C155.46,191.738,159.715,193.485,164.836,193.136z" />
      <path class="l-cherry" fill="#ED6E46" stroke="#ED6E46" stroke-width="12" d="M55.99,176.859 c1.736,0.273,3.626,0.328,5.763,0.135c8.914-0.809,22.207-2.108,26.778,9.329c9.851,24.647-6.784,55.761-32.696,60.78 c-29.623,5.739-53.728-29.614-44.985-56.399c4.294-13.154,15.94-33.241,31.584-20.99C47.158,173.415,50.919,176.062,55.99,176.859z" />
    </g>
  </g>

</svg>

```

### \<use> 요소

`<use>`요소를 통해 문서 전반에 걸쳐 요소를 재사용 할 수 있습니다. 

- `x`, `y`, `width`, `height` 속성을 사용해 설정합니다.
- `xlink:href` 속성을 사용해 재사용 할 요소를 호출(식별자 ID 참조) 할 수 있습니다.

```markup
<svg width="512" height="512" viewBox="0 0 512 512">

  <g id="fruit-cherry" transform="translate(0 100) scale(0.45)">
    <g id="stems-leaf">...</g>
    <g id="cherrys">...</g>
  </g>

  <!-- 재사용 요소 -->
  <use xlink:href="#fruit-cherry" x="50" y="100" />
  <use xlink:href="#fruit-cherry" x="150" />

</svg>

```

### \<defs> 요소

`<defs>` 요소 내에 선언된 그래픽은 SVG 뷰포트에 렌더링 되지 않습니다. 화면에 렌더링 하려면 `<use>` 요소를 통해 참조를 해야 합니다. `<defs>` 내부에 선언된 그래픽 요소의 `id` 속성을 `<use>` 요소의 `xlink:href` 속성을 통해 참조하여 문서 전체에서 사용할 수 있습니다 .

```markup
<svg width="512" height="512" viewBox="0 0 512 512">

  <!-- 그래픽 정의 defs -->
  <defs>
    <!-- 체리 그래픽 3개를 묶은 그룹 요소 선언 -->
    <g id="cherry-tree-group">
      <g id="fruit-cherry" transform="translate(0 100) scale(0.3)">...</g>
      <use xlink:href="#fruit-cherry" x="50" y="100" />
      <use xlink:href="#fruit-cherry" x="150" />
    </g>
  </defs>

  <!-- defs 내부에 선언된 체리 그래픽 3개 그룹 재사용 -->
  <use xlink:href="#cherry-tree-group" />
  <use xlink:href="#cherry-tree-group" x="200" y="100" />

</svg>

```

### \<symbol> 요소

`<symbol>` 요소는 `<g>` 요소와 비슷하지만, 화면에 렌더링 되지 않습니다. 마찬가지로 `<use>` 요소를 사용해 재사용 할 수 있습니다. `<defs>`, `<g>` 요소와 달리 `viewBox`, `preserveAspectRatio` 속성을 설정할 수 있습니다.

```markup
<svg width="512" height="512" viewBox="0 0 512 512">

  <!-- 심볼 요소 등록 -->
  <symbol id="cherry-tree-group" viewBox="0 0 200 512" preserveAspectRatio="xMaxYMid slice">
    <g id="fruit-cherry" transform="translate(0 100) scale(0.45)">...</g>
    <use xlink:href="#fruit-cherry" x="50" y="100" />
    <use xlink:href="#fruit-cherry" x="150" />
  </symbol>

  <!-- 심볼 재사용 -->
  <use xlink:href="#cherry-tree-group" />

</svg>

```

### \<svg> 요소

`<svg>` 요소 내부에 `<svg>` 요소를 중첩할 수 있습니다.

```markup
<svg id="root-svg">

  <svg id="nested-svg" x="55" y="55">
    <!-- svg code -->
  </svg>

</svg>

```

# SVG 하이퍼링크

### xlink 네임스페이스 속성

HTML `<a>` 요소의 `href`, `title` 속성 앞에 `xlink:` 접두사가 붙는다고 생각하면 됩니다. 설정 가능한 속성은 이외에도 `target` 속성이 있습니다.

| `xlink:href` | 사용자 인터랙션에 따라 연결된 웹 URL로 이동합니다. |
| --- | --- |
| `xlink:title` | 마우스가 텍스트 위에 올라가면 타이틀을 툴팁으로 제공합니다. |

```html
<svg>
  <a
    xlink:href="<https://a11y.gitbook.io/graphics-aria>"
    xlink:title="AOA - 그래픽스 아리아(새 탭)"
    target="_blank">
    <text x="30%" y="55%" font-size="20">Graphics ARIA</text>
  </a>
</svg>
```

```css
svg a {
  cursor: pointer;
  transition: all 0.4s ease;
}

svg a:hover {
  fill: #448aff;
}
```

# SVG 텍스트

### \<text> 요소

`<text>`요소는 SVG 그래픽 내에 텍스트를 마크업 할 때 사용합니다. 

- 많은 속성 옵션을 제공하며, 그레디언트, 패턴, 클리핑 패스, 마스크 또는 필터에도 적용 할 수 있습니다.
- SVG 그래픽은 일반 그래픽 이미지와 달리 SVG 코드 내에서 쉽게 변경하고 편집 할 수 있습니다.

| `x`, `y` | 절대 좌표 |
| --- | --- |
| `dx`, `dy` | 상대적 위치 이동 |
| `rotate` | 글자 마다 회전을 시킬 수 있습니다. 
설정한 회전 값 개수와 글자 수가 일치하지 않으면, 별도의 값이 설정되지 않은 글자는 마지막 설정 값을 따르게 됩니다. |
| `textLength` | 텍스트의 길이를 지정합니다. 텍스트 길이에 설정된 길이에 맞게 문자 사이의 공백을 조정합니다 |
| `lengthAdjust` | `spacing`: 글자 간격을 공간을 채우기 위해 조정합니다.
`spacingAndGlyphs`: 글자 간격 뿐만 아니라 글리프 크기까지 조정합니다. |

```html
<svg width="620" height="140" viewBox="0 0 620 140">
  <text 
    x="30" y="90" 
    fill="#ED6E46" font-size="100" font-family="'Leckerli One', cursive"
    rotate="4, 8, -8, -4, -20, -24, 48">
    evening
  </text>
</svg>
```

### \<tspan> 요소

SVG에서 자동 줄 바꿈 또는 줄 바꿈을 지원하지 않는데, `<tspan>`으로 특정 단어나 글자를 개별적으로 조작하여 별도의 디자인을 수행할 수 있습니다. 개별 제어 할 때 새로운 좌표 설정 대신 이전 텍스트에 상대적으로 위치 설정이 가능합니다.

```html
<svg width="775" height="600">
  <text 
    x="15" y="150" fill="#e13137" 
    font-size="60" font-family="'Leckerli One', cursive">
    We
    <tspan dy="-30 30 30" dx="-10" fill="#dfdfdf" font-size="60">are</tspan>
    <tspan dy="45" dx="-14" font-size="100">Champion</tspan>
  </text>
</svg>
```

### \<textPath> 요소

`<defs>` 요소를 사용해 재 사용할 `<path>` 데이터를 등록하고 식별 가능한 ID 값을 설정합니다. `<textPath>` 요소를 사용해 콘텐츠를 감싼 후, `xlink:href` 속성 값으로 `<path>` 요소의 ID 식별자를 대입하여 참조 시킵니다.

```html
<svg width="800" height="600">
  <defs>
    <path id="text-line" d="M100,300 Q200,200 350,300 Q550,450 700,300" />
  </defs>
  <text 
    x="20" y="60%" fill="#448aff" 
    font-size="30" font-family="'Leckerli One', cursive">
    <textPath xlink:href="#text-line">
      SVG text can use the textPath element and 
      path data to draw text that flows along the path.
    </textPath>
  </text>
</svg>
```

<img width="1528" height="350" alt="image" src="https://github.com/user-attachments/assets/19d3b07f-9f0e-427f-90dd-cedf6d41615a" />

# SVG 마스크

### 이미지 마스크

<defs> 내부에 <mask> 요소를 선언하고, 식별 가능한 `id` 속성을 부여합니다. <image> 요소 mask 속성 값으로 `url()` 함수를 사용해 마스크 ID를 설정하면 마스킹 된 이미지가 화면에 렌더링 됩니다. 주의할 점은 마스크는 Alpha Channel 을 사용 하므로 하얀색(#fff)일 경우 Opacity 100%와 같고, 검정색(#000)일 경우는 Opacity 0%와 같습니다.

```html
<svg>
  <defs>
    <mask id="photo-mask">
      <polygon fill="#fff" points="151.9,159.4 ..." />
    </mask>
</defs>
  <image
    mask="url(#photo-mask)"
    xlink:href="./image/photo.jpg"
    x="20" y="10"
    width="200" height="480" />
</svg>
```

### **마스크(mask)와 클립패스(clipPath)의 차이점**

마스킹은 마스크의 투명도 및 회색 값을 고려하여 부드러운 가장자리를 허용합니다. 반면에 클리핑은 다른 파트에서 정의한 요소의 일부를 제거하는 것을 말합니다. 이 경우 모든 반투명 효과는 가능하지 않습니다.

### 그레디언트 마스크 이미지

```markup
<svg width="512" height="702" viewBox="0 0 512 702">
  <defs>
    <radialGradient id="mask-gradient" cx="322.6659" cy="142.8694" r="194.3122" gradientTransform="matrix(-0.8815 0.4721 -0.3648 -0.6812 659.2268 87.8449)" gradientUnits="userSpaceOnUse">
      <stop offset="0" style="stop-color:#ffffff"/>
      <stop offset="6.693518e-02" style="stop-color:#ececec"/>
      <stop offset="0.5344" style="stop-color:#6f6f6f"/>
      <stop offset="0.8543" style="stop-color:#1f1f1f"/>
      <stop offset="1" style="stop-color:#000000"/>
    </radialGradient>
    <mask id="mask">
	    <polygon fill="url(#mask-gradient)" points="195.6,14.7 135.7,254.6 358.7,299.3 398.3,183.2 398.3,84" />
    </mask>
  </defs>
  <image
    mask="url(#mask)"
    xlink:href="<https://images.unsplash.com/photo-1523364583621-23af08364dc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=41ac7c82c76e28433baafbb49deeb4e5&auto=format&fit=crop&w=500&q=60>"
    aria-label="산을 바라보는 조깅하는 사람의 뒷모습" />
</svg>
```

<img width="415" height="145" alt="image" src="https://github.com/user-attachments/assets/53d0b268-4340-428a-8dca-a426f2b421db" />


### 텍스트 마스크

텍스트에 이미지를 마스킹 하는 방법도 유사합니다. 알파 채널로 사용할 이미지를 설정하고, 텍스트 요소에 `mask` 속성을 설정해 이미지를 마스킹 처리 합니다. 이미지는 알파 채널로 사용 되었기에 흑백으로 표현됩니다.

```markup
<svg width="512" height="702" viewBox="0 0 512 702">

  <defs>
    <mask id="mask">
	  <image xlink:href="<https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d469edc4fc24e0c17c0144146a777f51&auto=format&fit=crop&w=500&q=50>" />
    </mask>
  </defs>

  <text
    mask="url(#mask)"
    x="0" y="250"
    font-size="100" font-family="Arial" font-weight="bold">
    AOA 2018
  </text>

</svg>
```

<img width="538" height="57" alt="image" src="https://github.com/user-attachments/assets/be27251c-4c14-4ce4-b2f1-ac22a06760af" />


# SVG 클립 패스

### \<clipPath> 요소, clip-path 속성

클리핑 처리할 요소 `clip-path` 속성에 `<clipPath>` 요소 ID를 참조하면 클리핑 처리 됩니다. `<clipPath>` 요소 내부에는 자를 모양의 도형 요소를 삽입합니다. 사용법은 아래와 같습니다.

```html
<svg width="512" height="702" viewBox="0 0 512 702">
  <!-- 클립패스 요소 -->
  <clipPath id="clippath">
	  <circle cx="150" cy="150" r="150" />
  </clipPath>
  <!-- 클립 패스 처리된 텍스트 -->
  <text clip-path="url(#clippath)" font-size="100" font-family="Arial" font-weight="bold" x="0" y="250">
    AOA 2018
  </text>
  <!-- 가이드 텍스트 -->
  <text opacity="0.1" font-size="100" font-family="Arial" font-weight="bold" x="0" y="250">
    AOA 2018
  </text>
</svg>
```

<img width="394" height="57" alt="image" src="https://github.com/user-attachments/assets/d9f7730f-2ce6-4d96-82cd-4436e4b4a6c9" />


# SVG 그레디언트

### \<linearGradient> 요소

`<defs>` 요소 내에 `<linearGradient>` 요소를 정의합니다.

- `<linearGradient>` 요소 내부에는 `<stop>` 요소를 2개 이상 사용해 그레디언트 컬러 스톱을 설정할 수 있습니다.

그레디언트를 적용할 요소 `fill` 속성에 참조 연결합니다. 

```html
<svg>
  <defs>
    <linearGradient id="bl-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00a2ff" />
      <stop offset="100%" stop-color="#004d80" />
		</linearGradient>
  </defs>
  <rect
    fill="url(#bl-g)"
    x="0" y="0"
    width="100" height="100" />
</svg>
```

<img width="195" height="232" alt="image" src="https://github.com/user-attachments/assets/7881ba01-85b1-4044-a1ec-338fccc9cdee" />

### \<radialGradient> 요소

원형 그레디언트를 그려 요소에 매핑 하는 방법 또한 선형 그레디언트와 유사합니다. 다만 `<radialGradient>` 원 중심(`cx`, `cy`)과 반지름(`r`), 초점(`fx`, `fy`)을 설정하는 점이 다릅니다.

```html
<svg>
  <defs>
    <radialGradient id="yr-rg" cx="50%" cy="50%" r="50%" fx="20%" fy="20%">
      <stop offset="0%" stop-color="#ffc054" />
      <stop offset="100%" stop-color="#ff614b" />
    </radialGradient>
  </defs>
  <rect
    fill="url(#yr-rg)"
    x="0" y="0"
    width="100" height="100" />
</svg>

```

<img width="170" height="205" alt="image" src="https://github.com/user-attachments/assets/f2aaccbd-9edb-40f9-9f39-7b1e2b7eb1e8" />


# SVG 접근성

[SVG1.1](http://www.w3.org/TR/SVG11/) 접근성 지원은 브라우저와 스크린 리더에서 제한적 입니다. [SVG2](https://svgwg.org) 로 상황이 개선 될 예정 이지만 [ARIA](http://www.w3.org/TR/wai-aria/) 를 사용하여 간단한 SVG의 접근성을 향상시킬 수 있습니다.

### SVG 1.1 접근성

SVG 그래픽에 접근성을 제공할 수 있는 `<title>`, `<desc>` 요소를 제공합니다.  설정된 `<title>`, `<desc>` 요소는 일부 브라우저(IE, FF25, …) 접근성 API에 접근 가능한 이름과 설명으로 각각 매핑(Mapping) 됩니다.

SVG 역할(role)을 명확히 제공해야 스크린리더는 이를 정확하게 식별 할 수 있습니다. WAI-ARIA의 `role`, `aria-labelledby` 속성을 사용하여 브라우저 접근성 API에 보다 명확한 정보를 제공할 수 있습니다.

- 인라인 `<svg>` 요소에 `role` 속성 값으로 `img`를 설정하면 그래픽으로 식별됩니다.
- `aria-labelledby` 속성에서 `<title>`, `<desc>` 요소에 부여된 `id` 속성 값 이름을 참조하여 보다 구체적인 정보를 제공할 수 있습니다.
- `role="presentation"` 또는 `role="none"`이 부여된 요소는 브라우저 접근성 API에 매핑 되지 않아 정보를 제공하지 않습니다. 의미가 없는 표현(장식)적인 요소에 사용해야 합니다.

```markup
<svg
  role="img"
  aria-labelledby="title desc"
  width="96" height="96" viewBox="0 0 96 96">

  <title id="title">파이 차트(Pie Chart)</title>
  <desc id="desc">
    전체 자료가 여러 개의 카테고리로 분류되어지는 경우,
    개개의 카테고리를 전체에 대한 비율에 따라 원 내부의 면적을
    분할한 파이(pie)모양의 도표를 말합니다.
  </desc>

  ...

  <g role="presentation" id="pie-chart">...</g>

</svg>

```

### SVG 텍스트 접근성

`<text>`요소의 콘텐츠 접근에 아무런 문제가 없습니다.

```markup
<svg width="620" height="140" viewBox="0 0 620 140">
  <text
    x="30" y="90"
    fill="#ED6E46" font-size="100" font-family="'Leckerli One', cursive">
    SVG 내부 텍스트 콘테츠는 스크린리더에서 잘 읽힙니다.
  </text>
</svg>

```

### SVG 포커스 설정

`<a>` 요소는 포커스 요소라 포커스 접근이 가능하지만, 다른 비 포커스 요소는 포커스 접근이 안됩니다. 하지만 `tabindex` 속성을 설정하면 비 포커스 요소에도 포커스 접근이 가능해집니다.

```markup
<svg width="512" height="512" viewBox="0 0 512 512">

  <g id="fruit-cherry" tabindex="0">
    ...
  </g>

</svg>

```

### SVG 2.0 접근성 지원

SVG 2부터 접근성을 보다 강력하게 지원합니다. [Accessibility Suport](https://www.w3.org/TR/SVG2/access.html) 내용을 살펴보면 다음과 같이 기술하고 있습니다.

- [`<title>, <desc>`](https://www.w3.org/TR/SVG2/struct.html#DescriptionAndTitleElements) 텍스트 대체 수단 지원
- [`<g>`](https://www.w3.org/TR/SVG2/struct.html#GElement) 요소 그룹 의미 정의
- [\<a>](https://www.w3.org/TR/SVG2/linking.html#AElement) 요소 지원
- [`lang`](https://www.w3.org/TR/SVG2/struct.html#LangAttribute) 속성 지원
- [`z-index`](https://www.w3.org/TR/SVG2/render.html#ZIndexProperty) 속성 지원
- ARIA 역할/속성 지원
    - [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)
    - [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
    - [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns)
    - [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)
    - [`aria-level`](https://www.w3.org/TR/wai-aria-1.1/#aria-level)
    - [`heading`](https://www.w3.org/TR/wai-aria-1.1/#heading)
    - [`group`](https://www.w3.org/TR/wai-aria-1.1/#group)
    - [`radiogroup`](https://www.w3.org/TR/wai-aria-1.1/#radiogroup)
    - [landmark](https://www.w3.org/TR/wai-aria-1.1/#landmark_roles) 역할 [지원](https://www.w3.org/TR/SVG2/struct.html#WAIARIAAttributes)
    - [......](https://www.w3.org/TR/SVG2/struct.html#WAIARIAAttributes)
- [포커스(Focus) 지원](https://www.w3.org/TR/SVG2/interact.html#Focus)
- [`tabindex`](https://www.w3.org/TR/SVG2/struct.html#SVGElementTabindexAttribute) 속성 지원
- 스크립트 제작자를 위한 [마우스 이벤트 지원 및 키보드 이벤트 속성](https://www.w3.org/TR/SVG2/interact.html#EventAttributes) 지원
- 스크립트 제작자를 위한 [키보드 이벤트](https://www.w3.org/TR/SVG2/interact.html#SVGEvents) 지원
- SVG 요소에 포커스를 설정하는 스크립트 지원
- SVG 요소의 tabindex 속성을 얻기 위한 스크립트 지원
- [Document Interface](https://www.w3.org/TR/SVG2/struct.html#InterfaceDocumentExtensions)의 HTML activeElement 속성을 얻기 위한 스크립트 지원

### SVG 최적화

[https://github.com/svg/svgo](https://github.com/svg/svgo)

# SVG 애니메이션

## Synchronized Multimedia Integration Language (SMIL)

https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL#animation_following_a_path

인터랙티브한 멀티미디어 표현을 위한 XML 기반 언어입니다.

- 요소의 numeric attribute를 애니메이션 할 수 있습니다 e.g. x, y, …
- transform atrribute를 애니메이션 할 수 있습니다 e.g. translation, rotate, …
- color attribute를 애니메이션 할 수 있습니다
- motion path를 따라가는 애니메이션을 할 수 있습니다.

### `<animate>` 요소: numeric attribute 애니메이션

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animate

아래 예시는 `circle`의 `cx` 속성을 애니메이션 합니다. 이를 위해서 `circle` 요소 내부에 `animate` 요소를 추가합니다. 

`animate`의 주요 속성은 다음과 같습니다.

- `attributeName`: 애니메이션할 속성의 이름
- `from`: 속성의 초기값
- `to`: 속성의 마지막 값
- `dur`: 애니메이션 지속 시간 e.g. 5s

같은 요소에서 더 많은 속성을 애니메이션 하고 싶다면, `animate` 요소를 여러 개 추가할 수 있습니다.

```html
<svg width="300" height="100">
  <title>Attribute Animation with SMIL</title>
  <rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
  <circle cx="0" cy="50" r="15" fill="blue" stroke="black" stroke-width="1">
    <animate
      attributeName="cx"
      from="0"
      to="500"
      dur="5s"
      repeatCount="indefinite" />
  </circle>
</svg>
```

### `<animateTransform>` 요소: transform attribute 애니메이션

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateTransform

`<animateTransform>` 요소는 transform 속성을 애니메이션 하게 해줍니다. transform 속성은 single 속성이 아니라, `rotation(theta, x, y)`처럼 복합적으로 이루어지기 때문에 따로 관리합니다.

아래 예시에서는 rotation의 중심과 각도를 애니메이션 합니다.

```html
<svg width="300" height="100">
  <title>SVG SMIL Animate with transform</title>
  <rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
  <rect
    x="0"
    y="50"
    width="15"
    height="34"
    fill="blue"
    stroke="black"
    stroke-width="1">
    <animateTransform
      attributeName="transform"
      begin="0s"
      dur="20s"
      type="rotate"
      from="0 60 60"
      to="360 100 60"
      repeatCount="indefinite" />
  </rect>
</svg>
```

### \<animateMotion> 요소: Path 따라가기

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion

`<animateMotion>`요소는 path에 따라 요소의 위치와 회전을 애니메이션 합니다. path는 `<path>` 요소와 동일하게 정의됩니다. 요소가 path의 탄젠트를 따라갈지 여부는 정할 수 있습니다.

아래 예시에서는 `repeatCount`를 `indefinite`로 설정함으로써 SVG 이미지가 존재하는 한 무한루프로 동작합니다.

In this example, a blue circle bounces between the left and right edges of a black box, over and over again, indefinitely. The animation here is handled by the [`<animateMotion>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion) element. In this case, we're establishing a path consisting of a **MoveTo** command to define the starting point for the animation, then the **Horizontal-line** command to move the circle 300 pixels to the right, followed by the **Z command**, which closes the path, establishing a loop back to the beginning. By setting the value of the **repeatCount** attribute to `indefinite`, we indicate that the animation should loop forever, as long as the SVG image exists.

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="lightgrey"
    d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />

  <circle r="5" fill="red">
    <animateMotion
      dur="10s"
      repeatCount="indefinite"
      path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
  </circle>
</svg>
```

## CSS 애니메이션

### 외부 CSS 애니메이션

https://kimsangjun.tistory.com/99

```css
// 선 애니메이션
// stroke-width 값을 조정하는 애니메이션을 만들어 기존에 만들어둔 벡터 도형(선)에 애니메이션을 불어넣습니다!
ani1 {
    width: 100px; height: 100px;
    x: 30px; y: 30px;
    fill: none;
    stroke: #880E41;
    stroke-width: 2px;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: ani1 1s infinite linear alternate-reverse;
}
@keyframes ani1 {
    0%   {stroke-dashoffset: 50;}
    100% {stroke-dashoffset: 0;}
}
.ani2 {
    width: 100px; height: 100px;
    x: 30px; y: 30px;
    fill: none;
    stroke: #880E41;
    stroke-width: 2px;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    animation: ani2 2s infinite linear alternate-reverse;
}
@keyframes ani2 {
    0%   {stroke-dashoffset: 400;}
    100% {stroke-dashoffset: 0;}
}
```

### SVG 내장 CSS 스타일링

- SVG 코드 안에 사용할 요소들에 g 태그로 감싸고 아이디 추가
- SVG 코드 바로 안에 style 넣어서 기존 처럼 CSS 애니메이션 구현

https://velog.io/@kimhyo/SVG-Animation

```html
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200" viewBox="0 0 40 40">
    <style type="text/css">
        #svgIconItem{ animation:motion01 1s infinite; transform-origin:50% 50%}
        @keyframes motion01{
            from{ opacity:0; }
            to{ opacity:1;transform:rotate(180deg) }
        }
</style>
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(-406 -806) translate(0 776) translate(48 30) translate(302) translate(56)">
        <circle cx="20" cy="20" r="19.5" fill="#FFF" stroke="#E8E8E8"/>
        <g id="svgIconItem">
          <g transform="translate(4.615 4.615)">
            <g fill="#4229BC">
              <path d="M6.923 1.538L15.385 15.385 -1.538 15.385z" transform="translate(10 6.923) rotate(90 6.923 8.462)"/>
            </g>
          </g>
        </g>
      </g>
  </g>
</svg>
```

# SVG Attribute

- fill
- stroke
- stroke-width

# 참고자료

https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch

https://a11y.gitbook.io/graphics-aria/svg-graphics

https://svgwg.org/

https://www.w3.org/TR/SVG2/

https://www.w3.org/TR/SVG11/