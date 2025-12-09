import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function FormEdit({ header }: { header: string }) {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="header">Header</Label>
        <Input id="header" defaultValue={header} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="type">Type</Label>
          <Select defaultValue={"type"}>
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Table of Contents">
                Table of Contents
              </SelectItem>
              <SelectItem value="Executive Summary">
                Executive Summary
              </SelectItem>
              <SelectItem value="Technical Approach">
                Technical Approach
              </SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Capabilities">Capabilities</SelectItem>
              <SelectItem value="Focus Documents">Focus Documents</SelectItem>
              <SelectItem value="Narrative">Narrative</SelectItem>
              <SelectItem value="Cover Page">Cover Page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={"Done"}>
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="target">Target</Label>
          <Input id="target" defaultValue={"target"} />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="limit">Limit</Label>
          <Input id="limit" defaultValue={0} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="reviewer">Reviewer</Label>
        <Select defaultValue={"Reviewer"}>
          <SelectTrigger id="reviewer" className="w-full">
            <SelectValue placeholder="Select a reviewer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
            <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
            <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
