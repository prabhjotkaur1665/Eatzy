

                    // correct for seller only 

// import jwt from "jsonwebtoken";

// const generateToken = (res, id) => {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d"
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     sameSite: "lax", // ✅ IMPORTANT for frontend
//     secure: false    // dev mode
//   });
// };

// export default generateToken;





// import jwt from "jsonwebtoken";

// const generateToken = (res, id) => {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//   });
// };

// export default generateToken;









import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

 res.cookie("token", token, {
  httpOnly: true,
  secure: false,       // dev
  sameSite: "lax",        // ✅ IMPORTANT
  });
};

export default generateToken;