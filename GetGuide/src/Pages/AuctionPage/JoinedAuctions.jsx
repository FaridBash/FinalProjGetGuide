import { useEffect, useState } from "react";
import AuctionComp from "../../Components/auctions/AuctionComp";
import "../Dashboards/GuideDashboard/AvilableAuctions";

export default function JoinedAuctions() {
  const [auctions, setAuctions] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userToken, setUserToken] = useState(
    JSON.parse(localStorage.getItem("user")).token
  );
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem("user")).role
  );

  useEffect(() => {
    getAuctions();
  }, []);

  async function getAuctions() {
    const headers = new Headers();
    const token = userToken;
    let response;
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzM1MGM4ZTZlYTAwYjVkODg5MjRlMiIsImlhdCI6MTY4MTE2MzQyNywiZXhwIjoxNjgzNzU1NDI3fQ.TM_oDYgpQ241OLWFQCGI1CfZDQFTiQHgepKOES1zi4o";
    headers.append("content-type", "application/json");
    if (userRole === "tourist") {
      headers.append("Authorization", `Bearer ${token}`);

      response = await fetch("http://localhost:6363/api/Auctions/auction", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else if (userRole === "guide") {
      response = await fetch("http://localhost:6363/api/Auctions/guide", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const result = await response.json();
    console.log("result", result);
    const myResult = result.filter((e) => {
      if (e.auctionIsOpen !== false) {
        return true;
      }
    });
    console.log("MYRESULT", myResult);

    const finalRes = new Set();
    let filteredRes;
    for (let i = 0; i < myResult.length; i++) {
      const e = myResult[i];
      console.log("e from for", e);
    
      console.log("filteredRes", filteredRes);
      for (let j = 0; j < e.auctionBids.length; j++) {
        const element = e.auctionBids[j];
        if (element.bidderId === user._id) {
          finalRes.add(e);
          console.log(finalRes);
        }
      }
    }
    
    // Convert the Set back to an array if necessary
    const finalResArray = Array.from(finalRes);

    setAuctions(finalResArray);
    return result;
  }

  return (
    <div id="user-open-auctions">
      <div id="auctions-container">
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
                auctionId={e._id}
                numOfBids={e.auctionBids.length}
                isOpen={e.auctionIsOpen}
                winner={e.auctionWonBy}
              />
            );
          })}
      </div>
    </div>
  );
}
