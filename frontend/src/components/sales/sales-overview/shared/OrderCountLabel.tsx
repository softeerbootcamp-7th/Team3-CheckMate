interface OrderCountLabelProps {
  orderCount: number;
}
export const OrderCountLabel = ({ orderCount }: OrderCountLabelProps) => {
  return (
    <p className="rounded-unlimit caption-large-bold border-grey-600 text-grey-600 border px-2.5 py-100">
      {orderCount}건
    </p>
  );
};
