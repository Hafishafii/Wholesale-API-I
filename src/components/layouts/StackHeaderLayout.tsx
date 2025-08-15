import StackHeader from "../Headers/StackHeader";

type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};
const StackHeaderLayout = ({ children, title = "", className }: Props) => {
  return (
    <div className={className}>
      <StackHeader title={title} />
      {children}
    </div>
  );
};

export default StackHeaderLayout;
