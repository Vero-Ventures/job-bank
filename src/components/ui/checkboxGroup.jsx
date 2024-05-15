import React from 'react';

function Checkbox({ name, checked, onChange }) {
  return (
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
  );
}

function CheckboxGroup({ formData, handleChange, siteNames }) {
  const siteKeys = Object.keys(formData).filter(key => key.startsWith('site'));

  return (
    <div className="mt-4">
      {siteKeys.map((key, index) => (
        <div key={key} className="flex items-center">
          <Checkbox
            name={key}
            checked={formData[key]}
            onChange={handleChange}
          />
          <label className="ml-2 text-sm" htmlFor={key}>
            {`Display on ${siteNames[index]}`}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxGroup;
