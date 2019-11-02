import { format, pt, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, end_date, price } = data;

    Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula feita com sucesso',
      template: 'registration',
      context: {
        name: student.name,
        plan: plan.title,
        date: format(parseISO(end_date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
        price,
      },
    });
  }
}

export default new RegistrationMail();
