import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id);

    const orders = await HelpOrder.findAll({
      where: {
        student_id: student.id,
      },
      order: ['created_at'],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation invalid.' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const { student_id, question } = await HelpOrder.create({
      student_id: student.id,
      question: req.body.question,
    });

    return res.json({ student_id, question });
  }
}

export default new HelpOrderController();
