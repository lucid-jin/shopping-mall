# Shopping mall (feat. 정재남)

## 목적
1. 다른분의 react 패턴 배워보기
2. graphql 배워보기(기존에 애매하게 해봄)
3. recoil, react-query 
4. firebase 해보기


## Client
### 새로 써보는 node-package
 - Vite(react) 
 - vite-plugin-next-react-router 

### 느낀점
 - 싱글톤으로 쿼리클라이언트를 만들어서쓴다.(즉시실행함수)
 - 생각햇던거처럼(vite-plugin-next-react-router) 은 좋다
 - vite => 개발시 es6 module 바로 쓴다
 1) controlled component vs uncontrolled components
    1) 직접 접근하지 않고 바닐라 js 를 활용한다
    2) 유저 이벤트에 따른 렌더링을 막을 수 있다
 2) CreateRef, useRef, 를 활용한다.
 3) FormEvent
    1) form 객체를 감싸서 다양한 이벤트를 처리한다.
 4) react-query options 에 대한 이해
    1) statedTime : ssr 시 두번패치되는가능성이있다(0 에 대해서)
    2) cached Time 처리 방법
    3) 항상 기본값을 설정하고 필요시 다르게 설정해보자
    4) 