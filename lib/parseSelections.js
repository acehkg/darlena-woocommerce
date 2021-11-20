export const parseSelections = (
  variations,
  colors,
  sizes,
  length,
  selectedColor,
  selectedSize,
  selectedLength,
  setSelected
) => {
  switch ((colors, length, sizes)) {
    case colors && sizes:
      const cs = variations.find(
        (v) =>
          v.attributes.find((a) => a.value === selectedSize?.value) &&
          v.attributes.find(
            (a) => a.value.split('-')[0] === selectedColor?.value
          )
      );
      setSelected(cs);
      break;
    case colors && length:
      const cl = variations.find(
        (v) =>
          v.attributes.find((a) => a.value === selectedLength?.value) &&
          v.attributes.find(
            (a) => a.value.split('-')[0] === selectedColor?.value
          )
      );
      setSelected(cl);
      break;
    case length && sizes:
      const ls = variations.find(
        (v) =>
          v.attributes.find((a) => a.value === selectedLength?.value) &&
          v.attributes.find((a) => a.value === selectedSize?.value)
      );
      setSelected(ls);
      break;
    case colors && (!sizes || !length):
      const conly = variations.find((v) =>
        v.attributes.find((a) => a.value.split('-')[0] === selectedColor?.value)
      );
      setSelected(conly);
      break;

    case length && (!colors || !sizes):
      const lonly = variations.find((v) =>
        v.attributes.find((a) => a.value === selectedLength?.value)
      );
      setSelected(lonly);
      break;
    case sizes && (!colors || !length):
      const sonly = variations.find((v) =>
        v.attributes.find((a) => a.value === selectedSize?.value)
      );
      setSelected(sonly);
      break;
  }
};
