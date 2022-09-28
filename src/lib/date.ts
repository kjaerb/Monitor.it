import { format } from "date-fns";

export function formatDate(date?: Date) {
  if (date) {
    return format(new Date(date), "yyyy-MM-dd-HH:mm");
  }
}

export function formatDateSimple(date: Date) {
  if (date) {
    return format(new Date(date), "MM-dd");
  }
}
