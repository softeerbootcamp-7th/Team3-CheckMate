export const validateZipcode = (zipcode: string) => {
  if (!zipcode) {
    return '내 동네 설정을 위해 주소를 입력해주세요';
  }
  return true;
};
export const validateAddress = (address: string) => {
  if (!address) {
    return '내 동네 설정을 위해 주소를 입력해주세요';
  }
  return true;
};
