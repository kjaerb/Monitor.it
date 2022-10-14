import { format } from "date-fns";

export function formatDate(date?: Date) {
  if (date) {
    return format(new Date(date), "HH:mm-dd-MM-yyyy");
  }
}

export function formatDateSimple(date: Date | string) {
  if (date) {
    return format(new Date(date), "dd/MM-yyyy");
  }
}
