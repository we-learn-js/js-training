import paramCase from 'param-case'
import chapters from '../../config/chapters'
import ChaptersRepository from '../Repositories/ChaptersRepository'

export default class ChapterListService {
  constructor() {
    this.repository = new ChaptersRepository()
  }
  async execute() {
    return this.repository.getBySections()
  }
}
