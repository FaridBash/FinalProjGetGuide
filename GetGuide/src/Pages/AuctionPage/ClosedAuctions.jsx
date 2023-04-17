import { useEffect, useState } from "react"
import AuctionComp from "../../Components/auctions/AuctionComp";
import '../Dashboards/GuideDashboard/AvilableAuctions'



export default function ClosedAuctions(){
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
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzM1MGM4ZTZlYTAwYjVkODg5MjRlMiIsImlhdCI6MTY4MTE2MzQyNywiZXhwIjoxNjgzNzU1NDI3fQ.TM_oDYgpQ241OLWFQCGI1CfZDQFTiQHgepKOES1zi4o";
          headers.append("content-type", "application/json");
        if(userRole==='tourist'){
          headers.append("Authorization", `Bearer ${token}`);
      
         response = await fetch("http://localhost:6363/api/Auctions/auction", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
      
          
        }else if(userRole==='guide'){
          response = await fetch("http://localhost:6363/api/Auctions/guide", {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
    
        const result = await response.json();
          console.log('result', result);
          const myResult=result.filter((e)=>{ 
            if( e.auctionIsOpen===false){
                return e.auctionBids.filter((e)=> {return (e.bidderId=== user.id)});
            }
        //    return (userLanguages.includes(e.auctionLanguage) && e.auctionIsOpen===true);
            
          });

          console.log('MYRESULT',myResult);
          // const openRes=myResult.filter(e=> e.auctionIsOpen===true)
          setAuctions(myResult);
          return result;
      }

    return <div id="user-open-auctions">
        <div id='auctions-container'>

        
        {Array.isArray(auctions) && auctions.map((e)=>{
            return <AuctionComp 
            key={e._id}
                tourName={e.auctionTourName}
                Date={e.auctionDate}
                lang={e.auctionLanguage}
                endDate={e.auctionEndDate}
                city={e.auctionCity}
                tourId={e.auctionTourId}
                // putBid={updateHandler}
                auctionId={e._id}
                numOfBids={e.auctionBids.length}
                // style={{color: "red"}}
            />
        })}
        </div>
    </div>
}