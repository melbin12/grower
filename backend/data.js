import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: '1',
      name: 'Clothianidin',
      slug: 'Clothianidin',
      category: 'fruits',
      image: '/images/p1.jpg', // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: 'Nk',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality ',
    },
    {
     // _id: '2',
      name: 'c',
      slug: 'Spiromesifen',
      category: 'fruits',
      image: '/images/p2.jpg',
      price: 250,
      countInStock: 0,
      brand: 'ja',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
    //   _id: '3',
      name: 'Tebuconazole',
      slug: 'Tebuconazole',
      category: 'vegitables',
      image: '/images/p3.jpg',
      price: 25,
      countInStock: 15,
      brand: 'Nk',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
    //   _id: '4',
      name: 'Penconazole',
      slug: 'Penconazole',
      category: 'plants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Pa',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
};
export default data;