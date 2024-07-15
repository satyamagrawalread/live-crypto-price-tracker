import Image from "next/image";
import SelectCoin from "@/components/SelectCoin";
import CoinDetailsTable from "@/components/CoinDetailsTable";


export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SelectCoin />
        <CoinDetailsTable />
      </main>
  );
}
