import ChaptersRepository from '../Repositories/ChaptersRepository'
import SlidesRepository from '../Repositories/SlidesRepository'
import SignedInUserService from '../../user/Services/SignedInUserService'

export default class ChapterSlidesService {
  constructor({ firebase }) {
    this.signedInUserService = new SignedInUserService({ firebase })
    this.chpatersRepository = new ChaptersRepository()
    this.slidesRepository = new SlidesRepository()
  }
  async execute({ url }) {
    const { isTeacher } = await this.signedInUserService.execute()
    const chapter = await this.chpatersRepository.findByUrl(url)
    const slides = await this.slidesRepository.get({ chapterId: chapter.id })
    return { ...chapter, slides, masterMode: isTeacher }
  }
}
