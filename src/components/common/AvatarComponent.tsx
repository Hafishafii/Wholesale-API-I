import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../../lib/utils";

type AvatarComponentProps = {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
};

const AvatarComponent = ({ src, alt, fallback, className }: AvatarComponentProps) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
