import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function exportToCsv<T extends Record<string, any>>(data: T[], filename: string) {
  if (!data || !data.length) return;

  const firstRow = data[0];
  if (!firstRow) return;
  const headers = Object.keys(firstRow);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        let value = row[header];
        if (value === null || value === undefined) value = "";
        value = String(value).replace(/"/g, '""');
        return `"${value}"`;
      })
      .join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
