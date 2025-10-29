import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { backendDomain, SummaryApi } from "../../../common";

function Slider() {
  const [banner, setBanner] = useState({
    title: "",
    imageUrl: "",
    code: "slide", // Mặc định là slide
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [banners, setBanners] = useState({
    slide: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner((prevBanner) => ({
      ...prevBanner,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner((prevBanner) => ({
          ...prevBanner,
          imageUrl: "uploads/banner/" + uploadedFile.name,
        }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
      setFile(uploadedFile);
    }
  };

  const handleRemoveImage = () => {
    setBanner((prevBanner) => ({
      ...prevBanner,
      imageUrl: "",
    }));
    setPreview(null);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Vui lòng tải ảnh lên!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", banner.title);
      formData.append("code", banner.code); // Mặc định là slide
      formData.append("images", file);

      const uploadResponse = await axios({
        url: SummaryApi.uploadBanner.url,
        method: SummaryApi.uploadBanner.method,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const uploadedImageUrl = uploadResponse.data.data[0];
      setBanner((prevBanner) => ({
        ...prevBanner,
        imageUrl: uploadedImageUrl,
      }));

      await axios({
        url: SummaryApi.createBanner.url,
        method: SummaryApi.createBanner.method,
        data: banner,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      alert("Banner uploaded successfully!");
      handleRemoveImage()
      showBanner();
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("Tải banner lên thất bại!");
    }
  };

  const showBanner = async () => {
    try {
      const response = await axios({
        url: SummaryApi.getBanner.url,
        method: SummaryApi.getBanner.method,
        withCredentials: true,
      });

      const bannerData = response.data.data;
      const categorizedBanners = {
        slide: [],
      };

      bannerData.forEach((banner) => {
        if (banner.code === "slide") {
          categorizedBanners.slide.push(banner);
        }
      });

      setBanners(categorizedBanners);
    } catch (error) {
      console.log("Error fetching banner:", error);
      alert("Có lỗi khi tải dữ liệu banner!");
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      // Gửi yêu cầu DELETE đến API
      await axios({
        url: SummaryApi.deleteBanner.url.replace(":id", id),
        method: SummaryApi.deleteBanner.method,
        withCredentials: true,
      });

      // Sau khi xóa thành công, cập nhật lại danh sách banner
      alert("Banner đã được xóa!");
      showBanner();
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Có lỗi khi xóa banner!");
    }
  };

  useEffect(() => {
    showBanner();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Quản lý slider</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Tải ảnh lên
            </label>

            {!banner.imageUrl && (
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            )}

            {preview && (
              <div className="mt-2 h-[300px] w-auto relative border rounded overflow-hidden">
                <img
                  src={preview}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 left-1 text-red-500"
                >
                  <CiCircleRemove size={30} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 relative">
            <label
              htmlFor="title"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Tiêu đề
            </label>
            <textarea
              id="title"
              name="title"
              value={banner.title}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-white text-primary border border-primary px-4 py-1.5 rounded hover:text-white hover:bg-primary"
        >
          Thêm
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mt-8">Slide Banners</h2>
        <div className="flex flex-wrap gap-4">
          {banners.slide.length > 0 ? (
            banners.slide.map((banner, index) => (
              <div key={index} className="w-72 h-28 relative">
                <img
                  src={`${backendDomain}/${banner.imageUrl}`}
                  alt={banner.title}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full text-center">
                  {banner.title}
                </div>

                {/* Thêm nút xóa */}
                <button
                  onClick={() => handleDeleteBanner(banner._id)} // Gọi hàm deleteBanner với id
                  className="absolute top-2 right-2 bg-gray-300 text-red-500 rounded-full"
                >
                  <CiCircleRemove size={20}/>
                </button>
              </div>
            ))
          ) : (
            <p>Không có banner slide.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Slider;
