import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { student, order, answer } = data;

    Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua dúvida foi respondida',
      template: 'answer',
      context: {
        name: student.name,
        question: order.question,
        answer,
      },
    });
  }
}

export default new AnswerMail();
