'use client';

const DEFAULT_IMAGE_URL = "https://img.icons8.com/ios_filled/1200/no-image.jpg";

export default function ProductImage({ src, alt, className }) {
  const handleError = (e) => {
    e.target.src = DEFAULT_IMAGE_URL;
  };

  // Use default image if src is empty, null, or undefined
  const imageSrc = src && src.trim() !== "" ? src : DEFAULT_IMAGE_URL;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
