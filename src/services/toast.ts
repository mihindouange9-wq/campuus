/* Notifications locales de démonstration (toasts), sans dépendance. */
import { useSyncExternalStore } from "react";

export interface Toast { id: number; text: string; to?: string }
let toasts: Toast[] = [];
const listeners = new Set<() => void>();
let n = 0;
const emit = () => listeners.forEach((l) => l());

export function toast(text: string, to?: string) {
  const t = { id: ++n, text, to };
  toasts = [...toasts, t];
  emit();
  setTimeout(() => { toasts = toasts.filter((x) => x.id !== t.id); emit(); }, 4200);
}
export function useToasts() {
  return useSyncExternalStore((l) => { listeners.add(l); return () => { listeners.delete(l); }; }, () => toasts, () => toasts);
}
