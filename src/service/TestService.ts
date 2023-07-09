import data from '../data/test.json';
export class TestService {
  static getQuizList() {
    const result = data.map((quiz) => {
      const newQuiz = {} as any;
      newQuiz.id = quiz.qid;
      newQuiz.title = quiz.question;
      newQuiz.answerList = quiz.answerList;
      return newQuiz;
    });
    return result;
  }
}
