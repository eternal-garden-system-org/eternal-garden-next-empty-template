"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface MemorialQuotesProps {
  className?: string;
}

const quotes = [
  {
    text: "Ты по жизни нас вел, ты себя не жалел, ты так рано ушел, ты так много успел. И не верит никто, что тебя рядом нет, что ушел в небытье. Сын, муж, дед, отец — ЧЕЛОВЕК!",
  },
  {
    text: "Отец не просто дал мне жизнь — он показал, как наполнить её смыслом. Его мудрые советы и личный пример научили меня тому, что ценность жизни определяется не количеством прожитых лет, а тем, сколько добра ты успел сделать за это время.",
  },
  {
    text: "Дедушка всегда говорил мне: 'София, мечтай смело, как будто неудачи не существует.' Благодаря ему я поверила в свои силы. Даже сейчас, когда его нет рядом, я слышу его голос, поддерживающий меня в трудную минуту.",
  },
  {
    text: "FIRST_NAME MIDDLE_NAME был не просто коллегой, а наставником для всех нас. Его профессионализм, честность и умение найти подход к каждому сотруднику сделали нашу компанию одной семьей. Его наследие живет в каждом здании, которое мы создали вместе.",
  },
];

export function MemorialQuotes({ className }: MemorialQuotesProps) {
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

  return (
    <div className={cn("w-full py-16", className)}>
      <Carousel
        opts={{
          align: "center",
          loop: true,
          skipSnaps: false,
        }}
        setApi={setApi}
        className="w-full mx-auto"
      >
        <CarouselContent>
          {quotes.map((quote, index) => (
            <CarouselItem key={index} className="basis-full max-w-6xl">
              <div
                className={cn(
                  "p-6 md:p-8 backdrop-blur-sm border border-[#92C0C233] rounded-lg shadow-lg mx-4 h-full transition-all duration-500",
                  index === current ? "opacity-100" : "opacity-0",
                )}
              >
                <blockquote>
                  <div className="flex justify-center mb-6">
                    <Quote className="text-primary/20 h-12 w-12 rotate-180" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg text-foreground text-center">
                      {quote.text}
                    </p>
                  </div>
                </blockquote>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center justify-center gap-8">
            <CarouselPrevious className="relative left-0 m-0 size-10 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90" />

            <div className="flex gap-4">
              {Array.from({ length: count }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => api?.scrollTo(index)}
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

            <CarouselNext className="relative right-0 m-0 size-10 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
