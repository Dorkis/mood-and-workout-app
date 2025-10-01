import { User } from "./user"

export interface Workout {
  id: number,
  user: User,
  category: string,
  duration: number,
  distance: number | null,
  createdAt: Date
}
