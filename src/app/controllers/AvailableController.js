import HelpOrder from '../models/HelpOrder';

class AvailableController {
  async index(req, res) {
    const notAnsweredYet = await HelpOrder.findAll({
      where: {
        answer: null,
        answer_at: null,
      },
      order: ['created_at'],
      attributes: ['id', 'student_id', 'question'],
    });
    return res.json(notAnsweredYet);
  }
}

export default new AvailableController();
