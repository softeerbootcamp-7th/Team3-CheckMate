# SVG란 ?

# SVG (Scalable Vector Graphics)

> 2차원 그래픽을 표현하기 위해 만들어진 XML 파일 형식의 마크업 언어
> 

SVG는 W3C로부터 만들어진 웹 친화적인 벡터 파일 포멧이다.

<aside>
💡

W3C (World Wide Web Consortium)

웹 기술 표준화 국제 컨소시임

웹 표준을 정의하고 HTML, CSS 등의 규칙을 관리함

</aside>

JPEG와 같은 픽셀 기반의 래스터 파일과 달리, 벡터 파일은 그리드 위의 점과 선을 기반으로 하는 수학 공식을 통해 이미지를 저장함

따라서, SVG와 같은 벡터 파일은 품질을 그대로 유지하면서 크기를 마음대로 조정할 수 있게 되며, 로고와 복잡한 온라인 그래픽에 아주 적합한 파일 형식이다.

# SVG 파일의 장단점

## SVG 파일의 장점

- 줌을 하거나 크기를 변경해도 SVG 이미지의 픽셀이 꺠지지 않고 화질이 유지된다.
- 용량이 PNG, GIF보다 작다.
- 어도비 일러스트레이터 등의 벡터 드로잉 프로그램이나 메모장, 문서 편집기에서 SVG 이미지를 작성하고 수정할 수 있다.
- 중첩된 경로, 알파 마스크, 다양한 그래픽 명령어, 하이퍼링크 등의 기능을 지원한다.
- SVG 파일은 텍스트를 디자인이 아닌 텍스트 그대로 처리하기 때문에 스크린 리더가 SVG 이미지에 포함된 모든 단어를 스캔할 수 있다. 그래서 웹 페이지를 읽어야 할 때 매우 유용하다.
    
    검색 엔진은 SVG 이미지 텍스트를 읽고 색인을 달 수도 있다.
    

## SVG 파일의 단점

- SVG 파일은 로고, 일러스트레이션, 차트 등 웹 그래픽에 적합하다. 그러나 픽셀이 부족하므로 고품질 디지털 사진을 표현하기 어렵다. 디테일이 풍부한 사진에는 JPEG 파일이 더 좋다
- 최신 브라우저만 SVG 이미지를 지원할 수 있으므로 이전 브라우저 (Internet Explorer 8)에서는 SVG 파일을 사용하기 어려울 수 있다.
- SVG 이미지에 포함된 코드는 SVG 파일 포멧을 처음 사용하는 경우 이해하기 힘들 수 있다.

# SVG 파일의 용도

## 웹 사이트 아이콘과 로고

디자이너는 버튼과 같은 웹 사이트 아이콘과 기업 로고를 표시하는데 SVG를 사용함

SVG 파일은 품질을 저하시키지 않고 이미지를 확대하거나 축소할 수 있으므로 다양한 위치에 각기 다른 크기로 표현되어야 하는 그래픽에 적합함

## 인포그래픽 및 일러스트레이션

SVG 파일은 XML을 사용하므로 구글과 같은 검색 엔진이 덱스트가 많은 차트와 그래프를 읽을 수 있다. 따라서, 검색 엔진 최적화에 도움이 된다.

또한, SVG는 애니메이션을 지원하여 더욱 흥미로운 웹 페이지를 만들 수 있다.

# 래스터 vs 벡터

SVG와 다른 이미지 파일 형식의 가장 근본적인 차이점은 바로 래스터 유형이나, 벡터 유형이냐이다.

<img width="281" height="179" alt="image" src="https://github.com/user-attachments/assets/6ebca006-9ea6-4c42-b84f-f19065bd82df" />

## 래스터 (Raster)

래스터는 비트맵으로 이미지를 저장한다.

비트맵은 비트의 배열로 이미지를 점으로 나누고 그 점에 색상 데이터를 저장하는 방식이다.

데이터를 엄청나게 세밀한 격자 모양으로 나누고 각각의 공간에 0 또는 1을 할당하는 방식이다. 흑백 이미지는 한 점이 흰색 또는 검은색 데이터를 가지기 때문에 0 또는 1의 값을 가지지만 컬러 이미지는 색상 값을 가지기 때문에 한 점에 할당해야 하는 데이터의 크기가 더 크다. 이런 방식은 이미지의 크기가 크거나 고해상도일수록 파일의 크기가 커질 수 밖에 없다. 따라서, 데이터 처리 분야에서 이미지를 좀 더 다루기 위해 압축 기술을 개발해왔다.

