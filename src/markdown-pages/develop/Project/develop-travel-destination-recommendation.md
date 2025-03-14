---
date: '2021-11-01T11:55:07'
stage: PUBLISHED
series: null
category: Dev/Project/
slug: develop-travel-destination-recommendation/
title: 저기어때!
tag: kobigbird DAPT Streamlit
---

![](https://camo.githubusercontent.com/9c6fca774b473f7892957198d72101d75bb8ea6effc0e719a7b24a043f70085e/68747470733a2f2f692e696d6775722e636f6d2f313069386572622e706e67)

# [Github 바로가기](https://github.com/boostcampaitech2/final-project-level3-nlp-11)

<br/>

# 저기어때!

**저기어때**는 Naver BoostCamp AI Tech 2기 최종 프로젝트로, 7명의 개발자가 협업한 팀 프로젝트입니다.  
사용자가 원하는 장소를 묘사하면 **특정 관광지 또는 유사한 장소를 추천**해주는 서비스를 목표로 구현하였습니다.

자세한 내용은 [GitHub](https://github.com/boostcampaitech2/final-project-level3-nlp-11) 및 [개발 문서](https://github.com/boostcampaitech2/final-project-level3-nlp-11/wiki/실험일지)에서 확인할 수 있습니다.

<br/>

---

<br/>

## 개발 배경

때로는 상상하는 여행지를 찾는 일이 쉽지 않습니다.  
대부분의 여행자는 검색을 통해 여러 장소를 확인하고, 자신이 원하는 곳과 비교하는 방식으로 여행지를 찾습니다.  
이 과정에서 **많은 시간과 노력이 필요**하기 때문에, 보다 직관적인 방식이 필요하다고 생각했습니다.

이에 따라 사용자가 **여행지를 문자로 묘사하면, 그에 맞는 장소를 추천**하는 기능을 구현하기로 하였습니다.

<br/>

---

<br/>

## 개발 목표

사용자가 입력한 묘사를 기반으로 **관광지 또는 여행지를 추천**하는 서비스 구현

<br/>

---

<br/>

## 핵심 기능

### **서비스 흐름**

![Service Flow](assets/develop-travel-destination-recommendation/20221012171614708.png)

<br/>

### **명소 검색**

![명소 검색](assets/develop-travel-destination-recommendation/20221012171702884.png)

<br/>

### **유사 명소 검색**

![유사 명소 검색](assets/develop-travel-destination-recommendation/20221012171803834.png)

<br/>

---

<br/>

## 내가 맡은 역할

<br/>

### **FE(Front-End)**

서비스를 사용자에게 보여주기 위해 **Python 기반의 Streamlit**을 활용하여 빠르게 View를 구성하였습니다.

<br/>

### **ML/DL**

<br/>

#### **데이터 수집**

관광지 데이터를 확보하기 위해 **4가지 데이터 소스**를 활용하였습니다.

1. **한국관광공사 Open API**
2. **네이버 Place 데이터**
3. **네이버 Place 연계 블로그 데이터**
4. **Google Place 데이터**

이 중 저는 **네이버 Place 데이터** 및 **네이버 Place 연계 블로그 데이터** 수집을 담당하였습니다.

<br/>

#### **모델 선택 및 최적화**

모델 성능 향상을 위해 **DAPT** 등의 추가 기법을 적용하여 최적화를 진행하였습니다.  
데이터 전처리부터 모델 최적화까지의 다양한 시도는 [실험 문서](https://github.com/boostcampaitech2/final-project-level3-nlp-11/wiki/%EC%8B%A4%ED%97%98%EC%9D%BC%EC%A7%80)에 기록되어 있습니다.

<br/>

---

<br/>

## 얻은 경험

### **데이터의 중요성**

프로젝트를 진행하면서 가장 중요하다고 느낀 부분은 **데이터의 확보와 정제**였습니다.  
우리가 가진 데이터에는 **정답이 없었기 때문에**, 이를 해결하기 위한 노력이 필요했습니다.

<br/>

### **도메인 이해의 필요성**

관광지 추천이라는 도메인에 대한 **이해도에 따라 결과가 달라질 수 있음**을 깨달았습니다.  
데이터를 바라보는 **관점**에 따라 모델 성능이 달라졌으며,  
이를 고려한 접근이 성능 개선에 중요한 역할을 했습니다.

<br/>

### **모델 최적화와 평가의 어려움**

모델을 최적화하고 평가하는 과정은 예상보다 더 **시간과의 싸움**이었습니다.  
다양한 모델을 구성하고 최적화하는 경험을 쌓았지만,  
여전히 **성능을 보장하는 모델을 자신 있게 구성하기란 쉽지 않음**을 실감했습니다.  
그럼에도 불구하고, **모델 개발 프로세스를 익히고 실무에서 적용할 수 있다는 점**에서 큰 성취감을 느꼈습니다.
