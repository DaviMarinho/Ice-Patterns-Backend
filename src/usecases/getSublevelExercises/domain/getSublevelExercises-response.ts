import { Alternative } from "../../../db/entities/alternative";
import { Exercise } from "../../../db/entities/exercise";


export interface DetailedExercise {
    exercise: Exercise,
    alternatives: Alternative[]
}

export interface GetSublevelExercisesResponse {
    exercises: DetailedExercise[]
}
