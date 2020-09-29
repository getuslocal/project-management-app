import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  QuillContainer,
} from './TextEditor.style';

export const TextEditor = ({
  value,
  onChange,
  placeholder,
  minHeight
}) => {
  const quillConfig = {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['clean'],
      ],
    },
  };

  return (
    <QuillContainer minHeight={minHeight} >
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...quillConfig}
      />
    </QuillContainer>
  );
};

export default TextEditor;