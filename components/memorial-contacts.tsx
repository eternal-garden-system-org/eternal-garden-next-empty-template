import { Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemorialContactsProps {
  className?: string;
}

// Данные для контактов
const contactsData = [
  {
    id: "1",
    name: "Ольга Сергеевна",
    relation: "Жена",
    phone: "+375 (29) 123-45-67",
    email: "olga.karpuk@mail.by",
  },
  {
    id: "2",
    name: "Полина",
    relation: "Дочь",
    phone: "+375 (29) 123-45-67",
  },
];

export function MemorialContacts({ className }: MemorialContactsProps) {
  return (
    <div className={cn("w-full py-16", className)}>
      <h2 className="text-4xl font-medium mb-10">Контакты родственников</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contactsData.map((contact) => (
          <div
            key={contact.id}
            className="min-w-[375px] rounded-lg p-10 shadow-md bg-[#021010]"
            style={{ maxWidth: "450px" }}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-medium text-foreground">
                  {contact.name}
                </h3>
                <p className="text-muted-foreground">{contact.relation}</p>
              </div>

              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="size-5 text-muted-foreground" />
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>

                {contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-muted-foreground" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
