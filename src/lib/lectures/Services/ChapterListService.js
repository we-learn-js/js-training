import ChaptersRepository from '../Repositories/ChaptersRepository'

export default class ChapterListService {
  constructor() {
    this.repository = new ChaptersRepository()
  }
  async execute() {
    return this.repository.getBySections()
  }
}
