import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PROGRAMME_DAYS,
  type ProgrammeItem,
} from "@/lib/programme";

function TrackTable({
  title,
  items,
}: {
  title: string;
  items: ProgrammeItem[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-mono-ui text-xs tracking-[0.2em] uppercase text-accent mb-3">
        {title}
      </h3>
      <table className="w-full table-fixed text-sm border-collapse">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th scope="col" className="py-2 pr-4 font-medium w-28">
              Time
            </th>
            <th scope="col" className="py-2 font-medium">
              Event / Venue
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={`${item.time}-${item.event}`}
              className={`border-b border-border/60 last:border-b-0 ${
                item.highlight ? "bg-accent/10" : ""
              }`}
            >
              <td
                className={`py-2.5 pr-4 align-top text-muted-foreground tabular-nums ${
                  /^\d/.test(item.time) ? "whitespace-nowrap" : ""
                }`}
              >
                {item.time}
              </td>
              <td
                className={`py-2.5 align-top ${
                  item.highlight ? "font-semibold text-accent" : ""
                }`}
              >
                {item.event}
                {item.tag && (
                  <span className="ml-2 inline-block rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent align-middle">
                    {item.tag}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProgrammeSchedule() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["day-1"]}
      className="space-y-3"
    >
      {PROGRAMME_DAYS.map((day) => (
        <AccordionItem
          key={day.day}
          value={`day-${day.day}`}
          className="glass-card px-5 sm:px-6 rounded-xl border-white/10"
        >
          <AccordionTrigger className="text-base hover:no-underline hover:text-accent">
            <span>
              <span className="font-semibold">Day {day.day}</span>
              <span className="text-muted-foreground">
                {" "}
                · {day.weekday}, {day.date}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <TrackTable title="Students' Programme" items={day.students} />
              <TrackTable title="Mentors' Programme" items={day.mentors} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
