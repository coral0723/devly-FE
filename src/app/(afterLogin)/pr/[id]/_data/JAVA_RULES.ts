import { TokenRule } from "@/model/TokenRule";

export const JAVA_RULES: TokenRule[] = [
  {
    // 패키지, 임포트 선언
    pattern: ['package', 'import', 'from'],
    className: 'text-[#7A3E9D]'  // 보라색
  },
  {
    // 접근 제어자
    pattern: ['public', 'private', 'protected', 'default'],
    className: 'text-[#00627A]'  // 진한 청록색
  },
  {
    // 기본 키워드
    pattern: ['class', 'interface', 'enum', 'extends', 'implements', 'throws'],
    className: 'text-[#00627A]'  // 진한 청록색
  },
  {
    // 변수/메서드 수정자
    pattern: ['static', 'final', 'abstract', 'synchronized', 'volatile', 'transient'],
    className: 'text-[#00627A]'  // 진한 청록색
  },
  {
    // 제어 키워드
    pattern: ['if', 'else', 'switch', 'case', 'default', 'for', 'do', 'while', 'break', 'continue', 'return', 'throw', 'try', 'catch', 'finally'],
    className:'text-[#7A3E9D]'  // 보라색
  },
  {
    // 기본 타입
    pattern: ['void', 'boolean', 'byte', 'char', 'short', 'int', 'long', 'float', 'double'],
    className: 'text-[#00627A]'  // 진한 청록색
  },
  {
    // 값 키워드
    pattern: ['new', 'true', 'false', 'null', 'this', 'super'],
    className: 'text-[#0033B3]'  // 파란색
  },
  {
    // 어노테이션
    pattern: ['@Override', '@Deprecated', '@SuppressWarnings', '@FunctionalInterface', '@ThreadSafe'],
    className: 'text-[#87939A]'  // 회색
  }
];