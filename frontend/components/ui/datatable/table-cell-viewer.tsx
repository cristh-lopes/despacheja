import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { Button } from "../button";
import { Separator } from "../separator";

export function TableCellViewer({
  header,
  description,
  onSubimit,
  children,
}: {
  header: string;
  description?: string;
  onSubimit: () => void;
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{header}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Separator />
          {children}
        </div>
        <DrawerFooter>
          <Button onClick={onSubimit}>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
