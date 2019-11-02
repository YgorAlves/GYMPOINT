import { parseISO, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll();
    const data = registrations.map(
      ({ id, plan_id, student_id, start_date, end_date, price }) => ({
        id,
        plan_id,
        student_id,
        start_date,
        end_date,
        price,
      })
    );

    return res.json(data);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const studentHasAPlan = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (studentHasAPlan) {
      return res.status(400).json({ error: 'Student already has a plan' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.price * plan.duration;

    const { id } = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const { start_date, student_id, plan_id } = req.body;

    let student = null;

    if (student_id) {
      student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'Student does not exist' });
      }
    }

    let newPlan = null;

    if (plan_id) {
      newPlan = await Plan.findByPk(plan_id);

      if (!newPlan) {
        return res.status(400).json({ error: 'Plan does not exist' });
      }
    }

    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exist' });
    }

    const newRegistration = { student_id, plan_id, start_date };

    /**
     * If the admin try to update the student to a new one,
     * cuz he wants it, or the students made a new registration
     */

    if (student && registration.student_id !== student.id) {
      /**
       * One Student cant have 2 plans
       */
      const studentAlreadyHasPlan = await Registration.findOne({
        where: {
          student_id,
        },
      });

      if (studentAlreadyHasPlan) {
        return res.status(400).json({ error: 'Student already has a plan' });
      }
    }

    /**
     * check if user wants to update the start_date
     * and then recalculate the price
     */
    if (start_date) {
      newRegistration.end_date = addMonths(
        parseISO(start_date),
        newPlan.duration
      );
      newRegistration.price = newPlan.price * newPlan.duration;
    }

    if (plan_id) {
      newRegistration.price = newPlan.price * newPlan.duration;
    }

    const {
      id,
      student_id: new_student_id,
      plan_id: new_plan_id,
      start_date: new_start_date,
      end_date,
      price,
    } = await registration.update(newRegistration);

    return res.json({
      id,
      student_id: new_student_id,
      plan_id: new_plan_id,
      start_date: new_start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exist' });
    }

    await registration.destroy();

    return res.sendStatus(200);
  }
}

export default new RegistrationController();
