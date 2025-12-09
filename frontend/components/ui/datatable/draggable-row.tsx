import { flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "../table";
import { CSS } from "@dnd-kit/utilities";
import { Row } from "@tanstack/react-table";
import z from "zod";
import { useSortable } from "@dnd-kit/sortable";

interface DraggableRowProps<T extends z.ZodType> {
  row: Row<z.infer<T>>;
  schema?: T;
}

export function DraggableRow<T extends z.ZodType>({
  row,
}: DraggableRowProps<T>) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
