export const PrivacyPage = () => {
  return (
    <div className="flex flex-col items-center gap-5 p-10">
      <header className="flex w-full justify-center border-b-2 pb-5">
        <h1 className="title-medium-semibold text-grey-900">
          개인정보 처리방침 (Privacy Policy)
        </h1>
      </header>

      <main className="border-grey-400 flex flex-col gap-5 border-b pb-5">
        <p className="body-medium-medium text-grey-700">
          최고삼(이하 "운영자"라 함)은 개인정보 보호법에 따라 이용자의
          개인정보를 보호하고 관련 고충을 신속하게 처리할 수 있도록 다음과 같은
          처리방침을 수립합니다.
        </p>

        <section>
          <h2 className="title-small-semibold text-grey-900">
            제1조 (수집하는 개인정보 항목 및 수집방법)
          </h2>
          <h3 className="body-large-semibold text-grey-900">
            1. 수집 항목 (필수)
          </h3>
          <ul className="body-medium-medium text-grey-700 list-disc pl-5">
            <li>
              <strong>구글 로그인 및 연동 시:</strong> 이름(닉네임), 이메일
              주소, 프로필 이미지 URL
            </li>
            <li>
              <strong>Google API 권한 (Gmail API):</strong>{' '}
              <a
                href="https://www.googleapis.com/auth/gmail.send"
                target="_blank"
                className="text-brand-main"
              >
                이메일 발송 권한 (gmail.send)
              </a>
            </li>
            <li>
              <strong>서비스 이용 과정:</strong> 매장 판매 데이터(매출, 메뉴
              정보 등), 접속 로그, 쿠키
            </li>
          </ul>
          <h3 className="body-large-semibold text-grey-900">2. 수집 방법</h3>
          <p className="body-medium-medium text-grey-700">
            구글 OAuth2 인증을 통한 수집 및 서비스 내 이용자 입력/데이터 연동
          </p>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제2조 (개인정보의 수집 및 이용목적)
          </h2>
          <ul className="body-medium-medium text-grey-700 list-disc pl-5">
            <li>
              <strong>회원 관리:</strong> 서비스 이용에 따른 본인 확인, 개인
              식별, 불량 회원의 부정 이용 방지
            </li>
            <li>
              <strong>서비스 제공 및 기능 실행:</strong>
              <ul>
                <li>매장 데이터 분석 결과 제공 및 맞춤형 대시보드 생성</li>
                <li>
                  이용자의 요청에 따른 분석 리포트 및 알림 이메일 발송 (Gmail
                  API 활용)
                </li>
              </ul>
            </li>
            <li>
              <strong>서비스 개선:</strong> 이용 패턴 분석을 통한 신규 서비스
              개발 및 성능 최적화
            </li>
          </ul>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제3조 (Google 사용자 데이터의 제한적 사용)
          </h2>
          <p className="body-medium-medium text-grey-700">
            운영자는 Google API로부터 받은 정보를 다른 앱으로 전송하거나
            재판매하지 않으며,{' '}
            <span className="text-others-negative">
              Google API 서비스 사용자 데이터 정책(제한적 사용 요구사항 포함)을
              준수합니다.
            </span>
          </p>
          <p className="body-medium-medium text-grey-700">
            이메일 전송 권한은 오직 이용자가 설정한 리포트 발송 목적으로만
            사용되며, 그 외의 개인적인 이메일 열람이나 데이터 수집은 이루어지지
            않습니다.
          </p>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제4조 (개인정보의 보유 및 이용기간)
          </h2>
          <p className="body-medium-medium text-grey-700">
            이용자의 개인정보는 원칙적으로 회원 탈퇴 시까지 보유합니다. 단, 관련
            법령의 규정에 의하여 보존할 필요가 있는 경우 해당 법령에서 정한 기간
            동안 보관합니다.
          </p>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제5조 (개인정보의 파기절차 및 방법)
          </h2>
          <p className="body-medium-medium text-grey-700">
            회원이 탈퇴를 요청하거나 수집 목적이 달성된 경우, 해당 정보를 지체
            없이 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는
            기술적 방법을 사용하여 삭제합니다.
          </p>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제6조 (이용자의 권리 및 그 행사방법)
          </h2>
          <ul className="body-medium-medium text-grey-700 list-disc pl-5">
            <li>
              이용자는 언제든지 본인의 개인정보를 조회하거나 수정할 수 있으며,
              회원 탈퇴를 통해 개인정보 이용 동의를 철회할 수 있습니다.
            </li>
            <li>
              구글 계정 설정(보안 설정)을 통해 앱의 권한(Gmail 전송 권한 등)을
              언제든지 취소함으로써 개인정보 제공을 중단할 수 있습니다.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제7조 (개인정보 보호책임자 및 연락처)
          </h2>
          <p className="body-medium-medium text-grey-700">
            본 서비스의 개인정보 보호 책임자는 다음과 같습니다.
          </p>
          <ul className="body-medium-medium text-grey-700 list-disc pl-5">
            <li>
              <strong>성명:</strong> 정한울
            </li>
            <li>
              <strong>이메일:</strong>{' '}
              <a href="mailto:jho7535@naver.com" className="text-brand-main">
                jho7535@naver.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="title-small-semibold text-grey-900">
            제8조 (개인정보 처리방침의 변경)
          </h2>
          <p className="body-medium-medium text-grey-700">
            본 방침은 <strong className="text-grey-900">2026년 2월 10일</strong>
            부터 시행됩니다.
          </p>
        </section>
      </main>

      <footer className="body-small-medium text-grey-500">
        <p>Copyright © Checkmate. All rights reserved.</p>
      </footer>
    </div>
  );
};
