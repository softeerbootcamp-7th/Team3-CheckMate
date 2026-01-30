interface FeatureCardProps {
  featureImagePath: string;
  description: string;
}

export const FeatureCard = ({
  featureImagePath,
  description,
}: FeatureCardProps) => {
  return (
    <div className="rounded-200 border-grey-300 bg-grey-50 flex flex-col items-center gap-200 border p-5">
      <img src={featureImagePath} alt={`${description} 이미지`} />
      <p className="body-medium-medium text-grey-600">{description}</p>
    </div>
  );
};
