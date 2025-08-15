import { FaSpinner } from "react-icons/fa";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <FaSpinner 
        className={`animate-spin text-blue-500 ${sizeClasses[size]}`} 
      />
    </div>
  );
};

export default LoadingSpinner; 