import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon } from "lucide-react";

interface AlertMessageProps {
  type?: "success" | "error" | "info";
  title: string;
  description?: React.ReactNode;
  customIcon?: React.ReactNode;
}

const AlertMessage = ({
  type = "info",
  title,
  description,
  customIcon,
}: AlertMessageProps) => {
  if (!title) return;
  const iconMap = {
    success: <CheckCircle2Icon className="text-green-500" />,
    error: <AlertCircleIcon className="text-red-500" />,
    info: <InfoIcon className="text-blue-500" />,
  };

  const variant: "default" | "destructive" =
    type === "error" ? "destructive" : "default";

  return (
    <Alert variant={variant}>
      {customIcon ?? iconMap[type]}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default AlertMessage;
