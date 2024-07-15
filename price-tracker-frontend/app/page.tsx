import Image from "next/image";
import DropDown from "@/components/dropDown";
import Table from "@/components/table";


export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <DropDown />
        <Table />
      </main>
  );
}
