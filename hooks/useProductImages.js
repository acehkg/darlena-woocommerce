import { useState, useEffect } from 'react';

const useProductImages = (product) => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const { image, galleryImages } = product;

  useEffect(() => {
    const gimgs = galleryImages.nodes.map((node) => {
      return { sourceUrl: node.sourceUrl, mediaDetails: node.mediaDetails };
    });
    const newArr = [image, ...gimgs];
    setImages(newArr);
    setIsLoading(false);
  }, [galleryImages, image]);

  return { images, isLoading };
};

export default useProductImages;
