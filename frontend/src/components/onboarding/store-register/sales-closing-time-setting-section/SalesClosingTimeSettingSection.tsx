import { SalesClosingTimeSelect } from '../sales-closing-time-select';
import { StoreRegisterFormTitle } from '../store-register-form-title';
import { StoreRegisterStepButtonGroup } from '../store-register-step-button-group';

export const SalesClosingTimeSettingSection = () => {
  return (
    <>
      <StoreRegisterFormTitle
        title={`자정 이후에도 운영하는 매장은\n매출 마감 시간 설정이 필요해요`}
      />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="body-large-semibold text-grey-900">매출 마감 시간</h2>
          <div className="flex items-center justify-between">
            <p className="whitespace-pre-wrap">{`실제 매장 마감 시간보다 2~3시간\n이후로 입력해주세요`}</p>
            <SalesClosingTimeSelect />
          </div>
          <p className="body-medium-medium text-grey-600">
            이 시간을 기준으로 24시간 단위로 하루 매출이 집계돼요.
          </p>
        </div>
        <StoreRegisterStepButtonGroup />
      </div>
    </>
  );
};
