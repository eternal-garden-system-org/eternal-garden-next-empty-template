"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MemorialPhotosProps {
  className?: string;
}

// Данные для фотографий
const photosData = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=3267&auto=format&fit=crop",
    alt: "FIRST_NAME на отдыхе в горах",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3270&auto=format&fit=crop",
    alt: "Портрет FIRST_NAME",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?q=80&w=3276&auto=format&fit=crop",
    alt: "FIRST_NAME с сыном",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3276&auto=format&fit=crop",
    alt: "FIRST_NAME с внучкой",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=3270&auto=format&fit=crop",
    alt: "Семейный праздник",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?q=80&w=3349&auto=format&fit=crop",
    alt: "Рабочий момент",
  },
];

export function MemorialPhotos({ className }: MemorialPhotosProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Разбиваем фотографии на группы по 3
  const photoGroups = [];
  for (let i = 0; i < photosData.length; i += 3) {
    photoGroups.push(photosData.slice(i, i + 3));
  }

  // Функции для навигации
  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();
  const scrollTo = (index: number) => api?.scrollTo(index);

  return (
    <div className={cn("w-full py-16", className)}>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-medium">Фотографии</h2>

        {/* Кастомные кнопки управления */}
        <div className="flex items-center gap-4">
          <Button
            onClick={scrollPrev}
            variant="outline"
            size="icon"
            className="m-0 size-10 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!api}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Предыдущие фото</span>
          </Button>

          <div className="flex items-center gap-4">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "size-4 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300",
                  "border border-transparent",
                  index === current && "border-primary",
                )}
              >
                <div
                  className={cn(
                    "size-2 rounded-full transition-all",
                    index === current
                      ? "bg-primary"
                      : "bg-primary/40 hover:bg-primary/60",
                  )}
                />
              </div>
            ))}
          </div>

          <Button
            onClick={scrollNext}
            variant="outline"
            size="icon"
            className="m-0 size-10 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!api}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Следующие фото</span>
          </Button>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full mx-auto"
      >
        <CarouselContent>
          {photoGroups.map((group, groupIndex) => (
            <CarouselItem key={groupIndex} className="basis-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {group.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-[4/3] relative rounded-lg overflow-hidden border border-[#92C0C233] shadow-md"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
