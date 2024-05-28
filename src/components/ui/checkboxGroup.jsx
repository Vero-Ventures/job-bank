import React, { useState } from 'react';
import classNames from 'classnames';

function Tooltip({ message }) {
  return (
    <div className="absolute bg-black text-white text-xs rounded py-1 px-2 z-10">
      {message}
    </div>
  );
}

function Checkbox({ name, checked, onChange, disabled }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => disabled && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          'rounded shadow-sm focus:ring focus:ring-opacity-50',
          {
            'border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring-indigo-200':
              !disabled,
            'border-gray-400 text-gray-400 cursor-not-allowed': disabled,
          }
        )}
      />
      {disabled && showTooltip && (
        <Tooltip message="This option is not available for unpaid postings" />
      )}
    </div>
  );
}

function CheckboxGroup({ formData, handleChange, postingPaid }) {
  const siteNames = [
    'Indigenous People',
    'Newcomers',
    'Persons with Disabilities',
    'Vulnerable Youth',
    'Asylum-Refugees',
  ];
  const siteKeys = Object.keys(formData).filter(key => key.startsWith('site'));

  return (
    <div className="mt-4">
      {siteKeys.map((key, index) => (
        <div key={key} className="flex items-center mb-2 relative">
          <Checkbox
            name={key}
            checked={formData[key]}
            onChange={handleChange}
            disabled={!postingPaid}
          />
          <label
            className={classNames('ml-2 text-sm', {
              'text-gray-900': postingPaid,
              'text-gray-400 cursor-not-allowed': !postingPaid,
            })}
            htmlFor={key}>
            {`Display on ${siteNames[index]}`}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxGroup;
