import { useEffect, useState } from "react";
import AuctionComp from "../../../Components/auctions/AuctionComp";
import "./UserOpenAuctions.css";

export default function UserOpenAuctionsPage() {
  const [auctions, setAuctions] = useState(undefined);

  useEffect(() => {
    getAuctions();
  }, []);

  useEffect(() => {}, [auctions]);

  async function getAuctions() {
    const headers = new Headers();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzM1MGM4ZTZlYTAwYjVkODg5MjRlMiIsImlhdCI6MTY4MTE2MzQyNywiZXhwIjoxNjgzNzU1NDI3fQ.TM_oDYgpQ241OLWFQCGI1CfZDQFTiQHgepKOES1zi4o";

    headers.append("content-type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch("http://localhost:6363/api/Auctions", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
    setAuctions(result);
    return result;
  }

  return (
    <div id="user-open-auctions">
        <div id='auctions-container'>

      {Array.isArray(auctions) &&
        auctions.map((e) => {
            return (
                <AuctionComp
                key={e._id}
                tourName={e.auctionTourName}
                Date={e.auctionDate}
                lang={e.auctionLanguage}
                endDate={e.auctionEndDate}
                />
                );
            })}
            </div>
    </div>
  );
}
