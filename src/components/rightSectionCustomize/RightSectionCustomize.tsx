import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import SubmitOrderButton from "../submitOrderButton/SubmitOrderButton";
import FontSizeCustomize from "../textCustomize/FontSizeCustomize";
import FontColorCustomize from "../textCustomize/FontColorCustomize";
import DeleteLayer from "../deleteLayer/DeleteLayer";
import FontStyleCustomize from "../textCustomize/FontStyleCustomize";

const RightSectionCustomize = () => {
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);

  return (
    <div className="flex w-[300px] flex-col gap-2">
      <div className="flex max-h-[430px] flex-1 flex-col gap-6 overflow-x-auto rounded-xl bg-white p-4">
        {selectedLayer ? (
          <div className="flex flex-col gap-6">
            {selectedLayer.type == "text" && (
              <>
                <FontSizeCustomize />
                <FontColorCustomize />
                <FontStyleCustomize />
              </>
            )}
            <DeleteLayer />
          </div>
        ) : (
          <p className="text-center">Select an object to edit its parameters</p>
        )}
      </div>
      <SubmitOrderButton />
    </div>
  );
};

export default RightSectionCustomize;
