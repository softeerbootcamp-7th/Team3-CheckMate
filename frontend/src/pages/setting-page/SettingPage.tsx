import { MenuInfoCard } from '@/components/ingredient';

export const SettingPage = () => {
  return (
    <div>
      <MenuInfoCard menuId="1" menuName="딸기스무디" price={5800} />
      <MenuInfoCard menuId="2" menuName="레몬에이드" price={5600} />
    </div>
  );
};
