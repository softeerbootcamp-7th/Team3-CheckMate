export const validateBusinessRegistrationNumber = (value: string) => {
  if (!value) {
    return '사업자등록번호를 입력해주세요.';
  }
  if (!/^[0-9]{10}$/.test(value)) {
    return '사업자등록번호는 숫자 10자리로 입력해주세요.';
  }
  return true;
};
