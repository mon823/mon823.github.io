---
date: '2022-09-19T16:34:10'
stage: PUBLISHED
series: Gatsby & Typescript로 블로그 만들기
category: Dev/blog/
slug: create-blog-with-gatsby-typescript/Head-head-api/
title: Gatsby Site Map 생성 및 SEO 설정
tag: Gatsby Gatsbyjs Blog Typescript HeadApi SEO
---

블로그의 Site Map 생성과 SEO 를 위한 기본적인 구성해보자

<br/>

# SiteMap

## Gatsby Plugin

SiteMap은 Gatsby Plugin을 설치해주면 자동으로 생성해준다.

그중 저는 `gatsby-plugin-advanced-sitemap` 을 사용하였고

/sitemap.xml 경로에서 확인할 수 있다.

<br/>

# SEO

먼저 Meta 테그를 이용해 Head에 추가하여 원하는 데이터를 추가할 수 있고 여기에 물론 Open Graph(OG)또한 사용이 가능하다.

각각 원하는 사이트마다 OG 테그의 요구가 다르기 때문에 원하는 사이트의 조건에 맞추어 진행하는것이 좋으며 기본적으로 통용되는 메타 테그들이 있다.

<br/>

## React helmet

처음에 React helmet을 이용한 Header를 구성하려 하였으나 Gatsby 공식 문서에서 더 이상 지원하지 않는다고 하였다.

따라서 공식 문서에서 제공하는 Head API 를 사용하였다.

<br/>

## Head API

간다하게 다음을 추가하면 Head정보를 넘겨 줄 수 있다.

``` typescript
interface Ichildren {
  children?: ReactNode;
}

export const Seo = ({ children }: Ichildren) => {
  return (
    <>
      <meta name="google-site-verification" content="" />
      <meta name="naver-site-verification" content="" />
      <meta property="og:site_title" content="" />
      {children}
    </>
  );
};

```

물론 모든 페이지에 이러한 설정을 진행 할 수 없으며 또한 페이지 마다 원하는 정보가 다르기 때문에 데이터를 받아주는게 좋은데 

다음 4가지의 Properites를 내려준다

- location.pathname : object's URL's path
- params : 페이지에 mathPath가 있는 경우 URL 매개 변수
- data : GarphQL query
- pageContext : createPage에서 넘겨준 context Object

```typescript
export const Head = ({ location, params, data, pageContext }) => (
  <>
    <title>{pageContext.title}</title>
	//... 생략
  </>
)
```

또한 중복되는 테그의 경우 따로 Components 처럼 이용 할 수 있다.

``` typescript
interface Ichildren {
  children?: ReactNode;
}

export const Seo = ({ children }: Ichildren) => {
  return (
    <>
      <meta name="google-site-verification" content="" />
      <meta name="naver-site-verification" content="" />
      <meta property="og:site_title" content="" />
      {children}
    </>
  );
};


export const Head = () => (
  <Seo>
    <link id="icon" rel="icon" href="icon-specific-for-this-page" />
  </Seo>
)
```


따라서 SEO 관련 Component를 만들어서 공통된 meta tag등을 만들고 그 외 필요한 정보들은 해당 Components의  Head에 서 추가적으로 추가해서 구성하였다.

아래 예시
```typescript
//SeriesTemplate.tsx
// type import 생략
//... 생략
export default Template;

export const Head = (props: IpostData) => {
  const post = props.data.markdownRemark;
  const seriesTitle = post.frontmatter.series ? post.frontmatter.series : '';
  return (
    <>
      <Components.Seo>
        <title>{seriesTitle}</title>
        <meta property="og:title" content={seriesTitle} />
      </Components.Seo>
    </>
  );
};

```

``` typescript
// type import 생략
export const Seo = ({ children }: Ichildren) => {
  const { site }: Isite = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            ogImage
            siteUrl
            author {
              name
            }
          }
        }
      }
    `,
  );

  return (
    <>
      <link rel="preload" as="font" href={FontPath} type="font/woff2" crossOrigin="anonymous" />
      <meta property="og:site_title" content={site.siteMetadata.title} />
      <meta property="og:url" content={site.siteMetadata.siteUrl} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:image" content={site.siteMetadata.ogImage} />
      <meta property="og:author" content={site.siteMetadata.author.name} />
      <meta property="og:locale" content="ko" />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index" />
      {children}
    </>
  );
};

```

# 확인하기

해당 Tag를 확인하는 방법은 Preview를 지원하는 사이트에서 확인하는 것이 좋다.

Preview에서 잘 나온다고 기존 사이트에 바로 반영이 되는 것은 아니다.

일반적으로 캐싱을 통해 보여주기 때문에 캐싱의 TTL이 지난 이후에 확인이 가능할 것이다.

![](assets/Head-head-api/20221005200428586.png)

![](assets/Head-head-api/20221005200454443.png)

하루 정도 지난 후에 확인했을때 다음과 같이 잘 나타나는 것을 확인 할 수 있다.