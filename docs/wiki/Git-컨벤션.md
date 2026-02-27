[1. Git 브랜치 전략](#1-git-브랜치-전략)

[2. 커밋 컨벤션](#2-커밋-컨벤션)

[3. PR 및 Issue 템플릿](#3-pull-request-및-issue-template)

# 1. Git 브랜치 전략

- Git flow 활용
<img width="700" alt="image" src="https://github.com/user-attachments/assets/2a56b51f-ee9a-4957-b895-d7fda232607f" />

- 사용하는 브랜치 목록
  - main
  - develop (default branch)
  - feature
  - refactor
  - hotfix
  - release

- 브랜치 네이밍 규칙
  - `[브랜치명]/#[이슈번호]-[fe/be]-[작업이름]`

<details>
<summary>Git 브랜치 전략 예시</summary>

1. 프로젝트 초기 설정 (Main - Develop)
```bash
$ git checkout -b develop main
$ git push -u origin develop
```

2. 새로운 기능 개발 (Feature)
```bash
# 새로운 기능(로그인 기능) 개발 시작
$ git checkout -b feature/#이슈번호 develop

# 작업 후 커밋
$ git add .
$ git commit -m "feat: login UI implementation"

# 기능 완료 후 develop으로 병합
$ git checkout develop
$ git merge --no-ff feature/#이슈번호
$ git branch -d feature/login
$ git push origin develop
```

3. 배포 준비 (Release)

```bash
# 버전 1.0.0 출시를 위한 준비
$ git checkout -b release/1.0.0 develop

# 버그 수정 및 문서 작업 (배포 전 최종 점검)
$ git commit -m "fix: minor bug in login validation"

# 배포 확정: main으로 병합 및 태그 생성
$ git checkout main
$ git merge --no-ff release/1.0.0
$ git tag -a v1.0.0 -m "Release version 1.0.0"

# develop 브랜치에도 변경사항 반영
$ git checkout develop
$ git merge --no-ff release/1.0.0

# 릴리즈 브랜치 삭제
$ git branch -d release/1.0.0
$ git push origin --tags
```

4. 긴급 수정 (Hotfix)

```bash
# 운영 중인 서비스(main)에서 긴급 버그 발견
$ git checkout -b hotfix/login-error main

# 문제 수정 후 커밋
$ git commit -m "fix: critical login error"

# main과 develop에 각각 병합
$ git checkout main
$ git merge --no-ff hotfix/login-error
$ git tag -a v1.0.1 -m "Hotfix version 1.0.1"

$ git checkout develop
$ git merge --no-ff hotfix/login-error

$ git branch -d hotfix/login-error
$ git push origin --tags
```
</details>

# 2. 커밋 컨벤션

**커밋 메세지 양식**
  - 형식: <태그>: <메시지>

**커밋 메세지 태그 종류 및 의미**

| **태그** | **의미** |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 (README, 주석 등) |
| style | 코드 의미에 영향을 주지 않는 수정 (세미콜론, 포맷팅 등) |
| refactor | 코드 리팩토링 (기능 변경 없이 가독성/구조 개선) |
| test | 테스트 코드 추가 및 수정 |
| chore | 파일명 수정, 폴더 이동 등 기타 작업 |
| build | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| ci | CI 설정 파일 수정 / 스크립트 수정 (GitHub Actions, Jenkins 등) |

# 3. Pull Request 및 Issue Template

**Pull Request 양식**

<details>
<summary>PR 양식</summary>

```markdown
## #️⃣ 변경 사항

> 이 PR에서 변경된 내용을 간결하게 설명해주세요.

## #️⃣ 관련 이슈

> 관련된 이슈가 있다면 여기에 링크해주세요.

- Closes #
- Related to #

## #️⃣ 작업 상세 내용

> 이 PR에서 수행한 작업을 상세히 설명해주세요.

-

## 📸 스크린샷 (선택)

> UI 변경이 있는 경우, 변경 전/후 스크린샷을 첨부해주세요.

### 변경 전

<!-- 스크린샷을 여기에 첨부 -->

### 변경 후

<!-- 스크린샷을 여기에 첨부 -->

## 📎 참고할만한 자료 (선택)

> 리뷰어가 참고하면 좋을 자료가 있다면 여기에 첨부해주세요.

```
</details>


**Issue 양식**

<details>
<summary>기능 추가</summary>

```markdown
---
name: 기능 구현
title: ''
labels: feat
assignees: ''

---

## 기능 설명 📖

- 기능에 대한 명확하고 간결한 기능을 설명.

<br />

## 작업 상세 내용 📌

- [ ] 태스크
- [ ] 태스크
- [ ] 태스크
- [ ] 태스크

<br />

## 📎 참고할만한 자료 (선택)

- 관련 문서, 스크린샷, 또는 예시 등이 있다면 여기에 첨부.
```

</details>

<details>
<summary>리팩토링</summary>

```markdown
---
name: 리팩터링
title: ''
labels: refactor
assignees: ''

---

##  현황 🔍

- 리팩토링 대상 코드의 현재 상태와 문제점을 구체적으로 작성.

<br />

##  개선 방안 💡

- 문제를 어떻게 해결할 것인지 기술적인 접근 방법을 서술.

<br />

## 작업 상세 내용 📌

- [ ] 태스크
- [ ] 태스크
- [ ] 태스크
```
</details>

<details>
<summary>버그 픽스</summary>

```markdown
---
name: 버그 리포트
title: ''
labels: fix
assignees: ''

---

## 버그 설명 🐞

- 어떤 문제가 발생했는지 간단히 설명.
- Given-When-Then 형식으로 발생 상황을 서술.

<br/>

## 기대 동작 ✅

- 예상했던 정상적인 결과가 어떤 것이었는지 설명.

<br />

## 실제 동작 ❌

- 실제로 어떤 결과가 발생했는지 설명.

<br />


## 작업 상세 내용 📌

- [ ] 태스크
- [ ] 태스크
- [ ] 태스크
```
</details>