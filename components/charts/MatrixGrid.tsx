"use client";

import { Fragment } from "react";
import { CATEGORICAL } from "./tokens";

export interface MatrixColumn {
  id: string;
  label: string;
  /** categorical color for this column's header band; defaults to fixed order */
  color?: string;
}

export interface MatrixCell {
  primary: string;
  secondary?: string;
}

export default function MatrixGrid({
  columns,
  rows,
}: {
  columns: MatrixColumn[];
  /** rows[rowIndex].cells is keyed by column id */
  rows: { label: string; cells: Record<string, MatrixCell> }[];
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div
        className="grid gap-3 min-w-[720px] md:min-w-0"
        style={{ gridTemplateColumns: `minmax(120px, 160px) repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        <div />
        {columns.map((col, i) => {
          const color = col.color ?? CATEGORICAL[i % CATEGORICAL.length];
          return (
            <div key={col.id} className="text-center pb-2">
              <div
                className="mx-auto mb-2 h-1.5 w-10 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="text-sm font-semibold text-foreground">{col.label}</div>
            </div>
          );
        })}

        {rows.map((row) => (
          <Fragment key={row.label}>
            <div className="flex items-center text-sm font-medium text-secondary pr-2">
              {row.label}
            </div>
            {columns.map((col) => {
              const cell = row.cells[col.id];
              return (
                <div
                  key={`${row.label}-${col.id}`}
                  className="hover-glow-flat rounded-xl border border-black/5 bg-white shadow-sm px-3 py-3"
                >
                  {cell ? (
                    <>
                      <div className="text-sm font-medium text-foreground leading-snug">
                        {cell.primary}
                      </div>
                      {cell.secondary && (
                        <div className="text-xs text-secondary mt-1 leading-snug">
                          {cell.secondary}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-secondary/30">—</div>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
