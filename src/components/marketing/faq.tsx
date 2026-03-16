"use client";

import { useState } from "react";
import { Plus, Minus, Info, Calendar, Settings, Flag, User, Home } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

const icons = [Info, Calendar, Settings, Flag, User, Home];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const midpoint = Math.ceil(FAQ_ITEMS.length / 2);
  const leftColumn = FAQ_ITEMS.slice(0, midpoint);
  const rightColumn = FAQ_ITEMS.slice(midpoint);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold text-synext-navy sm:text-5xl">
          On{" "}
          <span className="italic text-synext-blue">r&eacute;pond</span>{" "}
          &agrave; vos questions
        </h2>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row">
          {[leftColumn, rightColumn].map((column, colIdx) => (
            <div key={colIdx} className="flex flex-1 flex-col gap-5">
              {column.map((item, idx) => {
                const globalIdx = colIdx * midpoint + idx;
                const isOpen = openIndex === globalIdx;
                const Icon = icons[globalIdx % icons.length];

                return (
                  <button
                    key={globalIdx}
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : globalIdx)
                    }
                    className={`w-full rounded-2xl px-8 py-6 text-left transition-colors ${
                      isOpen ? "bg-synext-light" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-full bg-white p-1.5">
                          <Icon className="size-5 text-synext-navy" />
                        </div>
                        <span className="text-sm font-semibold text-synext-navy sm:text-base">
                          {item.question}
                        </span>
                      </div>
                      <div
                        className={`flex items-center rounded-lg p-1 ${
                          isOpen ? "bg-muted" : "bg-synext-light"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="size-5" />
                        ) : (
                          <Plus className="size-5" />
                        )}
                      </div>
                    </div>
                    {isOpen && (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
