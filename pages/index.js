import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log("bannerData:", bannerData)}
      <div className="products-heading">
        <h2>熱銷產品</h2>
        <p>種類豐富的耳機</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

//Next.js框架獨有的獲取資料方式，區別於傳統useEffect，在網頁渲染後執行，getServerSideProps在網頁渲染前的服務器端執行，預先獲取資料，然後將獲取的資料作為props傳遞給組件
//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export const getServerSideProps = async () => {
  //將 getServerSideProps export是為了使其與 Next.js 的伺服器端渲染機制協同工作，以確保頁面能夠在伺服器端取得所需的資料。
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
export default Home;
