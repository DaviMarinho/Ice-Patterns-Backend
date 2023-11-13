import { Content } from "../../db/entities/content";


export interface ContentsRepository {
    findBySublevelId(sublevelId: string): Promise<Content[] | undefined>
}