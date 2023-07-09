import data from '../data/test.json';
import ErrorStatus from '../utils/ErrorStatus';
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
  static getQuizResult(answers) {
    let score = 0;
    if (answers.length != 9) throw new ErrorStatus('잘못된 답변입니다', 400);
    const incorrect = [];
    for (let x = 0; x < 9; x++) {
      if (answers[x].answer === data[x].answer) {
        score += 1;
      } else {
        incorrect.push({
          title: data[x].question,
          answer: data[x].answerList[data[x].answer].content,
        });
      }
    }
    return { result: score, incorrect };
  }
}
