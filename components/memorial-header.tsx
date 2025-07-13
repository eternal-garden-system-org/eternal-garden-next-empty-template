import { format, differenceInYears } from "date-fns";
import { ru } from "date-fns/locale";
import { MapPin } from "lucide-react";
import { MemorialPhoto } from "@/components/memorial-photo";
import { cn } from "@/lib/utils";

interface MemorialHeaderProps {
  fullName: string;
  birthDate: string;
  deathDate: string;
  birthPlace: string;
  deathPlace: string;
  photoUrl: string;
  className?: string;
}

export function MemorialHeader({
  fullName,
  birthDate,
  deathDate,
  birthPlace,
  deathPlace,
  photoUrl,
  className,
}: MemorialHeaderProps) {
  const birthDay = new Date(birthDate);
  const deathDay = new Date(deathDate);

  const birthDayMonth = format(birthDay, "d MMMM", { locale: ru });
  const deathDayMonth = format(deathDay, "d MMMM", { locale: ru });
  const birthYear = format(birthDay, "yyyy");
  const deathYear = format(deathDay, "yyyy");

  const age = differenceInYears(deathDay, birthDay);

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center space-y-8",
        "py-16",
        className,
      )}
    >
      <MemorialPhoto src={photoUrl} alt={`Фото ${fullName}`} />

      <div className="space-y-2 w-full">
        <h1 className="font-semibold" style={{ fontSize: "48px" }}>
          {fullName}
        </h1>

        <div className="flex justify-center items-baseline">
          <div className="inline-flex items-baseline">
            <span style={{ fontSize: "20px" }}>{birthDayMonth} </span>
            <span style={{ fontSize: "36px", marginLeft: "4px" }}>
              {birthYear}
            </span>
          </div>

          <span className="mx-4" style={{ fontSize: "36px" }}>
            —
          </span>

          <div className="inline-flex items-baseline">
            <span style={{ fontSize: "20px" }}>{deathDayMonth} </span>
            <span style={{ fontSize: "36px", marginLeft: "4px" }}>
              {deathYear}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-lg">{age} лет жизни</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full mx-auto">
        <div
          className={cn(
            "flex flex-col flex-1 items-center",
            "rounded-lg p-4 backdrop-blur-sm",
            "border border-[#92C0C233]",
            "space-y-1",
          )}
        >
          <div className="text-base flex items-center text-muted-foreground w-full">
            <MapPin
              size={12}
              className="text-muted-foreground mr-2 flex-shrink-0"
            />
            Место рождения
          </div>
          <div className="text-2xl font-medium w-full text-left">
            {birthPlace}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col flex-1 items-center",
            "rounded-lg p-4 backdrop-blur-sm",
            "border border-[#92C0C233]",
            "space-y-1",
          )}
        >
          <div className="text-base flex items-center text-muted-foreground w-full">
            <MapPin
              size={12}
              className="text-muted-foreground mr-2 flex-shrink-0"
            />
            Место смерти
          </div>
          <div className="text-2xl font-medium w-full text-left">
            {deathPlace}
          </div>
        </div>
      </div>
    </div>
  );
}
