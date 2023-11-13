import { Alternative } from "../../db/entities/alternative";


export interface AlternativesRepository {
    findByExerciseId(exerciseId: string): Promise<Alternative[] | undefined>
}