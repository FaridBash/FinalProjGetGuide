import { useEffect, useState } from "react";
import AuctionComp from "../../../Components/auctions/AuctionComp";
import "../UserDashBoard/UserOpenAuctions.css";

export default function AvailableAuctions() {
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


  async function updateHandler(itemId, biObj) {
    console.log("object"," ",biObj);
    let updatedbids;
    const myAuc = auctions.find((e) => {
      console.log('myAuc', e.auctionBids);
      if (e._id === itemId) {
        console.log('updatedbids',updatedbids);
        updatedbids=[biObj, ...e.auctionBids];
        return e;
      }
    });

    try {
      fetch(`http://localhost:6363/api/Auctions/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          auctionBids: updatedbids,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("res", data));
    } catch (error) {
      console.log(error);
      
    }
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
                city={e.auctionCity}
                tourId={e.auctionTourId}
                putBid={updateHandler}
                auctionId={e._id}
                numOfBids={e.auctionBids.length}
                />
                );
            })}
            </div>
    </div>
  );
}
