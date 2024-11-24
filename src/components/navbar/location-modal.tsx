import Separator from "@/components/ui/separator";
import { Locate } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";

export default function LocationModal({}) {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>Choose Address</DialogHeader>
      </DialogContent>

      {/* Location options */}
      <div className="flex flex-col xs:flex-row items-center gap-2">
        {/* Detect location button */}
        <Button className="h-10">
          <Locate className="h-6 w-6" />
          Auto Detect
        </Button>

        {/* OR divider */}
        <div className="w-20 text-sm">
          <Separator text="OR" />
        </div>

        {/* Search input */}
        <div className="">
          <Input type="text" placeholder="Search for street..." className="h-10" />
        </div>
      </div>
    </Dialog>
  );
}
