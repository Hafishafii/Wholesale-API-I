import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "../ui/button";
type Props = {
  title: string;
  description: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};
const RetryWarning = ({ description, title, onRetry, isRetrying }: Props) => {
  return (
    <div className="bg-white rounded-lg mx-auto p-5 flex justify-center items-center flex-col gap-2">
      <IoMdCloseCircle className="text-6xl text-red-500" />
      
      <p className="font-semibold text-lg">{title}</p>

      <p>{description}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-gray-200 text-black px-7 rounded hover:bg-gray-300"
        >
          {isRetrying ? "Retrying..." : "Retry"}
        </Button>
      )}
    </div>
  );
};

export default RetryWarning;
