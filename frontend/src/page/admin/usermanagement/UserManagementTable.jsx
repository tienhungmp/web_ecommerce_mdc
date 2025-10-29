import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const UserManagementTable = ({ users, onDelete }) => {
  return (
    <div className="-my-2 py-1 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                Id người dùng
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                Địa chỉ
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                Số điện thoại
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                Ngày tạo
              </th>
              
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {user._id}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">{user.name}</div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {user.email}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {user.address}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {user.phone}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-500 hover:text-red-700 mx-2"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
