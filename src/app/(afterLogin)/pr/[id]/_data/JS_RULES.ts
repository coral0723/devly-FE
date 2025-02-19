import { TokenRule } from "@/model/TokenRule";

// JavaScript 언어 규칙
export const JS_RULES: TokenRule[] = [
  {
    // 모듈 관련
    pattern: ['import', 'export', 'from', 'default', 'as'],
    className: 'text-[#7A3E9D]'  // 보라색
  },
  {
    // 변수 선언
    pattern: ['const', 'let', 'var'],
    className: 'text-[#0033B3]'  // 파란색
  },
  {
    // 기본 키워드
    pattern: ['function', 'class', 'extends', 'constructor', 'async', 'await'],
    className: 'text-[#00627A]'  // 진한 청록색
  },
  {
    // 제어 키워드
    pattern: ['if', 'else', 'switch', 'case', 'for', 'of', 'in', 'do', 'while', 'break', 'continue', 'return', 'throw', 'try', 'catch', 'finally'],
    className: 'text-[#00627A]'  // 진한 청록색
  },
  {
    // 값 키워드
    pattern: ['new', 'true', 'false', 'null', 'undefined', 'this', 'super'],
    className: 'text-[#0033B3]'  // 파란색
  },
  {
    // 특수 객체/함수
    pattern: ['Array', 'Object', 'String', 'Number', 'Boolean', 'Function', 'Symbol', 'Map', 'Set', 'Promise', 'Date', 'RegExp'],
    className: 'text-[#267F99]'  // 밝은 청록색
  },
  {
    // 화살표 함수와 기타
    pattern: ['=>', 'typeof', 'instanceof', 'delete'],
    className: 'text-[#00627A]'  // 진한 청록색
  }
];