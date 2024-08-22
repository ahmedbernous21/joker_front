import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";

const RightSectionSelectArticles = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state: IRootState) => state.canvas);
  return (
    <>
      <select
        onChange={(e) => {
          dispatch(canvasActions.changeArticle(JSON.parse(e.target.value)));
        }}
        name=""
        id=""
        className="w-full rounded-xl py-2 text-center"
      >
        {articles.map((article: any) => (
          <option key={article.id} value={JSON.stringify(article)}>
            {article.articleName}
          </option>
        ))}
      </select>
    </>
  );
};
export default RightSectionSelectArticles;
