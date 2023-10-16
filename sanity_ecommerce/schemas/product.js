//決定sanity studio能新增什麼類型的資料
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      type: 'array', //儲存一組資料
      of: [{type: 'image'}], //array of image
      options: {
        hotsport: true, //使上傳的image能調整尺寸
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {name: 'price', title: 'Price', type: 'number'},
    {name: 'details', title: 'Details', type: 'string'},
  ],
}