반복되는 패턴이나 중복된 데이터들을 축약하는 방식으로 데이터의 크기를 줄이는 것이다. 이미지 데이터 압축 기술의 결과물이 우리가 흔히 보는 jpg나 gif 등의 래스터 이미지 파일들이라고 할 수 있다.

### 래스터 장점

- 디테일한 표현
    - 래스터 파일을 올바른 치수로 표시하면 고해상도 사진에서 볼 수 있는 복잡한 디테일과 색상을 고스란히 표현할 수 있다. 파일에 포함된 픽셀 수가 많을수록 이미지 품질이 높아짐
- 정밀한 편집
    - 래스터 그래픽이나 사진을 편집할 때 각 픽셀을 개별적으로 변경할 수 있다. 따라서 필요에 따라 이미지를 보정하고 조정할 수 있다.
- 뛰어난 호환성
    - 래스터 파일은 매우 다양한 프로그램과 웹 브라우저에 열 수 있으므로 이미지를 간편하게 확인하고, 편집하고 , 공유할 수 있음

### 래스터 단점

- 제한적인 해상도
    - 벡터 이미지와 달리 래스터 파일은 크기를 조정할 때 해상도가 유지되지 않는다. 이미지를 확대하면 색상과 디테일이 왜곡되어 사용이 제한될 수 있음
- 큰 파일 크기
    - 래스터 파일에는 수백만 개의 픽셀이 포함될 수 있음. 이로 인해 매우 디테일한 이미지가 생성되지만 파일 크기가 커지고 로딩 속도가 느려질 수 있음
- 패브릭 인쇄 한계
    - 래스터 이미지를 구성하는 정사각형 픽셀은 직물이나 의류에는 잘 적용되지 않음. 티셔츠 로고와 프린트를 만들 때는 벡터 이미지를 선택하는 것이 좋다.

## 벡터(Vector)

벡터는 래스터와 다르게 이미지를 잘게 나누지 않고 하나의 선이나 도형으로 저장하는 방식임

이미지의 데이터가 갖는 모양을 연속적인 함수로 표현하고 그 함수를 저장하는 방식이기 때문에 래스터 이미지보다 크기가 작고 효율적임

연속적인 함수로 표현하기 때문에 확대를 해도 그림이 깨지지 않고 원형을 유지하게 된다. 그러나, 실물 사진처럼 색상 데이터의 구성이 복잡한 경우, 함수로 표현하는 것이 까다로워지고 처리시간이 길어지게 된다.

따라서, 도안이나 로고 등 단순한 색상 구성이 전부인 이미지에 사용된다.

# CSS, HTML에서 SVG 이미지를 사용하는 방법

## 1. img 태그

SVG 이미지를 삽입하는 가장 간단한 방법이다.

HTML 문서에 `<img>` 태그를 추가하고 아래 코드처럼 src 속성이 SVG 이미지를 참조하도록 한다.

```html
<img src="examplage.svg" alt="Example SVG"/>
```

크기를 지정하지 않은 경우, <img> 태그를 통해 SVG 이미지를 추가한다면 원본 SVG 파일 크기로 상정된다.

위 예시와 같이 img 태그에서 크기를 수정하지 않았으므로 원본 크기로 간주한다.

원본 크기를 변경하고 싶다면, css로 크기를 수정하거나 원본 svg의 width, height를 변경하면 된다

## 2. Backgroud-image

<img> 태그를 추가하는 것과 비슷하지만, CSS를 활용하는 방식이다.

```html
.example-svg {
	background-image: url(example.svg)
}
```

CSS 백그라운드 이미지로 SVG를 사용한다면, <img> 태그를 사용하는 것과 비슷하게 제약 사항이 있지만, 좀 더 작성자의 입맛에 맞출 수 있다.

하지만, base64 인코딩을 하면 다운로드 하는 동안 나머지 스타일 로딩을 차단시키기에 사용하지 않는 편이 좋다.

## 3. Iframe

<iframe> 요소 내 SVG를 로드할 수 있다.

대부분의 작업을 구현할 수 있지만, 더 발전적인 기능을 사용하고자 한다면 가장 좋은 방법은 아님

```html
<iframe src="example.svg"></iframe>
```

다만 <iframe>은 유지보수가 어렵고, 검색 엔진 최적화에 안좋다

또한 <iframe> 포맷에 SVG 이미지가 삽입된다면 확장 가능하지 않으므로, 확장할 수 있는 벡터 그래픽이라는 이름의 목적을 무색하게 한다.

## 4. Embed

<embed> 요소는 외부 응용 프로그램, 대화형 콘텐츠를 통합할 때 사용함

SVG를 사용할 수 있겠으나, 사용하지 않는 편이 낫다.

```html
<embed type="images/svg+xml" src="example.svg"/>
```

