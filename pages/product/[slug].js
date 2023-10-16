import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd, totalQuantities, setShowCart } =
    useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>細節: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>數量:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                onAdd(product, qty);
                console.log("總數量：", totalQuantities);
              }}
            >
              添加至購物車
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              立即購買
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>您可能會喜歡</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//使用getStaicProps時，需要使用getStaticPaths，告訴next.js，哪先路徑是會被導航到的，將一次性渲染所有的slug頁面
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    //在 Next.js 中，使用 getStaticProps 和 getStaticPaths 函數時，params 是一種約定的標識，用於存取動態路由的參數。

    //用每一個product的slug.current，創建一個params:{slug:}
    params: {
      slug: product.slug.current,
    },
    //paths會長這樣：
    // { params: { slug: "cool-in-ear-headphones" } },
    // { params: { slug: "headphones" } },
    // { params: { slug: "headphones_new" } },
    // { params: { slug: "speaker" } }
  }));

  return {
    paths,
    fallback: false,
  };
};

//Next.js框架獨有的獲取資料方式，區別於傳統useEffect，用於產生靜態頁面。資料獲取發生在建置時，而不是在如同getServerSideProps每次請求時。
//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productsQuery = `*[_type == "product"]`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      products,
      product,
    },
  };
};

export default ProductDetails;
