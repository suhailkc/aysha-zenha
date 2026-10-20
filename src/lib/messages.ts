import messagesJson from "@/data/messages.json";
import type { FamilyMessage } from "@/types/content";

const notes = messagesJson as FamilyMessage[];

/** Curated family love notes (order in JSON is display order). */
export function getFamilyLoveNotes(): FamilyMessage[] {
  return notes;
}
