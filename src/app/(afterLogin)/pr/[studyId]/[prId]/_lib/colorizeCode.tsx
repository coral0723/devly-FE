import { JAVA_RULES } from "../_data/JAVA_RULES";
import { JS_RULES } from "../_data/JS_RULES";

export const colorizeCode = (line: string, language: 'Java' | 'Javascript') => {
  const rules = language === 'Java' ? JAVA_RULES : JS_RULES;
  
  // 속성 이름만 매칭하는 정규식
  const attributeNameRegex = /^([a-zA-Z][a-zA-Z0-9]*)(=|$|\s)/;
  
  // 정규식 수정: 메서드 호출 패턴 (\w+\.map\( 같은 형태) 추가
  const tokens = line.split(/(\s+|[(){}[\];]|(?:\w+)?\.(?:[a-zA-Z]\w*)\(?|<[^>]*$|^[^<]*>)/);
  
  return tokens.map((token, index) => {
    // 공백은 그대로 반환
    if (!token.trim()) {
      return token;
    }

    // 메서드 호출 패턴 확인 (.을 포함하고 (로 끝나는 경우)
    if (token.includes('.') && token.endsWith('(')) {
      const [prefix, methodPart] = token.split('.');
      const methodName = methodPart.slice(0, -1); // 괄호 제거
      
      return (
        <span key={index}>
          {prefix}
          {'.'}
          <span className="text-[#ffbf48]">
            {methodName}
          </span>
          {'('}
        </span>
      );
    }
    
    // 단순 메서드/프로퍼티 접근 (.으로 시작하는 경우)
    if (token.startsWith('.')) {
      const methodName = token.slice(1);
      const isMethod = methodName.endsWith('(');
      const cleanMethodName = isMethod ? methodName.slice(0, -1) : methodName;
      
      return (
        <span key={index}>
          {'.'}
          <span className={isMethod ? 'text-[#ffbf48]' : 'text-gray-800'}>
            {cleanMethodName}
          </span>
          {isMethod ? '(' : ''}
        </span>
      );
    }

    // 여는 태그의 시작 부분 처리
    if (token.startsWith('<') && !token.endsWith('>')) {
      const tagName = token.slice(1).trim();
      const matchedRule = rules.find(rule => rule.pattern.includes(tagName));
      
      return (
        <span key={index}>
          {'<'}<span className={matchedRule ? matchedRule.className : 'text-gray-800'}>
            {tagName}
          </span>
        </span>
      );
    }

    // 속성이나 태그의 끝 부분 처리
    const trimmedToken = token.trim();
    if (trimmedToken) {
      const attrMatch = trimmedToken.match(attributeNameRegex);
      if (attrMatch) {
        const [, attrName] = attrMatch;
        const attrMatchedRule = rules.find(rule => rule.pattern.includes(attrName));
        const afterAttrName = trimmedToken.slice(attrName.length);
        const leadingSpaces = token.slice(0, token.indexOf(trimmedToken));
        
        return (
          <span key={index}>
            {leadingSpaces}
            <span className={attrMatchedRule ? attrMatchedRule.className : 'text-gray-800'}>
              {attrName}
            </span>
            {afterAttrName}
          </span>
        );
      }
    }

    // HTML 닫는 태그 처리
    if (token.startsWith('</') && token.endsWith('>')) {
      const tagName = token.slice(2, -1).trim();
      const matchedRule = rules.find(rule => rule.pattern.includes(tagName));
      
      return (
        <span key={index}>
          {'</'}<span className={matchedRule ? matchedRule.className : 'text-gray-800'}>
            {tagName}
          </span>{'>'}
        </span>
      );
    }

    // 일반 토큰 처리
    const matchedRule = rules.find(rule => rule.pattern.includes(token));
    
    return (
      <span 
        key={index} 
        className={matchedRule ? matchedRule.className : 'text-gray-800'}
      >
        {token}
      </span>
    );
  });
};