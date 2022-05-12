import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ setValue, initialValue }) => {
  const editorRef = useRef(null);

  //const [value, setValueNew] = useState(initialValue ?? "");
  //useEffect(() => setValueNew(initialValue ?? ""), [initialValue]);

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  return (
    <Editor
      apiKey="igzlk43choey1vvjuqtfjiynkbseff749pn4fh0uiz8k6qxk"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        selector: "textarea", // change this value according to your HTML
        content_css: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-alpha1/css/bootstrap-reboot.css",
        ],
        content_css_cors: true,
        content_style: "body { margin: 1rem; }",
        language: "ru",
        height: 500,
        menubar: false,
        plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "preview", "help"],
        toolbar: "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      value={initialValue}
      onEditorChange={(newValue, editor) => setValue(newValue)}
    />
  );
};

export default TextEditor;
