import { cn } from "@/lib/utils";

interface MemorialBioProps {
  className?: string;
}

export function MemorialBio({ className }: MemorialBioProps) {
  return (
    <div className={cn("w-full py-16", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-medium">Семья</h2>
          <p className="text-base text-muted-foreground">
            FIRST_NAME прожил счастливую жизнь с женой Ольгой Сергеевной. Вместе
            они воспитали двоих замечательных детей — Виктора и Елену. Виктор
            пошёл по стопам отца, став инженером, а Елена выбрала медицину и
            стала врачом. У FIRST_NAMEа было трое внуков, которых он обожал:
            Максим, Полина и София. Он всегда говорил, что внуки — это главный
            подарок жизни.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-medium">Кем он был</h2>
          <div className="text-base text-muted-foreground space-y-4">
            <p>
              По профессии FIRST_NAME был архитектором, и его работы до сих пор
              украшают Брест. Главная площадь города, несколько школ, жилые
              кварталы — всё это носит отпечаток его таланта. Он обожал своё
              дело и часто говорил: "Архитектор не просто строит дома, он
              создаёт места, где рождаются истории."
            </p>
            <p>
              Но его жизнь — это не только чертежи и проекты. FIRST_NAME любил
              проводить время с семьёй, играть в шахматы и читать исторические
              романы. Его особенной страстью был сад — во дворе всегда цвели
              розы, которые он ухаживал с особой любовью.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-medium">Каким он был</h2>
          <p className="text-base text-muted-foreground">
            Его знали как человека с добрым сердцем и невероятной щедростью. Он
            всегда находил время для друзей, был душой компании и мастером
            анекдотов.
          </p>
        </div>
      </div>
    </div>
  );
}
