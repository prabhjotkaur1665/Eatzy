// import ImageKit from "imagekit";

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

// console.log("ENV CHECK:", process.env.IMAGEKIT_PUBLIC_KEY);

// export default imagekit;




// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });  // 🔥 YEH ADD KARO

// import ImageKit from "imagekit";

// console.log("IMAGEKIT ENV:", process.env.IMAGEKIT_PUBLIC_KEY);

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

// export default imagekit;




import dotenv from "dotenv";
dotenv.config();

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;