import type {Database} from 'sqlite3'
import type {User} from "$lib/types/User";

declare global {
 namespace App {
  // interface Error {}

  interface Locals {
   db: Database;
   user : User | null;
  }

  // interface PageData {}
  // interface PageState {}
  // interface Platform {}
 }
}

export {};