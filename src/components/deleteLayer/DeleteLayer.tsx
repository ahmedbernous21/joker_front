import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";
import { FaTrash } from "react-icons/fa6";

const DeleteLayer = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  return (
    <button
      onClick={() => dispatch(canvasActions.deleteLayer(selectedLayer))}
      className="flex items-center justify-center gap-2 rounded-xl bg-red-500 py-1 text-white"
    >
      <p>Delete Object</p>
      <FaTrash />
    </button>
  );
};
export default DeleteLayer;
