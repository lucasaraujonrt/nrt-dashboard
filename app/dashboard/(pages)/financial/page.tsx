"use client";

import { getFinancial, setFinancial } from "@/utils/supabaseRequest";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Financial() {
  const { userId, getToken } = useAuth();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const token = await getToken({ template: "supabase" });
    const data = await getFinancial({ userId, token });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [getToken, userId]);

  const addFinancial = async () => {
    const token = await getToken({ template: "supabase" });
    await setFinancial({ userId, token });
    fetchData();
  };

  return (
    <div className="w-full flex flex-col pr-8">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-semibold">Financial</h1>
        <AddFinancial onSubmit={(value) => addFinancial()} />
      </div>
      <Table>
        <TableCaption>A list of your recent financials.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Installments</TableHead>
            <TableHead>Value per Installments</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>At</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell>{item.installments}</TableCell>
              <TableCell>
                {(item.value / item.installments).toFixed(0)}
              </TableCell>
              <TableCell>{item.value}</TableCell>
              <TableCell className="font-medium">
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                {item.payment_method}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface AddFinancialProps {
  onSubmit: (values: any) => void;
}

export function AddFinancial({ onSubmit }: AddFinancialProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Financial
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add financial</DialogTitle>
          <DialogDescription>
            Add a new financial to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <Input id="username" value="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
