"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { linkCategories } from "@/data/link-collection"
import { List, MoreHorizontal, Users } from "lucide-react"

const iconMap: Record<string, JSX.Element> = {
  favorites: <span className="text-lg">♡</span>,
  hr: <Users className="h-4 w-4" />,
  others: <MoreHorizontal className="h-4 w-4" />,
  todo: <List className="h-4 w-4" />,
}

export function LinkCollectionSection() {
  return (
    <Accordion type="multiple" defaultValue={["favorites", "todo"]} className="w-full space-y-4">
      {linkCategories.map((category) => (
        <AccordionItem key={category.id} value={category.id} className="border border-slate-200 rounded-lg bg-white px-4">
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-2 text-slate-700">
              {iconMap[category.id]}
              <span className="font-medium">{category.label}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className={category.items.length ? "pb-4 space-y-2" : undefined}>
            {category.items.length ? (
              category.items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  {item.label}
                </div>
              ))
            ) : (
              <div className="p-2 text-sm text-slate-500">コンテンツなし</div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
