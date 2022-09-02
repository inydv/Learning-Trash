const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images; //because we get array as request
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url
    })
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
});

// Get All products -- User
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    let products = await apiFeature.query;

  // const productsCount = await Product.countDocuments();

  // console.log(req.cookies)

  // let products = await Product.find();

  // const queries = req.query;

  // const currentPage = Number(queries.page) || 1;
  // const skip = resultPerPage * (currentPage - 1);

  // if (queries.keyword) {
  //   products = await Product.find({
  //     title: {
  //       $regex: queries.keyword, // given query sam then it can also find the product with names samosa
  //       $options: "i", // case insensitive
  //     },
  //   })
  //     .limit(resultPerPage)
  //     .skip(skip);
  // }

  // if (queries.category) {
  //   products = await Product.find({
  //     categories: queries.category,
  //     // categories: {
  //     //   $in: [queries.Category],
  //     // },
  //   })
  //     .limit(resultPerPage)
  //     .skip(skip);
  // }

  // if (queries.price) {
  //   let queryStr = JSON.stringify(queries.price);
  //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  //   products = await Product.find({ price: JSON.parse(queryStr) })
  //     .limit(resultPerPage)
  //     .skip(skip);
  // }

  // if (queries.sort) {
  //   const sortingName = queries.sort;
  //   if (sortingName === "newest") {
  //     products = await Product.find()
  //       .sort({ createdAt: -1 })
  //       .limit(resultPerPage)
  //       .skip(skip);
  //   } else if (sortingName === "oldest") {
  //     products = await Product.find()
  //       .sort({ createdAt: 1 })
  //       .limit(resultPerPage)
  //       .skip(skip);
  //   }
  // }

  const productsCount = products.length;

  res
    .status(200)
    .json({ products, productsCount, resultPerPage });
});

// Get All products -- Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res
    .status(200)
    .json({ products });
});

// Get one Products -- User and Admin
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    product,
  });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.Images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url
      })
    }

    req.body.images = imagesLink;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true } // The default is to return the original, unaltered document. If you want the new, updated document to be returned you have to pass an additional argument: an object with the new property set to true.
  );
  res.status(200).json({
    updatedProduct,
  });
});

// Delete -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  for (let i = 0; i< product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.username,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if ((rev) => rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save();

  res.status(200).json({
    message: `Reviews Added`,
  });
});

// Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString() // review id
  );

  let avg = 0;
  reviews.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  const ratings = avg / reviews.length;

  const numofReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numofReviews,
  });

  res.status(200).json({
    message: "Review deleted successfully",
  });
});
