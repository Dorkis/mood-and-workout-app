import { User } from "./user"

export interface Workout {
  id: number,
  user: User,
  name: string,
  category: string,
  duration: string,
  distance: string
}
