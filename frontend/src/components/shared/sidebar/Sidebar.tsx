import { useLocation, useNavigate } from 'react-router-dom';

import { SIDEBAR_ITEMS } from '@/constants/shared';

export const Sidebar = () => {
  // 현재 브라우저의 URL 경로를 가져옴
  const { pathname } = useLocation();
  // 페이지 이동을 위한 네비게이션 함수
  const navigate = useNavigate();

  return (
    <div className="bg-gray-0 h-full w-75">
      <img
        src="/assets/logo.svg"
        alt="Logo"
        className="mx-auto mt-21 ml-[40px] h-16.5 w-41"
      />
      <div className="body-medium-medium mt-[47px] ml-[29px] flex w-[220px] flex-col gap-100">
        {SIDEBAR_ITEMS.map((menu) => {
          // 선택된 버튼인지를 현재 url 경로와 비교하여 판단
          const isActive = pathname.startsWith(menu.path);

          return (
            <div key={menu.id}>
              {/* 각 메뉴 선택 버튼(대시보드, 상세분석, 하루리포트, 환경설정)  */}
              <div
                onClick={() => navigate(menu.path)}
                className={`rounded-150 flex h-[40px] w-full cursor-pointer items-center gap-[6px] px-200 ${isActive ? 'text-brand-main body-medium-bold bg-brand-20' : 'text-gray-600'} `}
              >
                {menu.Icon && (
                  <menu.Icon
                    className={isActive ? 'text-brand-400' : 'text-gray-600'}
                  />
                )}
                <button className="mt-[2px]">{menu.name}</button>
              </div>
              {/* 상세분석은 하위 메뉴 버튼들이 있음. 해당 버튼들 출력해야함 */}
              {menu.subMenus && (
                <div className="flex flex-col">
                  {menu.subMenus.map((sub) => {
                    // 하위 메뉴는 경로가 정확히 일치해야 활성화 표시
                    // /analysis/sales, /analysis/menu 등
                    const isSubActive = pathname === sub.path;

                    return (
                      <div
                        key={sub.id}
                        onClick={() => navigate(sub.path)}
                        className={`flex h-[40px] w-full cursor-pointer items-center pl-[34px] ${
                          isSubActive
                            ? 'text-brand-main body-medium-bold'
                            : 'text-gray-400'
                        }`}
                      >
                        <span className="">{sub.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
