import { dataSource } from '../db/config'
import { Content } from '../db/entities/content'
import { ContentsRepository } from './port/content-repository'

class ContentRepository implements ContentsRepository {
  private readonly contentRepository
  constructor() {
    this.contentRepository = dataSource.getRepository(Content)
  }

  async findBySublevelId(sublevelId: string): Promise<Content[] | undefined> {

    const contents = await this.contentRepository.find({
      where: {
        sublevel: {id : sublevelId}
      },
    })
    if (!contents) {
      return undefined
    }
    return contents
  }

}

export default ContentRepository