이 방법 역시 제한적임

MDN 피셜, 대부분의 모던 브라우저들은 브라우저 플러그인에 대한 지원을 중단하거나 삭제해왔다.

즉, 사이트가 일반 사용자의 브라우저에서 작동되길 바란다면, <embed>에 기대는 것은 일반적으로 권장되지 않는다.

## 5. Object

HTML <object> 요소를 이용해 웹페이지에 SVG 이미지를 추가할 수 있음

HTML 문서 내에 직접 inline으로 삽입하지 않고 SVG를 조작하는 경우에 가장 좋은 방법이다.

```html
<object data="example.svg" width="300" height="300"/>
```

사용하려고 하는 대상인 리소스의 URL을 data라는 속성으로 이용해 지정하는데, 이것이 SVG 이미지가 됨

SVG 이미지를 크기를 지정하기 위해 width와 height를 사용할 수 있다.

### <img>태그보다 <object> 태그를 활용하는 것이 더 적절한 이유

1. CSS 스타일링 및 커스터마이징의 유연성
    - `<img>` 태그
        - SVG를 일반 이미지 파일처럼 취급함. 따라서 외부 CSS를 이용해 SVG  내부의 특정 요소를 변경하는 거싱 불가능함. 오직 크기 조절 정도만 가능하다
    - `<object>` 태그
        - SVG 파일을 별도의 문서로 로드하지만, 브라우저가 그 내부 구조를 인식할 수 있게 한다.
            
            SVG 파일 내부에 스타일 시트를 포함하거나 외부 스타일 시트를 참조하면, 상황에 따라 아이콘의 색상을 바꾸는 등 세밀한 제어가 가능해짐
            
2. 애니메이션 및 상호작용 기능 지원
    - `<img>` 태그
        - SVG 내부에 포함된 스크립트나 복잡한 CSS 애니메이션이 제대로 작동하지 않는 경우가 많음
        
        <aside>
        💡
        
        `<img>` 태그는 SVG 파일을 완성된 하나의 이미지(이미지 래스터화)로 취급한다. 브라우저는 보안 상의 이유로 외부에서 불러온 이미지 내부의 코드(XML 구조)에 접근하는 것을 차단한다.
        
        브라우저는 보안상의 이유로 외부에서 불러온 이미지 내부의 코드(XML 구조)에 접근하는 것을 차단한다.
        
        따라서, CSS의 fill 속성을 활용해도 브라우저에서 동작하지 않을 수 있다.
        
        </aside>
        
    - `<object>` 태그
        - SVG 내부에 포함된 인터랙티브 요소나 애니메이션을 온전히 지원함. 따라서 움직이는 그래프나 마우스 오버 시 변화하는 정교한 아이콘 등을 구현할 때 필수적임
        
        <aside>
        💡
        
        다만, `<object>` 를 사용하면 SVG 파일 내부에 스타일이 정의되어 있거나 특수한 처리가 필요함
        
        </aside>
        

## 6. Inline

`<svg></svg>` 태그로 직접한 HTML 문서에 삽입해 작성할 수도 있다.

```html
<body>
    <svg
      id="be452e83-5912-4855-80f8-a79ecab91838"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width="915.11162"
      height="600.53015"
      viewBox="0 0 915.11162 600.53015"
    >
</body>
```

HTML 문서 내 인라인 SVG를 사용하면 HTTP 요청에 따라 제공되므로 로드되는 시간이 절약된다. 해당 방법을 상요하면 <img> 태그나 background-image를 사용하는 것보다 더 다양하게 커스터마이징 할 수 있다.

하지만, SVG 코드를 인라인으로 삽입하면 HTTP 요청은 저장되지만, 이미지는 브라우저에 캐시되지 않는다. 조작이 가장 쉬운 방법이지만, 인라인 SVG 코드를 유지하는 것은 어려울 수 있음

# SVG 스타일 변경 방법

SVG 스타일 변경 방법은 2가지로 SVG 코드 내부에서 변경하는 방법(inline style)과 외부 스타일 시트 (external style)로 변경하는 방법이 있음

인라인 스타일에서 `<style>` 태그와 `<!CDATA […]]>` 태그로 스타일을 묶는다.

간혹 XML 파서가 특정 문자 (ex: `>`)와 충돌할 수 있기 때문에 이 방법을 사용하는 것이 가장 좋다.

인라인 스타일에서는 대부분 모든 것이 구현 가능하다

