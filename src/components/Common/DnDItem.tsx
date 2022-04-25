import { DnDType, MoveItemFn } from "interfaces/dnd";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

interface DragItem {
  index: number;
  id: string;
  type: string;
}
interface Props {
  hoverIndex: number;
  id: number;
  type: DnDType;
  moveItem: MoveItemFn;
}

const DnDItem: React.FC<PropsWithChildren<Props>> = ({
  hoverIndex,
  id,
  type,
  moveItem,
  children,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: type,
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: DragItem, monitor) => {
      if (!dragRef.current) return;
      const dragIndex = item.index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundIngRect = dragRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundIngRect.bottom - hoverBoundIngRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundIngRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => ({ id, index: hoverIndex }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  useEffect(() => {
    drag(drop(dragRef));
  }, [drag, drop]);

  return (
    <div
      className={`${isDragging ? "opacity-0" : "opacity-100"}`}
      ref={dragRef}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  );
};
export default DnDItem;
