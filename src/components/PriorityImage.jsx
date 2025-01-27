import React from 'react';

const PriorityImage = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className={className}
      fetchPriority="high"
    />
  );
};

export default PriorityImage; 