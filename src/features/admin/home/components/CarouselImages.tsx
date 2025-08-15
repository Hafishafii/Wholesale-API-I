
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

type Props = {
  images: string[];
};
export default function CarouselImages({ images }: Props) {
  return (
    <Carousel className="w-full max-w-xs sm:mx-[40px]">
      <CarouselContent>
        {images?.map((img, index) => (
          <CarouselItem key={index}>
            <a href={img} target="_blank" className="p-1">
              <img
                src={img}
                alt={`Image ${index}`}
                className="aspect-square object-contain bg-gray-100 rounded"
              />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
