export const settingKeys = {
  all: ['setting'] as const,
  myStoreInfo: () => [...settingKeys.all, 'myStoreInfo'] as const,
};
