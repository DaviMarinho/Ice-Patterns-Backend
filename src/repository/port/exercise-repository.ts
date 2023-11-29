import { Exercise } from "../../db/entities/exercise";


export interface ExercisesRepository {
    findBySublevelId(sublevelId: string): Promise<Exercise[] | undefined>
    findOneById(id: string): Promise<Exercise | undefined>
}