export const TermsPage = () => {
  return (
    <div className="flex flex-col items-center gap-5 p-10">
      <header className="flex w-full justify-center border-b-2 pb-5">
        <h1 className="title-medium-semibold text-grey-900">
          서비스 이용약관 (Terms of Service)
        </h1>
      </header>
      <main className="border-grey-400 flex flex-col gap-5 border-b pb-5">
        <section>
          <h2 className="title-small-semibold text-grey-900">제1조 (목적)</h2>
          <p className="body-medium-medium text-grey-700">
            본 약관은 "Checkmate"(이하 "서비스"라 함)를 제공하는 최고삼(이하
            "운영자"라 함)과 서비스를 이용하는 회원(이하 "이용자"라 함) 간의
            권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제2조 (용어의 정의)
          </h2>
          <ul className="body-medium-medium text-grey-700 list-disc pl-5">
            <li>
              <strong className="text-grey-900">"서비스"</strong>란 이용자가
              매장 데이터를 분석하고 운영 전략을 수립할 수 있도록 제공하는 웹/앱
              서비스를 의미합니다.
            </li>
            <li>
              <strong className="text-grey-900">"이용자"</strong>란 본 약관에
              따라 서비스에 접속하여 서비스를 이용하는 모든 고객을 의미합니다.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제3조 (약관의 효력 및 변경)
          </h2>
          <p className="body-medium-medium text-grey-700">
            본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
            공지함으로써 효력이 발생합니다. 운영자는 필요한 경우 관련 법령을
            위배하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제4조 (서비스의 제공 및 변경)
          </h2>
          <p className="body-medium-medium text-grey-700">
            Checkmate는 다음과 같은 서비스를 제공합니다.
          </p>
          <ul className="body-small-medium text-grey-700 list-disc pl-5">
            <li>커스텀 실시간 매장 지표 대시보드</li>
            <li>성과 판단 기준을 돕는 일간/월간 리포트</li>
            <li>매장 데이터 해석을 돕는 AI chat MATE</li>
          </ul>
          <p className="body-medium-medium text-grey-700">
            운영자는 기술적 사양의 변경이나 서비스 운영 정책에 따라 서비스의
            내용을 변경할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="title-small-semibold text-grey-900">
            제5조 (이용자의 의무)
          </h2>
          <p className="body-medium-medium text-grey-700">
            이용자는 서비스를 이용할 때 다음 각 호의 행위를 하여서는 안 됩니다.
          </p>
          <ul className="body-small-medium text-grey-700 list-disc pl-5">
            <li>타인의 정보 도용</li>
            <li>운영자가 게시한 정보의 변경</li>
            <li>서비스의 정상적인 운영을 방해하는 행위</li>
            <li>기타 불법적이거나 부당한 행위</li>
          </ul>
        </section>

        <section>
          <h2 className="title-small-semibold text-grey-900">
            제6조 (책임의 제한)
          </h2>
          <p className="body-medium-medium text-grey-700">
            운영자는 천재지변, 서비스 점검, 통신 장애 등 불가항력적인 사유로
            서비스를 제공할 수 없는 경우 책임이 면제됩니다.
          </p>
          <p className="body-medium-medium text-grey-700">
            서비스에서 제공하는 분석 데이터 및 AI의 제안은 참고용이며, 최종적인
            사업적 판단에 따른 책임은 이용자에게 있습니다.
          </p>
        </section>
      </main>
      <footer className="body-small-medium text-grey-500">
        <p>서비스명: Checkmate | 운영자: 최고삼</p>
      </footer>
    </div>
  );
};
