import { JAVA_RULES } from "../_data/JAVA_RULES";
import { JS_RULES } from "../_data/JS_RULES";

export   const colorizeCode = (line: string, language: 'java' | 'javascript') => {
  const rules = language === 'java' ? JAVA_RULES : JS_RULES;
  
  // 속성 이름만 매칭하는 정규식
  const attributeNameRegex = /^([a-zA-Z][a-zA-Z0-9]*)(=|$|\s)/;
  
  // HTML 태그와 특수문자를 모두 인식하도록 정규식 수정
  const tokens = line.split(/(\s+|[(){}[\];]|\.[a-zA-Z]\w*|<[^>]*$|^[^<]*>)/);
  
  return tokens.map((token, index) => {
    // 공백은 그대로 반환
    if (!token.trim()) {
      return token;
    }

    // 여는 태그의 시작 부분 처리 ('<li', '<div' 등)
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
      // 속성 이름 확인
      const attrMatch = trimmedToken.match(attributeNameRegex);
      if (attrMatch) {
        const [, attrName] = attrMatch;
        const attrMatchedRule = rules.find(rule => rule.pattern.includes(attrName));
        
        // 속성값 부분 분리
        const afterAttrName = trimmedToken.slice(attrName.length);
        
        // 원본 토큰에서 앞쪽 공백 유지
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

    // 메서드 호출 처리 (.으로 시작하는 경우)
    if (token.startsWith('.')) {
      const methodName = token.slice(1); // . 제거
      const matchedRule = rules.find(rule => rule.pattern.includes('.' + methodName));
      
      return (
        <span key={index}>
          {'.'}<span className={matchedRule ? matchedRule.className : 'text-gray-800'}>
            {methodName}
          </span>
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