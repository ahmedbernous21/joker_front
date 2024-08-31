import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RightSectionSelectArticles = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state: IRootState) => state.canvas);

  const navigate = useNavigate();
  useEffect(() => {
    const isArticleExist = articles.find(
      (article: any) => article.articleName === location.pathname.split("/")[2],
    );

    if (!isArticleExist) {
      navigate(`/not-found`);
      return;
    }
    dispatch(canvasActions.changeArticle(isArticleExist));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArticle = JSON.parse(e.target.value);
    dispatch(canvasActions.changeArticle(selectedArticle));
    navigate(`/design/${selectedArticle.articleName}`); // Navigate to the desired path based on the article
  };
  return (
    <select
      onChange={handleChange}
      name="articlesSelect"
      className="w-full rounded-xl py-2 text-center outline-none"
      value={JSON.stringify(
        articles.find(
          (article: any) =>
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
export default RightSectionSelectArticles;
