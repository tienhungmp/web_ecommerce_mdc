import React, { useContext, useEffect, useRef, useState } from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import Comment from "../components/layouts/Comment";
import { Link, useLocation, useParams } from "react-router-dom";
import freedelivery from "../assets/icons/FreeDelivery.svg";
import ReturnDelivery from "../assets/icons/Return.svg";
import axios from "axios";
import { backendDomain, SummaryApi } from "../common";
import noimage from "../assets/images/noimages.jpg";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";
import Context from "../context";
import ShowComment from "../components/layouts/ShowComment";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import RelatedItem from "../components/catalogs/section/RelatedItem";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Specifications from "../components/Specifications";

const ProductPage = () => {
  const { state } = useLocation();
  const { productDetails } = useParams();
  console.log("slug", productDetails);

  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [mainImage, setMainImage] = useState(noimage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { setCart, userData } = useContext(Context);

  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Kiểm tra nếu chiều cao nội dung lớn hơn 400px
      setIsOverflowing(contentRef.current.scrollHeight > 400);
    }
  }, [product?.description]);

  const showProduct = async (slug) => {
    setLoading(true);
    try {
      const url = SummaryApi.getProductsBySlug.url.replace(":slug", slug);
      console.log("url", url);

      const { data } = await axios({
        url: url,
        method: SummaryApi.getProductsBySlug.method,
        withCredentials: true,
      });

      setProduct(data.product);
      console.log("produv", product);

      setReviews(data.product.reviews || []);
      if (data.product.avatar?.length > 0) {
        setMainImage(`${backendDomain}/${data.product.avatar}`);
      }
      console.log("Product:", data.product);
    } catch (error) {
      console.error("Error loading product:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const [warrantiesData, setWarrantiesData] = useState([]);
  const [selectedWarranty, setSelectedWarranty] = useState({
    id: "",
    warrantyName: "",
  });

  useEffect(() => {
    const fetchWarranties = async () => {
      try {
        const warranties = await Promise.all(
          product?.warranties.map(async (warrantyId) => {
            const response = await axios({
              url: SummaryApi.getWarrantyById.url.replace(":id", warrantyId),
              method: SummaryApi.getWarrantyById.method,
              withCredentials: true,
            });
            return response.data.warranty; // Trả về đối tượng bảo hành
          })
        );
        setWarrantiesData(warranties); // Lưu dữ liệu vào state

        // Set giá trị mặc định nếu có
        const defaultWarranty = warranties.find(
          (w) => w.name.toLowerCase() !== "bảo hành vàng"
        );
        if (defaultWarranty) {
          setSelectedWarranty({
            id: defaultWarranty._id, // Đặt id của bảo hành vàng
            warrantyName: defaultWarranty.name, // Đặt tên của bảo hành vàng
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bảo hành:", error);
      }
    };

    if (product?.warranties?.length) {
      fetchWarranties(); // Gọi fetchWarranties khi warranties có giá trị
    }
  }, [product?.warranties]);

  const handleWarrantyChange = (event) => {
    const { value } = event.target;
    const warranty = warrantiesData.find((w) => w._id === value);

    setSelectedWarranty({
      id: value, // Lưu _id của gói bảo hành đã chọn
      warrantyName: warranty ? warranty.name : "",
    });
    console.log("Gói bảo hành đã chọn:", selectedWarranty); // In ra tên và _id của gói bảo hành đã chọn
  };
  const handleAddToLocalCart = (product) => {
    const cartKey = "cart";
    const cartFromStorage = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingProductIndex = cartFromStorage.findIndex(
      (pro) => pro.productId === product._id
    );

    if (existingProductIndex !== -1) {
      cartFromStorage[existingProductIndex].quantity += 1;
    } else {
      cartFromStorage.push({
        productId: product._id,
        quantity: 1,
        price: product.saleprice !== 0 ? product.saleprice : product.price,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cartFromStorage));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    setCart({ products: cartFromStorage });
  };

  const addToCart = async () => {
    if (product.inventory === 0) {
      toast.error("Sản phẩm đã hết hàng");
      return;
    }

    if (!userData) {
      handleAddToLocalCart(product);
      return;
    }

    const data = {
      productId: product._id,
      quantity: quantity || 1,
      price: product.saleprice !== 0 ? product.saleprice : product.price,
      variantId: null,
    };

    try {
      const response = await axios({
        url: SummaryApi.addToCart.url,
        method: SummaryApi.addToCart.method,
        data: data,
        withCredentials: true,
      });
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng.");
    }
  };

  const handleAddComment = async (rating, comment, username) => {
    setLoading(true);
    setError(null);

    if (!rating || !comment.trim()) {
      setError("Vui lòng chọn số sao và nhập bình luận.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        url: SummaryApi.addNewComment.url,
        method: SummaryApi.addNewComment.method,
        data: { product: product._id, username, rating, comment },
        withCredentials: true,
      });

      // Append new review to the reviews list
      const newReview = { product: product._id, username, rating, comment };
      setReviews([newReview, ...reviews]);

      toast.success("Cảm ơn bạn đã để lại đánh giá!");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Đã xảy ra lỗi khi gửi bình luận. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showProduct(productDetails);
  }, [productDetails]);

  // useEffect(() => {
  //   showProduct(state?.id);
  // }, [state?.id]);

  const changeImage = (src) => {
    setMainImage(src);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="shadow-md my-8 container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImage}
              alt={product?.name || "Product Image"}
              className="size-96 lg:size-[480px] object-cover rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              <img
                src={`${backendDomain}/${product.avatar}`}
                alt={`Thumbnail ${product.avatar}`}
                className="size-16 sm:size-20 object-cover shadow-md rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  changeImage(`${backendDomain}/${product.avatar}`)
                }
              />
              {product?.images?.map((thumb, index) => (
                <img
                  src={`${backendDomain}/${thumb}`}
                  key={index}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 shadow-md object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(`${backendDomain}/${thumb}`)}
                />
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-8 px-4 py-3 border mt-4 mb-2">
              <img src={freedelivery} alt="" />
              <div>
                <h3 className="font-semibold">Giao hàng miễn phí</h3>
                <span className="text-[13px]">
                  Với đơn hàng có giá trị trên 1 triệu đồng
                </span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-8 px-4 py-3 border">
              <img src={ReturnDelivery} alt="" />
              <div>
                <h3 className="font-semibold">Trả hàng</h3>
                <span className="text-[13px]">
                  Miễn phí trả hàng trong vòng 7 ngày
                </span>
              </div>
            </div>
          </div>
          <div
            className={`w-full md:w-1/2 px-4 ${
              product?.specifications?.length === 0 ? "space-y-8" : ""
            }`}
          >
            <h2 className="text-xl lg:text-2xl font-semibold mb-1">
              {product?.name}
            </h2>
            <div className="flex items-center mb-4">
              {/* Hiển thị sao */}
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {product?.averageRating >= star ? (
                      <AiFillStar className="text-yellow-500" size={18} />
                    ) : product?.averageRating >= star - 0.5 ? (
                      <AiFillStar
                        className="text-yellow-500"
                        size={18}
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                    ) : (
                      <AiOutlineStar className="text-gray-400" size={18} />
                    )}
                  </span>
                ))}
              </div>
              {/* Hiển thị số sao trung bình và số đánh giá */}
              <span className="ml-2 text-gray-600 text-sm">
                {product?.averageRating?.toFixed(1)} ({product?.numOfReviews}{" "}
                reviews)
              </span>
            </div>
            <div className="mb-4 text-sm">
              {product?.saleprice === 0 ? (
                <span className="text-lg lg:text-xl mr-2 text-primary">
                  {product?.price
                    ? (
                        product?.price +
                        (selectedWarranty.warrantyName.toLowerCase() ===
                        "bảo hành vàng"
                          ? 1000000
                          : 0)
                      ).toLocaleString()
                    : "0"}{" "}
                  đ
                </span>
              ) : (
                <>
                  <span className="text-lg lg:text-lg mr-2 text-primary">
                    {product?.saleprice
                      ? (
                          product?.saleprice +
                          (selectedWarranty.warrantyName.toLowerCase() ===
                          "bảo hành vàng"
                            ? 1000000
                            : 0)
                        ).toLocaleString()
                      : ""}{" "}
                    đ
                  </span>
                  <span className="text-gray-500 text-sm lg:text-base line-through">
                    {product?.price
                      ? (
                          product?.price +
                          (selectedWarranty.warrantyName.toLowerCase() ===
                          "bảo hành vàng"
                            ? 1000000
                            : 0)
                        ).toLocaleString()
                      : "0"}{" "}
                    đ
                  </span>
                </>
              )}
            </div>

            <div className="mb-4 flex gap-6 items-center">
              <h3 className="text-sm lg:text-base mb-1 font-semibold">
                Số lượng:
              </h3>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="999"
                value={quantity} // Sử dụng giá trị quantity từ state
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="h-8 w-24 text-center rounded-md border shadow-sm outline-none focus:border-primary focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>

            {warrantiesData.length > 0 && (
              <>
                {/* Kiểm tra xem có "bảo hàng vàng" trong danh sách không */}
                {warrantiesData.some(
                  (warranty) => warranty.name.toLowerCase() === "bảo hành vàng"
                ) && (
                  <div className="mb-4 flex flex-col gap-4 items-start">
                    <h3 className="text-sm lg:text-base font-semibold">
                      Chọn gói bảo hành:
                    </h3>
                    {/* Render tất cả các gói bảo hành */}
                    {warrantiesData.map((warranty, index) => (
                      <div key={index} className="flex flex-col gap-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="warranty" // Đặt name chung cho các radio buttons để chúng là một nhóm
                            value={warranty._id} // Đặt giá trị là _id của bảo hành
                            className="form-radio"
                            checked={selectedWarranty.id === warranty._id} // Kiểm tra nếu _id của bảo hành trùng với giá trị trong state
                            onChange={handleWarrantyChange} // Hàm xử lý khi thay đổi lựa chọn
                          />
                          <span className="text-sm">
                            {warranty.name} ({warranty.description})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="mb-6 flex gap-4 items-center">
              <BsCart3
                onClick={addToCart}
                className="text-primary cursor-pointer"
                size={30}
              />

              <Link
                to={`/products/checkout/${
                  product?.slug
                }?quantity=${quantity}&mbh=${selectedWarranty.id}&bhv=${
                  selectedWarranty.warrantyName.toLowerCase() ===
                  "bảo hành vàng"
                    ? "true"
                    : "false"
                }`}
                state={{ id: state?.id, quantity: quantity }}
                className="w-full"
              >
                <button
                  type="button"
                  className="text-sm w-full lg:text-base px-5 py-2 font-semibold tracking-wide bg-white text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
                >
                  Mua ngay
                </button>
              </Link>
            </div>
            {product?.specifications ? (
              <div className="mb-8">
                <h3 className="text-sm lg:text-base mb-1 font-semibold">
                  Thông số kỹ thuật:
                </h3>
                <Specifications data={product.specifications} />
                <hr />
              </div>
            ) : null}

            <div className="flex lg:hidden items-center gap-8 px-4 py-3 border">
              <img src={freedelivery} alt="" />
              <div>
                <h3 className="font-semibold">Giao hàng miễn phí</h3>
                <span className="text-[13px]">
                  Với đơn hàng có giá trị trên 1 triệu đồng
                </span>
              </div>
            </div>
            <div className="flex lg:hidden items-center gap-8 px-4 py-3 border">
              <img src={ReturnDelivery} alt="" />
              <div>
                <h3 className="font-semibold">Trả hàng</h3>
                <span className="text-[13px]">
                  Miễn phí trả hàng trong vòng 7 ngày
                </span>
              </div>
            </div>
            {product?.warrantiesDescriptions ? (
              <>
                <div className="px-4 py-3 border mt-4 relative productpage">
                  <div className="ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: product?.warrantiesDescriptions,
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
        <h2 className="text-xl lg:text-xl font-semibold mt-10 mb-1">Mô tả</h2>
        <hr />
        <div className="relative productpage">
          <div
            ref={contentRef}
            className={`ql-editor transition-all overflow-hidden ${
              showMoreDescription ? "max-h-full" : "max-h-[400px]"
            }`}
            dangerouslySetInnerHTML={{ __html: product?.description }}
          />
          {isOverflowing && (
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent flex justify-center pt-2">
              <button
                onClick={() => setShowMoreDescription(!showMoreDescription)}
                className="text-primary font-medium"
              >
                {showMoreDescription ? (
                  <span className="flex items-center gap-2">
                    Ẩn bớt <MdKeyboardArrowUp />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Xem thêm <MdKeyboardArrowDown />
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <h2 className="text-xl lg:text-xl font-semibold mb-1">Bình Luận</h2>
        <div className="flex items-center mb-4">
          {/* Hiển thị sao */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {product?.averageRating >= star ? (
                  <AiFillStar className="text-yellow-500" size={18} />
                ) : product?.averageRating >= star - 0.5 ? (
                  <AiFillStar
                    className="text-yellow-500"
                    size={18}
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                ) : (
                  <AiOutlineStar className="text-gray-400" size={18} />
                )}
              </span>
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-base">
            {product?.averageRating?.toFixed(1)} - {product?.numOfReviews}{" "}
            reviews
          </span>
        </div>
      </div>
      <Comment
        productId={product?._id}
        onSubmit={handleAddComment}
        loading={loading}
        error={error}
      />
      <ShowComment reviews={reviews} setReviews={setReviews} />
      <div className="relative mb-10">
        <div className="flex items-center justify-between mb-6 lg:mb-10">
          <div className="flex items-center gap-4">
            <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
            <span className="text-primary font-bold text-lg">
              Mục liên quan
            </span>
          </div>
        </div>
        <RelatedItem id={product?.mainCategory} />
      </div>
    </div>
  );
};

export default ProductPage;
