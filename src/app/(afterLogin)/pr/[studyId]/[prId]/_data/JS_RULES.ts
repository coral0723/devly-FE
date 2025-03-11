import { TokenRule } from "@/model/TokenRule";

const JS_METHODS = [
  // Array methods
  '.map', '.filter', '.reduce', '.forEach', '.find', '.findIndex', '.some', '.every',
  '.includes', '.indexOf', '.join', '.slice', '.splice', '.push', '.pop', '.shift',
  '.unshift', '.reverse', '.sort', '.concat', '.flat', '.flatMap', '.fill',
  
  // String methods
  '.split', '.replace', '.replaceAll', '.match', '.search', '.trim', '.toLowerCase',
  '.toUpperCase', '.substring', '.substr', '.slice', '.padStart', '.padEnd',
  '.startsWith', '.endsWith', '.includes', '.repeat', '.charAt', '.charCodeAt',
  
  // Number/Math methods
  '.toString', '.toFixed', '.toPrecision', '.valueOf',
  '.random', '.floor', '.ceil', '.round', '.abs', '.max', '.min',
  
  // Object methods
  '.keys', '.values', '.entries', '.hasOwnProperty', '.assign', '.freeze',
  '.seal', '.create', '.defineProperty', '.defineProperties',
  
  // Promise methods
  '.then', '.catch', '.finally', '.all', '.race', '.resolve', '.reject',
  
  // Date methods
  '.getTime', '.getDate', '.getDay', '.getMonth', '.getFullYear', '.getHours',
  '.getMinutes', '.getSeconds', '.toISOString', '.toLocaleString'
];

const HTML_ATTRIBUTES = [
  'className', 'onClick', 'onChange', 'onSubmit', 'onKeyDown', 'onKeyUp', 'onFocus', 'onBlur',
  'style', 'type', 'value', 'placeholder', 'href', 'src', 'alt', 'id', 'name', 'key',
  'disabled', 'checked', 'required', 'readOnly', 'maxLength', 'min', 'max',
  'target', 'rel', 'role', 'aria-label', 'aria-hidden', 'data-testid'
];

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
  },
  {
    // 메서드 (.으로 시작하는 메서드 호출)
    pattern: JS_METHODS,  // .으로 시작하고 괄호로 끝나는 메서드 호출 패턴
    className: 'text-[#FFA500]'  // 노란색
  },
  {
    // HTML 태그
    pattern: ['div', 'button', 'ul', 'li', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'input', 'form', 'label', 'select', 'option', 'table', 'tr', 'td', 'th', 'thead', 'tbody'],
    className: 'text-[#0033B3]'  // 파란색
  },
  {
    // HTML 속성
    pattern: HTML_ATTRIBUTES,
    className: 'text-sky-400'  // 하늘색
  }
];