import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation invalid.' });
    }

    const order = await HelpOrder.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Help Order does not exists' });
    }

    if (order.answer_at) {
      return res.status(400).json({ error: 'Help order already answered' });
    }

    const student = await Student.findOne({
      where: {
        id: order.student_id,
      },
    });

    const { answer, answer_at, student_id } = await order.update({
      answer: req.body.answer,
      answer_at: new Date(),
      where: {
        id: order.id,
      },
    });

    await Queue.add(AnswerMail.key, {
      student,
      order,
      answer,
    });

    return res.json({ answer, answer_at, student_id });
  }
}
export default new AnswerController();
