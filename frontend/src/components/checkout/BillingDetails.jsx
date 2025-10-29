import React, { useState, useEffect } from "react";

function BillingDetails({ user, setBillingData, errors }) {

  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    setBillingData(userData);
  }, [userData, setBillingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8 shadow-md px-4 max-h-max pb-8">
      <h1 className="text-xl lg:text-4xl my-10">Chi tiết thanh toán</h1>
      <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
        <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
          <label htmlFor="name" className="bg-white text-gray-600 px-1 capitalize">
            Tên *
          </label>
        </div>
        <p>
          <input
            id="name"
            name="name"
            autoComplete="false"
            value={userData.name || ""}
            onChange={handleInputChange}
            tabIndex="0"
            type="text"
            className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
          />
        </p>
      </div>
      {errors.name && (
        <span className="text-red-500 text-xs">{errors.name}</span>
      )}

      <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
        <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
          <label htmlFor="address" className="bg-white text-gray-600 px-1 capitalize">
            Địa chỉ*
          </label>
        </div>
        <p>
          <input
            id="address"
            name="address"
            autoComplete="false"
            value={userData.address}
            onChange={handleInputChange}
            tabIndex="0"
            type="text"
            className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
          />
        </p>
      </div>
      {errors.address && (
        <span className="text-red-500 text-xs">{errors.address}</span>
      )}

      <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
        <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
          <label htmlFor="phone" className="bg-white text-gray-600 px-1 capitalize">
            Số điện thoại*
          </label>
        </div>
        <p>
          <input
            id="phone"
            name="phone"
            autoComplete="false"
            value={userData.phone}
            onChange={handleInputChange}
            tabIndex="0"
            type="text"
            className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
          />
        </p>
      </div>
      {errors.phone && (
        <span className="text-red-500 text-xs">{errors.phone}</span>
      )}

      <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
        <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
          <label htmlFor="email" className="bg-white text-gray-600 px-1 capitalize">
            Email*
          </label>
        </div>
        <p>
          <input
            id="email"
            name="email"
            autoComplete="false"
            value={userData.email}
            onChange={handleInputChange}
            tabIndex="0"
            type="email"
            className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
          />
        </p>
      </div>
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email}</span>
      )}
    </div>
  );
}

export default BillingDetails;
