import { useState, useEffect } from 'react';

const useProductImages = (product) => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const { featuredImage, galleryImages } = product;

  useEffect(() => {
    const image = {
      sourceUrl: featuredImage.node.sourceUrl,
      mediaDetails: featuredImage.node.mediaDetails,
    };
    const gimgs = galleryImages.nodes.map((node) => {
      return { sourceUrl: node.sourceUrl, mediaDetails: node.mediaDetails };
    });
    const newArr = [image, ...gimgs];
    setImages(newArr);
    setIsLoading(false);
  }, [galleryImages, featuredImage]);

  return { images, isLoading };
};

export default useProductImages;
