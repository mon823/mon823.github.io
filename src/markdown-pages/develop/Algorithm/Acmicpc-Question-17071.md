---
date: '2023-01-27T10:43:41'
stage: PUBLISHED
series: null
category: Dev/Algorithm/
slug: Acmicpc-Question-17071/
title: C++ 백준 17071번 숨바꼭질 5
tag: 백준 17071 c++
---

문제 링크 : https://www.acmicpc.net/problem/17071

<br/>

# 문제

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 500,000)에 있고, 동생은 점 K(0 ≤ K ≤ 500,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다. 동생은 항상 걷기만 한다. 동생은 항상 매 초마다 이동을 하며, 이동은 가속이 붙는다. 동생이 이동하는 거리는 이전에 이동한 거리보다 1을 더한 만큼 이동한다. 즉, 동생의 처음 위치는 K, 1초가 지난 후 위치는 K+1, 2초가 지난 후 위치는 K+1+2, 3초가 지난 후의 위치는 K+1+2+3이다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오. 동생을 찾는 위치는 정수 좌표이어야 하고, 수빈이가 0보다 작은 좌표로, 50만보다 큰 좌표로 이동하는 것은 불가능하다.

## 입력

첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

## 출력

수빈이가 동생을 찾는 가장 빠른 시간을 출력한다. 수빈이가 동생을 찾을 수 없거나, 찾는 위치가 500,000을 넘는 경우에는 -1을 출력한다.

<br/>

# 풀이

## 문제 풀이를 위한 접근

1. X초 값의 정보를 어떻게 가져올까?
2. 만약 수빈이(N) 이 먼저 도착한 경우 그 어떠한 경우보다 제자리에서 -1 +1 을 반복하는게 빠른가?

<br/>

## 문제 풀이

위 접근을 위한 고민을 잠깐 하니 X 초 이후 라는 값을 가져오기 위해 DFS를 살짝 고민했지만 BFS를 통해 한 단계 단계 끊어서 풀이할 생각을 하였고 수빈이(N) 이 먼저 도착하여 기다리는 경우가 가장 빠른 경우라고 가정하고 코드를 작성

먼저 BFS를 구현하고 X초를 구분하기 위해 Queue 사이즈를 따로 저장하여 X 초를 기록
- BFS 구조상 X초의 경우의 수를 전부 확인하면 다음 X+1 초의 모든 경우의 수를 가지기 때문에

다음으로 제자리에서 -1 +1 을 하는게 가장 빠른 경우라 했을 때 해당 위치에서 이전 기록과 비교할 방법이 필요 ( -1 +1 을 하기 때문에 2번의 턴이 필요하므로 ) 
결과적으로 홀수 초에 방문한 노드가 이전 홀수 초에서 방문 했다면 같은 시간에 방문 가능 또 짝수도 동일하므로 홀수 짝수를 구분하여서 visited를 구분 ( N 제한이 50만이라 그대로 기록하면 메모리 초과 날듯 했음. )

N과 K가 같은 경우 예외 처리


## 나의 정답 코드

``` cpp
#include <bits/stdc++.h>
using namespace std;

const int MAX = 500001;

int visited[2][MAX];
int N, K;
int dep = 1;

void bfs() {
    queue<int> que;
    bool flag = false;
    que.push(N);
    visited[0][N] = 1;

    while (que.size()) {

        K += dep;

        if (K >= MAX)
            break;

        if (visited[dep % 2][K])
            break;

        int qSize = que.size();
        for (int i = 0; i < qSize; i++) {
            int n = que.front();
            que.pop();
            for (int nx : {n + 1, n - 1, n * 2}) {
                if (nx < 0 || nx > MAX)
                    continue;
                if (visited[dep % 2][nx]) {
                    continue;
                }
                if (nx == K) {
                    flag = true;
                    break;
                }

                visited[dep % 2][nx] = visited[(dep + 1) % 2][n] + 1;
                que.push(nx);
            }
            if (flag)
                break;
        }
        if (flag)
            break;
        dep++;
    }
}

int main(void) {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    cin >> N >> K;

    if (N == K) {
        cout << 0 << '\n';
        return 0;
    }

    bfs();

    if (K >= MAX) {
        cout << -1 << '\n';
        return 0;
    }

    cout << dep << '\n';

    return 0;
}
```

<br/>