export const getResponsiveImagePath = (imagePath, size = 'medium') => {
  const sizes = {
    small: '300w',
    medium: '600w',
    large: '1200w'
  };
  
  return imagePath.replace('.jpg', `-${sizes[size]}.jpg`);
}; 