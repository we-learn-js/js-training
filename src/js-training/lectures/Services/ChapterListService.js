import paramCase from 'param-case'
import chapters from '../../config/chapters'
import ChaptersRepository from '../Repositories/ChaptersRepository'

export default class ChapterListService {
  async execute() {
    const repository = new ChaptersRepository()
    return repository.getBySections()
  }
}
