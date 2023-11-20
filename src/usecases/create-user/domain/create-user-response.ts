import { Sublevel } from "../../../db/entities/sublevel"

export interface CreateUserResponse {
    email: string
    username: string
    sublevel: Sublevel
  }