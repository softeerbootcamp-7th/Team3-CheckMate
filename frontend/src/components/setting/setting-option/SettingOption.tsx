import { Link } from 'react-router-dom';

import { ChevronRight } from 'lucide-react';

interface SettingOptionProps {
  optionName: string;
  linkTo: string;
  optionDescription?: string;
}

export const SettingOption = ({
  optionName,
  linkTo,
  optionDescription,
}: SettingOptionProps) => {
  return (
    <section className="flex w-125 flex-col gap-4">
      <span className="title-small-bold text-grey-900">{optionName}</span>
      <Link
        to={linkTo}
        className="rounded-400 bg-special-card-bg body-large-medium text-grey-700 flex w-full items-center justify-between p-500"
      >
        {optionDescription}
        <ChevronRight className="size-6" />
      </Link>
    </section>
  );
};
