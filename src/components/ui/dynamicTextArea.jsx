import React, { useRef, useEffect } from 'react';

function DynamicTextarea({ value, onChange, ...rest }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };

  const handleChange = event => {
    if (onChange) {
      onChange(event);
    }
    adjustTextareaHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      className="textarea-auto"
      {...rest}
    />
  );
}

export default DynamicTextarea;
