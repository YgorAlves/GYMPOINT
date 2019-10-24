import * as Yup from 'yup';
import Student from '../models/Student';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .integer()
        .max(100)
        .positive()
        .required(),
      peso: Yup.number()
        .positive()
        .required(),
      altura: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({
        error: 'Student already exists',
        data: {
          name: studentExists.name,
          email: studentExists.email,
          created_at: studentExists.created_at,
        },
      });
    }

    const { id, name, email, idade, peso, altura } = await Student.create(
      req.body
    );
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }
}

export default new StudentsController();
