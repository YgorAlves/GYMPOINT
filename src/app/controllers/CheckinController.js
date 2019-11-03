import { Op } from 'sequelize';
import { subDays, endOfDay } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
      order: ['created_at'],
    });
    if (!(await Student.findOne({ where: { id: req.params.id } }))) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    if (checkins.length === 0) {
      return res
        .status(400)
        .json({ error: 'No checkin found for that student' });
    }

    return res.json(checkins);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const seventhDayAgo = subDays(new Date(), 7);
    const today = endOfDay(new Date());

    const CheckinsNumber = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [seventhDayAgo, today],
        },
      },
    });

    if (CheckinsNumber.length >= 5) {
      return res.status(400).json({ error: 'Max 5' });
    }

    const checkin = await Checkin.create({ student_id: student.id });

    return res.json(checkin);
  }
}

export default new CheckinController();
