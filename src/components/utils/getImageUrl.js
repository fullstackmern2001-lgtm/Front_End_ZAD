// utils/getImageUrl.js
export const getImageUrl = (image) => {
  if (!image) return "";
  // إذا الرابط يبدأ بـ http استخدمه مباشرة
  if (image.startsWith("http")) return image;
  return `${image}`;
};
