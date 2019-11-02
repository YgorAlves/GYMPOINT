import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      order: ['price'],
    });
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation invalid.' });
    }

    const plan = await Plan.findOne({
      where: { price: req.body.price },
    });

    if (plan) {
      return res
        .status(400)
        .json({ error: 'A Plan with the same price already exists' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation invalid.' });
    }

    const plan = await Plan.findByPk(req.params.id);

    // const checkExist = await Plan.findOne({
    //   where: {
    //     price: req.body.price,
    //     duration: req.body.duration,
    //   },
    // });

    // if (checkExist) {
    //   return res.status(400).json({
    //     error: 'Another Plan with the same price already exist',
    //   });
    // }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const checkExist = await Plan.findByPk(req.params.id);

    if (!checkExist) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    /**
     * COLOCAR RESTRIÇÃO PARA CASO TENHA STUDENTS VINCULADOS AO PLANO
     */

    const response = await Plan.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(response);
  }
}

export default new PlanController();
