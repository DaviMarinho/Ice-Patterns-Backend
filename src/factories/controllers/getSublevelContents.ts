import { GetSublevelContentsController } from '../../controllers/getSublevelContents'
import { makeGetSublevelContents } from '../usecases/getSublevelContents'

export const makeGetSublevelContentsController = () => {
  return new GetSublevelContentsController(makeGetSublevelContents())
}
