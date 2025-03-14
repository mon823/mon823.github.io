---
date: '2023-01-20T11:21:44'
stage: PUBLISHED
series: null
category: Dev/Algorithm/
slug: Acmicpc-Question-3197/
title: C++ 백준 3197번 백조의 호수
tag: 백준 3197 c++
---

문제 링크 : https://www.acmicpc.net/problem/3197

<br/>

# 문제

두 마리의 백조가 호수에서 살고 있었다. 그렇지만 두 마리는 호수를 덮고 있는 빙판으로 만나지 못한다.

호수는 행이 R개, 열이 C개인 직사각형 모양이다. 어떤 칸은 얼음으로 덮여있다.

호수는 차례로 녹는데, 매일 물 공간과 접촉한 모든 빙판 공간은 녹는다. 두 개의 공간이 접촉하려면 가로나 세로로 닿아 있는 것만 (대각선은 고려하지 않는다) 생각한다.

아래에는 세 가지 예가 있다.

```
...XXXXXX..XX.XXX ....XXXX.......XX .....XX.......... 
....XXXXXXXXX.XXX .....XXXX..X..... ......X.......... 
...XXXXXXXXXXXX.. ....XXX..XXXX.... .....X.....X..... 
..XXXXX..XXXXXX.. ...XXX....XXXX... ....X......XX.... 
.XXXXXX..XXXXXX.. ..XXXX....XXXX... ...XX......XX.... 
XXXXXXX...XXXX... ..XXXX.....XX.... ....X............ 
..XXXXX...XXX.... ....XX.....X..... ................. 
....XXXXX.XXX.... .....XX....X..... ................. 
    처음               첫째 날             둘째 날
```

백조는 오직 물 공간에서 세로나 가로로만(대각선은 제외한다) 움직일 수 있다.

며칠이 지나야 백조들이 만날 수 있는 지 계산하는 프로그램을 작성하시오.

## 입력

입력의 첫째 줄에는 R과 C가 주어진다. 단, 1 ≤ R, C ≤ 1500.

다음 R개의 줄에는 각각 길이 C의 문자열이 하나씩 주어진다. '.'은 물 공간, 'X'는 빙판 공간, 'L'은 백조가 있는 공간으로 나타낸다.

## 출력

첫째 줄에 문제에서 주어진 걸리는 날을 출력한다.

<br/>

# 풀이

## 문제 풀이를 위한 접근

1. DFS 나 BFS 으로 빈공간에서 탐색을 시작하면 시간 초과가 날까?
2. 시간 초과가 난다면 어떻게 해결할까?
3. 탐색 시간을 줄이는 방법은 뭐가 있을까?

<br/>

## 문제 풀이

먼저 BFS 나 DFS로 빈공간을 매번 탐색하여서 얼음을 순차적으로 녹이는 방법은 시간초과가 당연하게 날 수 밖에 없었기에 탐색 시간을 줄이는 방법을 고려할 필요가 있었다.

따라서
1. 얼음 녹는 시간을 기록한다. (한번의 BFS 완전 탐색으로)
2. 한쪽 L 에서 다른 L 을  찾을 때 까지 얼음을 녹이면서 확인한다.
라는 생각으로 코드를 작성하였다.
대충 시간 복잡도는 BFS 완전 탐색 2회 정도로 생각하였다.

가장 먼저 얼음과 닿는 부분을 체크 하기 위해  '.' 으로 된 공간을 전부 방문처리하고 queue 에 넣은 후 BFS를 돌렸다
위와 같은 방식으로 BFS에 넣게되면 순차적으로 얼음이 녹는 길이 기록된다. (BFS 1회)
- 코드상에서 bfs(0) 해당 부분이 얼음을 녹이기 위해 구분해둔 부분이다. (flag 값으로 구분했다.)

다음으로 한쪽 L(백조)를 움직이면서 다른 L(백조)를 찾기 위해 BFS를 돌린다.
여기서 중요한 것은 BFS를 얼음이 녹는 순서대로 방문하는 것이다. 
따라서 BFS를 단계로 구분하여 flag 값으로 1,2,3... 이런식으로 확인하면서 다른 L(백조)의 위치를 찾아갔다.


<br/>

## 나의 정답 코드

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAX_VALUE = 1500;
const int dy[] = {-1, 0, 1, 0};
const int dx[] = {0, 1, 0, -1};
int N, M;
int a[MAX_VALUE][MAX_VALUE], visited[MAX_VALUE][MAX_VALUE],
    lgoing[MAX_VALUE][MAX_VALUE];
vector<pair<int, int>> La;
queue<pair<int, int>> que;
set<pair<int, int>> s;

bool bfs(int flag) {
    while (que.size()) {
        int x, y;
        tie(y, x) = que.front();
        que.pop();
        for (int i = 0; i < 4; i++) {
            int ny = y + dy[i];
            int nx = x + dx[i];
            if (ny < 0 || nx < 0 || ny >= N || nx >= M)
                continue;

            if (!flag) {
                if (visited[ny][nx])
                    continue;

                if (a[ny][nx] == 1) {
                    visited[ny][nx] = visited[y][x] + 1;
                    que.push({ny, nx});
                }

                if (a[ny][nx] == 0) {
                    visited[ny][nx] = visited[y][x];
                    que.push({ny, nx});
                }
            } else {

                if (lgoing[ny][nx])
                    continue;

                if (a[ny][nx] == 2) {
                    return true;
                }

                if (visited[ny][nx] > flag) {
                    s.insert({y, x});
                    continue;
                }

                lgoing[ny][nx] = flag;
                que.push({ny, nx});
            }
        }
    }
    for (auto i : s) {
        que.push(i);
    }

    return false;
}

int main(void) {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    cin >> N >> M;

    for (int i = 0; i < N; i++) {
        string s;
        cin >> s;
        for (int j = 0; j < M; j++) {
            if (s[j] == '.')
                a[i][j] = 0;
            if (s[j] == 'X')
                a[i][j] = 1;
            if (s[j] == 'L') {
                La.push_back({i, j});
                a[i][j] = 2;
            }
            if (a[i][j] != 1) {
                visited[i][j] = 1;
                que.push({i, j});
            }
        }
    }

    bfs(0);

    int tmpy, tmpx;
    tie(tmpy, tmpx) = La[0];
    que.push({tmpy, tmpx});
    lgoing[tmpy][tmpx] = 1;
    for (int i = 0;; i++) {
        if (bfs(i)) {
            cout << i - 1 << '\n';
            break;
        }
        s.clear();
    }
    return 0;
}
```

<br/>