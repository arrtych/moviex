"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { HardDrive, Database, Server, Cloud } from "lucide-react";
import type { Storage } from "@/types/movie";

interface EditStorageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storage?: Storage;
  isNew?: boolean;
}

export function EditStorageModal({
  open,
  onOpenChange,
  storage,
  isNew = false,
}: EditStorageModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState(storage?.name || "");
  const [path, setPath] = useState(storage?.path || "");
  const [type, setType] = useState(storage?.type || "local");

  const handleSave = () => {
    if (!name || !path) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isNew ? "Storage added" : "Storage updated",
      description: `Storage "${name}" has been ${
        isNew ? "added" : "updated"
      } successfully`,
      variant: "default",
    });

    onOpenChange(false);
  };

  const getStorageIcon = (storageType: string) => {
    switch (storageType) {
      case "local":
        return <HardDrive className="h-4 w-4" />;
      case "network":
        return <Server className="h-4 w-4" />;
      case "external":
        return <Database className="h-4 w-4" />;
      case "cloud":
        return <Cloud className="h-4 w-4" />;
      default:
        return <HardDrive className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add Storage" : "Edit Storage"}</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Storage Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Storage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="path">Storage Path</Label>
            <div className="flex space-x-2">
              <Input
                id="path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/path/to/storage"
                className="flex-1"
              />
              <Button variant="outline">Browse</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Storage Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local" className="flex items-center">
                  <div className="flex items-center">
                    <HardDrive className="h-4 w-4 text-blue-500 mr-2" />
                    <span>Local</span>
                  </div>
                </SelectItem>
                <SelectItem value="network">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 text-purple-500 mr-2" />
                    <span>Network</span>
                  </div>
                </SelectItem>
                <SelectItem value="external">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 text-green-500 mr-2" />
                    <span>External</span>
                  </div>
                </SelectItem>
                <SelectItem value="cloud">
                  <div className="flex items-center">
                    <Cloud className="h-4 w-4 text-sky-500 mr-2" />
                    <span>Cloud</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isNew ? "Add Storage" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
