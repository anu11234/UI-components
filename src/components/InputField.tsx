import React, { forwardRef, useState } from 'react';

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  inputType?: string; // Changed from 'type' to 'inputType'
  loading?: boolean;
  clearable?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const {
    value = '',
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    variant = 'outlined',
    size = 'md',
    inputType = 'text', // Updated here
    loading = false,
    clearable = false,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Determine actual input type
  const actualInputType = inputType === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : inputType;

  // Variant classes
  const variantClasses = {
    filled: 'bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500',
    outlined: 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    ghost: 'border-b border-gray-300 focus:border-blue-500',
  };

  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-3 text-base',
    lg: 'py-3 px-4 text-lg',
  };

  return (
    <div className="w-full mb-4">
      {label && <label className={`block mb-1 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</label>}
      
      <div className="relative">
        <input
          ref={ref}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          type={actualInputType} // Updated here
          className={`w-full rounded transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${
            disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
          } ${invalid ? 'border-red-500' : ''}`}
          {...rest}
        />
        
        {(clearable && internalValue) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={disabled}
          >
            ✕
          </button>
        )}
        
        {inputType === 'password' && ( // Updated here
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={disabled}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
        
        {loading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          </div>
        )}
      </div>
      
      {helperText && !invalid && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      
      {invalid && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;