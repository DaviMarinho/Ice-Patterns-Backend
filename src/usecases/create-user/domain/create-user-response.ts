import { Sublevel } from "../../../db/entities/domain/sublevel"

export interface CreateUserResponse {
    email: string
    username: string
    sublevel: Sublevel
  }