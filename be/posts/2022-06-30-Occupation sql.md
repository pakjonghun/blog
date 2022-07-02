---
date: 2022-06-30
category: til, sql
---

## 문제

- 직업이 doctor,professor, singer, actor 순서로 계속 반복 되도록 이름 순으로 정렬 한 쿼리를 만들어라.
- column : name:string, occupation:string

## 풀이

- 이제까지 기초 쿼리문만 만들었는데 갑자기 문제가 어려워 졌음
- 그리고 기억해야 할 내용이 생겨서 회고를 하기 위해 기록에 남김
- 먼저 name occupation 만으로는 쿼리를 할 수 없으므로 추가 내용이 들어간 가상 테이블을 만든다
  - 직업 이 순회하는 순서대로 1 2 3 4 번호를 붙인다.
  - 붙인 번호는 계속 +1을 해서 다른 것과 구분이 되도록 한다
  - 그리고 직업 별로 이름을 반환하는 서브 쿼리도 만든다
  - 이렇게 만들면 의사 교수 가수 배우 에 각각 1 번호표가 붙은 그룹 1 2가 붙은 그룹 2 이렇게 나눌 수 있게된다.
  ```
    set @r1=0, @r2=0, @r3=0, @r4=0;
    select
        case when occupation = 'Doctor' then (@r1:=@r1+1)
             when occupation = 'Professor' then (@r2:=@r2+1)
             when occupation = 'Singer' then (@r3:=@r3+1)
             when occupation = 'Actor' then (@r4:=@r4+1) end as R,
      case when occupation = 'Doctor' then Name end D,
      case when occupation = 'Professor' then Name end P,
      case when occupation = 'Singer' then Name end S,
      case when occupation = 'Actor' then Name end A
      from occupations
      order by Name)temp
  ```
- 위 가상테이블을 from 에 넣어서 메인으로 사용하고 붙여놓은 번호를 그룹화 하면(1 2 3 4 번호대로 그루핑이 되고) 가상테이블을 이름순으로 정렬 해 버리면 이름순으로 그루핑 된 연속된 결과가 출력된다.

```
  set @r1=0, @r2=0, @r3=0, @r4=0;

  select min(D), min(P), min(S), min(A)
  from (select
          case when occupation = 'Doctor' then (@r1:=@r1+1)
              when occupation = 'Professor' then (@r2:=@r2+1)
              when occupation = 'Singer' then (@r3:=@r3+1)
              when occupation = 'Actor' then (@r4:=@r4+1) end as R,
        case when occupation = 'Doctor' then Name end D,
        case when occupation = 'Professor' then Name end P,
        case when occupation = 'Singer' then Name end S,
        case when occupation = 'Actor' then Name end A
        from occupations
        order by Name)temp
  group by R;
```
