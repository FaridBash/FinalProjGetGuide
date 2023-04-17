import { useEffect, useState } from "react";
import AuctionComp from "../../Components/auctions/AuctionComp";



export default function WonAuctions(){

    const [auctions, setAuctions]=useState();
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')));
    const [userToken, setUserToken]=useState(JSON.parse(localStorage.getItem('user')).token);
    const [userRole, setUserRole]=useState(JSON.parse(localStorage.getItem('user')).role);

    useEffect(()=>{
        getAuctions();
    },[])

    async function getAuctions() {
        const headers = new Headers();
        const token =userToken;
        let response;
          headers.append("content-type", "application/json");
          response = await fetch("http://localhost:6363/api/Auctions/guide", {
            headers: {
              "Content-Type": "application/json",
            },
          });
        
    
        const result = await response.json();
          console.log('result', result);
          const myResult=result.filter((e)=>{ 
            if( e.auctionIsOpen===false && e.auctionWonBy === user.name ){
                return true;
            }
            
          });

          console.log('MYRESULT',myResult);
          setAuctions(myResult);
          return result;
      }
    return <div id="user-open-auctions">
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
            />
          );
        })}
    </div>
  </div>
}