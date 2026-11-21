import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSliders } from "../../store/features/slider/sliderThunk";

const useHomeSliders = () => {
  const { sliders, isFetching, error } = useSelector((state) => state.slider);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSliders());
  }, [dispatch]);

  const reload = () => dispatch(getSliders());

  return { sliders, isFetching, error, reload };
};

export default useHomeSliders;
