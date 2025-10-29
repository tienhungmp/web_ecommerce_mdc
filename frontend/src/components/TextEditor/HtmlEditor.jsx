import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Đừng quên import CSS
import QuillResizeImage from "quill-resize-image";

// Đăng ký module resize
Quill.register("modules/resize", QuillResizeImage);


const HtmlEditor = ({ value, onChange }) => {
  
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["code-block"],
        [{ align: [] }], // Thêm các nút căn chỉnh
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
    resize: {
      locale: {
        center: "center",
      },
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
    "align",
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
      formats={formats}
    />
  );
};

export default HtmlEditor;