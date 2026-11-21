import useNews from "./useNews";

const useNewsSection = () => {
  const newsState = useNews();
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return { ...newsState, formatDate };
};

export default useNewsSection;
