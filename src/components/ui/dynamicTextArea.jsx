import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function DynamicTextarea({ name, value, onChange, ...rest }) {
  const quillRef = useRef(null);
  const [editorHtml, setEditorHtml] = useState(value);

  useEffect(() => {
    setEditorHtml(value);
  }, [value]);

  const handleChange = html => {
    setEditorHtml(html);
    if (onChange) {
      // Create a synthetic event to mimic the real event so that the parent component can access the name and value
      const syntheticEvent = {
        target: {
          name,
          value: html,
        },
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={editorHtml}
      onChange={handleChange}
      className="quill-editor"
      {...rest}
    />
  );
}

export default DynamicTextarea;
