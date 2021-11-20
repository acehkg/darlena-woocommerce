export const selectionParser = (
  variations,
  colors,
  sizes,
  length,
  selectedColor,
  selectedSize,
  selectedLength,
  setSelected
) => {
  if (colors && sizes) {
    const cs = variations.find(
      (v) =>
        v.attributes.find((a) => a.value === selectedSize?.value) &&
        v.attributes.find((a) => a.value.split('-')[0] === selectedColor?.value)
    );
    setSelected(cs);
  }
  if (colors && length) {
    const cl = variations.find(
      (v) =>
        v.attributes.find((a) => a.value === selectedLength?.value) &&
        v.attributes.find((a) => a.value.split('-')[0] === selectedColor?.value)
    );
    setSelected(cl);
  }
  if (length && sizes) {
    const ls = variations.find(
      (v) =>
        v.attributes.find((a) => a.value === selectedLength?.value) &&
        v.attributes.find((a) => a.value === selectedSize?.value)
    );
    setSelected(ls);
  }
  if (colors && !sizes && !length) {
    console.log('color only');
    const conly = variations.find((v) =>
      v.attributes.find((a) => a.value.split('-')[0] === selectedColor?.value)
    );
    setSelected(conly);
  }

  if (length && !colors && !sizes) {
    const lonly = variations.find((v) =>
      v.attributes.find((a) => a.value === selectedLength?.value)
    );
    setSelected(lonly);
  }
  if (sizes && !colors && !length) {
    const sonly = variations.find((v) =>
      v.attributes.find((a) => a.value === selectedSize?.value)
    );
    setSelected(sonly);
  }
};
