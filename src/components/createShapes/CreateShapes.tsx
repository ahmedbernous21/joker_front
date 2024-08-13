import { FaCircle, FaSquare, FaStar } from "react-icons/fa6";
import { TbOvalVerticalFilled } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

interface CreateShapesProps {
  shapes: any;
  setShapes: any;
}

const CreateShapes = ({ shapes, setShapes } : CreateShapesProps) => {
  return (
    <div className="flex flex-col justify-start gap-6">
      <button
        onClick={() =>
          setShapes([
            ...shapes,
            {
              id: uuidv4(),
              name: "circle",
              x: 75,
              y: 40,
              radius: 50,
              stroke: "black",
              strokeWidth: 4,
              draggable: true,
            },
          ])
        }
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <FaCircle />
      </button>
      <button
        onClick={() =>
          setShapes([
            ...shapes,
            {
              id: uuidv4(),
              name: "square",
              x: 75,
              y: 40,
              side: 100,
              fill: "#00D2FF",
              stroke: "black",
              strokeWidth: 4,
              draggable: true,
            },
          ])
        }
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <FaSquare />
      </button>
      <button
        onClick={() =>
          setShapes([
            ...shapes,
            {
              id: uuidv4(),
              name: "ellipse",
              x: 75,
              y: 40,
              radiusX: 50,
              radiusY: 100,
              stroke: "black",
              strokeWidth: 4,
              draggable: true,
            },
          ])
        }
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <TbOvalVerticalFilled />
      </button>
      <button
        onClick={() =>
          setShapes([
            ...shapes,
            {
              id: uuidv4(),
              name: "star",
              x: 75,
              y: 40,
              numPoints: 5,
              innerRadius: 20,
              outerRadius: 40,
              fill: "red",
              stroke: "black",
              strokeWidth: 4,
              draggable: true,
            },
          ])
        }
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <FaStar />
      </button>
    </div>
  );
};
export default CreateShapes;
