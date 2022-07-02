---
date: 2022-07-01
category: til, algo
---

## 문제

- 숫자를 한자리씩 말하는 게임
  - 10진수의 경우 0부터~계속 1자리씩 순서대로 말함(1,2,...1,0,1,1)
  - 2진수도 동일 한자리씩 말함
- 이 게임 참자가 m 명 내가 말할 순서 p 몇진수 인지 n 몇자리까지 미리 알아야 하는지 t
- 이렇게 m p n t 인자가 주어진 함수가 있다.
- 이 함수가 내가 앞으로 t 번 째 까지 말 해야 하는 숫자를 반환하도록 만들어라

## 풀이

- 일단 나올 숫자를 넉넉하게 문자로 붙여서 구한다.
- 문자에서 내가 말할 인덱스를 구해서 그 문자만 뽑아서 합친 후
- 반환한다.

  ```
    function solution(n, t, m, p) {
      const totalNums = getTotalNumber(m * t);

      let answer = "";

      for (let i = 0; i < t; i++) {
        const n = p - 1 + m * i;
        answer += totalNums[n];
      }

      function getTotalNumber(repeat) {
        let totalNums = "";
        for (let i = 0; i < repeat; i++) {
          const number = i.toString(n);
          let newNumber = "";
          for (const num of number) {
            if (isNaN(+num)) newNumber += num.toUpperCase();
            else newNumber += num;
          }

          totalNums += newNumber;
        }
        return totalNums;
      }

      return answer;
    }
  ```
