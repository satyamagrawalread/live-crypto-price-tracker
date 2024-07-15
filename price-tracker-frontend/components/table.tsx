"use client";
import { useGetRecentInfoByNameQuery } from "@/redux/services";
import { useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";

export default function Table() {
    const cryptoName = useSelector((state: RootState) => state.cryptoName.name)
  const { data, error, isLoading } = useGetRecentInfoByNameQuery(cryptoName, {
    pollingInterval: 300000,
    skipPollingIfUnfocused: true
  });
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rate
                </th>
                <th scope="col" className="px-6 py-3">
                    Volume
                </th>
                <th scope="col" className="px-6 py-3">
                  Cap
                </th>
                <th scope="col" className="px-6 py-3">
                  Liquidity
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.rate}</td>
                <td className="px-6 py-4">{item.volume}</td>
                <td className="px-6 py-4">{item.cap}</td>
                <td className="px-6 py-4">{item.liquidity}</td>
                <td className="px-6 py-4">{item.timestamp}</td>
              </tr>
              ))}

            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
