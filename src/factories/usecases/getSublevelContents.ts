import SublevelRepository from '../../repository/sublevel-repository'
import { GetSublevelContentsUseCase } from '../../usecases/getSublevelContents/use-case'
import ContentRepository from '../../repository/content-repository'

export const makeGetSublevelContents = () => {
    const sublevelRepository = new SublevelRepository()
    const contentRepository = new ContentRepository()
  return new GetSublevelContentsUseCase(sublevelRepository, contentRepository)
}
