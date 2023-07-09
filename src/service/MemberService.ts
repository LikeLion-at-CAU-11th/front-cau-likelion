import data from '../data/members.json';
import ErrorStatus from '../utils/ErrorStatus';

export class MemberService {
  static page(pageNum) {
    if (pageNum <= 7 || pageNum >= 1) {
      return data.slice((Number(pageNum) - 1) * 4, Number(pageNum) * 4);
    }
    throw new ErrorStatus('잘못된 요청입니다.', 400);
  }
  static gender(genderType) {
    if (genderType === 'male' || genderType === 'female') {
      return data.filter((member) => member.gender === genderType);
    }
    throw new ErrorStatus('잘못된 요청입니다', 500);
  }
  static stack(stackType) {
    if (
      stackType === 'frontend' ||
      stackType === 'backend' ||
      stackType === 'design' ||
      stackType === 'pm'
    )
      return data.filter((user) => user.stack === stackType);
    throw new ErrorStatus('잘못된 요청입니다.', 400);
  }
}
