"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemorialWordsProps {
  className?: string;
}

// Данные для слов близких
const wordsData = [
  {
    id: "1",
    text: "Мой папа, FIRST_NAME, был невероятным человеком. Он всегда умел находить радость в мелочах и делал каждый день особенным. Его смех наполнял дом теплом, а доброта и забота о других вдохновляли меня. Я помню, как он учил меня кататься на велосипеде, поддерживая меня даже в самые трудные моменты. Папа всегда говорил, что важно следовать своим мечтам, и я надеюсь, что смогу сделать его гордым.",
    author: {
      name: "Елена LAST_NAME",
      relation: "Дочь",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3276&auto=format&fit=crop",
    },
  },
  {
    id: "2",
    text: "FIRST_NAME был моим лучшим другом на протяжении 40 лет. Мы вместе учились в институте, вместе начинали свой путь в строительстве. Он был не просто коллегой — он был человеком, который никогда не подводил, всегда держал слово. Я помню, как в трудные 90-е он помог мне с работой, когда я остался без средств к существованию. Такая верность дружбе и человеческая порядочность редко встречаются в наше время.",
    author: {
      name: "Виктор Павлович",
      relation: "Друг",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3270&auto=format&fit=crop",
    },
  },
  {
    id: "3",
    text: "Наши 35 лет вместе пролетели как один день. Саша был не просто мужем, он был моей опорой, моим защитником, моим лучшим другом. Он мог заставить меня улыбаться даже в самые тяжелые дни. Каждое утро готовил мне кофе, даже когда спешил на работу. Его забота и любовь наполняли наш дом. Теперь, когда его нет рядом, я чувствую его присутствие в каждом уголке нашего дома, в каждом воспоминании, которое мы создали вместе.",
    author: {
      name: "Ольга Сергеевна",
      relation: "Жена",
      avatar:
        "https://images.unsplash.com/photo-1544222575-74d0d211d516?q=80&w=3282&auto=format&fit=crop",
    },
  },
  {
    id: "4",
    text: "Дедушка научил меня самому важному — никогда не сдаваться. Он часто брал меня с собой на стройку, показывал, как из обычных кирпичей вырастают дома, в которых потом живут люди. 'Максим, — говорил он, — важно не то, как быстро ты строишь, а насколько прочным будет результат'. Эти слова стали моим жизненным девизом. Я благодарен судьбе за то, что у меня был такой дедушка, который не просто любил, но и передал мне свою мудрость.",
    author: {
      name: "Максим LAST_NAME",
      relation: "Внук",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3387&auto=format&fit=crop",
    },
  },
];

export function MemorialWords({ className }: MemorialWordsProps) {
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

  // Разбиваем слова на группы по 2
  const wordsGroups = [];
  for (let i = 0; i < wordsData.length; i += 2) {
    wordsGroups.push(wordsData.slice(i, i + 2));
  }

  // Функции для навигации
  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();
  const scrollTo = (index: number) => api?.scrollTo(index);

  return (
    <div className={cn("w-full py-16", className)}>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-medium">Слова близких</h2>

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
            <span className="sr-only">Предыдущие слова</span>
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
            <span className="sr-only">Следующие слова</span>
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
          {wordsGroups.map((group, groupIndex) => (
            <CarouselItem key={groupIndex} className="basis-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.map((word) => (
                  <div
                    key={word.id}
                    className="backdrop-blur-sm border border-[#92C0C233] rounded-lg p-6 shadow-md flex flex-col h-full"
                  >
                    <p className="text-muted-foreground text-base leading-relaxed flex-grow mb-6">
                      {word.text}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <Avatar className="size-12 rounded-full overflow-hidden flex-shrink-0">
                        <AvatarImage
                          src={word.author.avatar}
                          alt={word.author.name}
                          className="object-cover w-full h-full"
                        />
                        <AvatarFallback>
                          {word.author.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium text-foreground">
                          {word.author.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {word.author.relation}
                        </p>
                      </div>
                    </div>
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
