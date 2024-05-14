import React, { useRef } from 'react';

function DynamicTextarea({ value, onChange, ...rest }) {
  const textareaRef = useRef(null);

  const handleChange = event => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    if (onChange) {
      onChange(event);
    }
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
