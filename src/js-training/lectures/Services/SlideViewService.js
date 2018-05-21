import SignedInUserService from '../../user/Services/SignedInUserService'
import SlidesRepository from '../../lectures/Repositories/SlidesRepository'

export default class SlideViewService {
  constructor() {
    this.slidesRepository = new SlidesRepository()
  }
  async execute({ slideId }) {
    const { isExercise } = await this.slidesRepository.getSlide({ slideId })

    return isExercise
      ? {
          confirmMessage: 'Solve the exercise!',
          confirmButton: ''
        }
      : {}
  }
}
