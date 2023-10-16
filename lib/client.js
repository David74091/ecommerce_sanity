import SanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "r9wxeddc",
  dataset: "production",
  apiVersion: "2023-10-11",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

//用於產生Sanity CMS中儲存的映像資源的 URL 位址的輔助工具。它被用來將Sanity資料庫中的圖像資源轉換為可用於網站上顯示圖像的URL位址。
//https://www.sanity.io/plugins/image-url
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
