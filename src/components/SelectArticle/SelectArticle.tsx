import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";
import { useNavigate } from "react-router-dom";
import { Article } from "../../interfaces/CanvasSliceInterfaces";
import { useEffect } from "react";

const SelectArticle = () => {
  const dispatch = useDispatch();
  const { articles, frontCanvas, backCanvas } = useSelector(
    (state: IRootState) => state.canvas,
  );

  useEffect(() => {
    const isExist = articles.find(
      (article: Article) =>
        article.articleName === location.pathname.split("/")[2],
    );
    if (!isExist) {
      navigate("/notFound"); // Navigate to the default path if the article is not found
    }
  }, [articles]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArticle = JSON.parse(e.target.value);
    backCanvas?.discardActiveObject();
    frontCanvas?.discardActiveObject();
    frontCanvas?.renderAll();
    dispatch(canvasActions.changeArticle(selectedArticle));

    navigate(`/shop/${selectedArticle.articleName}`); // Navigate to the desired path based on the article
  };
  useEffect(() => {
    const selectedArticle = articles.find(
      (article: Article) =>
        article.articleName === location.pathname.split("/")[2],
    );

    dispatch(canvasActions.changeArticle(selectedArticle));
  }, [location.pathname]);
  return (
    <select
      onChange={handleChange}
      name="articlesSelect"
      className="w-[200px] rounded-xl py-2 text-center outline-none"
      value={JSON.stringify(
        articles.find(
          (article: Article) =>
            article.articleName === location.pathname.split("/")[2],
        ),
      )}
    >
      {articles.map((article) => (
        <option value={JSON.stringify(article)} key={article.id}>
          {article.articleName}
        </option>
      ))}
    </select>
  );
};

export default SelectArticle;
