import React from 'react';

interface ButtonProps {
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  border?: string;
  shadow?: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  width = 'auto',
  height = 'auto',
  color = 'white',
  backgroundColor = 'blue',
  border = '1px solid transparent',
  shadow = 'none',
  title,
  onClick,
  loading = false,
  disabled = false,
}) => {
  // Handling click event and preventing click when loading or disabled
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  // Determine styles based on loading and disabled states
  const buttonStyles: React.CSSProperties = {
    width,
    height,
    color,
    backgroundColor: loading ? '#ccc' : disabled ? '#ccc' : backgroundColor,
    border,
    boxShadow: shadow,
    cursor: loading || disabled ? 'not-allowed' : 'pointer',
    opacity: loading || disabled ? 0.6 : 1,
  };

  return (
    <button
      style={buttonStyles}
      onClick={handleClick}
      disabled={disabled || loading} // Disable button if loading
    >
      {loading ? 'Loading...' : title}
    </button>
  );
};

export default Button;