<img> 및 background-image)는 CSS3 애니메이션을 지원하지 않는다. 또한 background-image는 인라인 미디어 쿼리를 지원하지 않는다.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 65">
  <style type="text/css">
    <![CDATA[
    .firstb { fill: yellow; }
    .secondb { fill: red; }
    ]]>
  </style>
  <path class="secondb" d="M42 27v-20c0-3.7-3.3-7-7-7s-7 3.3-7 7v21l12 15-7 15.7c14.5 13.9 35 2.8 35-13.7 0-13.3-13.4-21.8-26-18zm6 25c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
  <path class="firstb" d="M14 27v-20c0-3.7-3.3-7-7-7s-7 3.3-7 7v41c0 8.2 9.2 17 20 17s20-9.2 20-20c0-13.3-13.4-21.8-26-18zm6 25c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
</svg>
```

이런식으로 인라인 스타일링을 할 수 있다.

# SVG 기본 도형 그리기

## 사각형 (rectangle)

<rect> 요소는 사각형을 그린다.

너비 (width), 높이 (height), 색상 (fill) 등을 속성으로 설정할 수 있다.

```html
<svg>
    <rect width="480" height="240" fill="#3d87fb" />
</svg>
```

## 원(circle)

`<circle>` 요소는 원인을 그린다.

원의 중심 (cx, cy), 반지름 (r), 색상 (fill) 등을 속성으로 설정할 수 있다.

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="10" r="5" />
</svg>
```

## 타원 (Ellipse)

`<ellipse>` 요소는 타원을 그린다.

원의 중심 (cx, cy),

타원을 위한 반지름 속성 (rx, ry)

색상 (fill)

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="10" cy="20" rx="100" ry="50" />
</svg>
```

## 직선 (line)

`<line>` 요소는 직선을 그린다.

선의 시작점 `(x1, y1)` 과 끝점 `(x2, y2)` 속성을 설정할 수 있다.

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

  <!-- 색상을 지정하지 않으면
       선이 보이지 않습니다. -->
</svg>
```

## 다각형 (Polygon)

<polygon) 요소는 3개 이상의 점들이 연결된 다각형을 그린다.

points는 다각형의 꼭짓점 속성이다

points x1,y1 x2,y2 x3,y3

1번째 점 → 2번째 점 → 3번째 점 → … → n번째 점 → 1번째 점

순으로 직선을 이어 닫힌 도형을 만든다.

```html
<svg>
  <polygon 
    points="50,5 100,5 125,30 125,80 100,105 50,105 25,80 25,30" 
    fill="#4b6eec" />
</svg>
```

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Example of a polygon with the default fill -->
  <polygon points="0,100 50,25 50,75 100,0" />

  <!-- Example of the same polygon shape with stroke and no fill -->
  <polygon points="100,100 150,25 150,75 200,0" fill="none" stroke="black" />
</svg>
```

## Polyline (열린 선)

polygon은 points에 나열된 점들을 순서대로 직선으로 잇고 마지막 점 → 첫번째 점을 잇고 도형을 닫는다.

하지만 Polyline은 마지막 점 → 첫번째 점을 잇지 않고 도형을 열린 상태로 유지한다.

points 속성은 각 점에 해당하는 좌표값들이다.

```html
<svg width="200" height="200">
  <polyline 
    points="50,50 150,50 150,150 50,150" 
    stroke="black" 
    fill="none" 
    stroke-width="5" />
</svg>
```

polygon과 polyline의 차이점은 아래에서 확인할 수 있다.

polyline은 도형을 닫지 않지만, polygon은 도형을 닫는 것을 볼 수 있다.

[https://codepen.io/lee0jae330/pen/RNRMQdJ](https://codepen.io/lee0jae330/pen/RNRMQdJ)

<aside>
💡

Polyline은 꺽은 선 그래프들을 구현할 때 활용할 수 있다. 이때 아래의 속성을 활용하면 선의 끝 모양, 꺾이는 부분을 부드럽게 처리하고 싶을 때

- **`stroke-linecap="round"`:** 선의 시작과 끝을 둥글게 만든다.
- **`stroke-linejoin="round"`:** 선이 꺾이는 모서리를 부드럽게 굴린다.
</aside>

# 참고 자료

https://all-done.tistory.com/42

https://ko.wikipedia.org/wiki/%EB%B2%A1%ED%84%B0_%EA%B7%B8%EB%9E%98%ED%94%BD%EC%8A%A4

https://www.adobe.com/kr/creativecloud/file-types/image/raster.html

[https://www.adobe.com/kr/creativecloud/file-types/image/comparison/jpeg-vs-png.html](https://www.adobe.com/kr/creativecloud/file-types/image/comparison/jpeg-vs-png.html)

https://www.adobe.com/kr/creativecloud/file-types/image/vector.html

https://m.blog.naver.com/reductionist101/221567932033

https://developer.mozilla.org/ko/docs/Web/SVG/Reference/Element