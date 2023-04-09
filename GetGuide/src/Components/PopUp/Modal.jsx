import LangSelect from "../Languages/LangSelect";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";

export default function Modal(props) {
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [option, setOption] = useState("");
  const [auction, setAuction] = useState({});
  const desiredPriceInputRef = useRef(null);

  useEffect(() => {
    if (startDate != undefined) {
      fetchAuction(auction);
    }
  }, [auction]);
  if (!props.open) return null;

  const handleChange = (selectedOption) => {
    setOption(selectedOption);
  };

  const openAuctionHandler = () => {
    const aucObj = {};
    aucObj.tourName = props.tourName;
    aucObj.tourId = props.tourId;
    aucObj.language = option.value;
    aucObj.city = props.city;
    aucObj.date = new Date(startDate);
    aucObj.endDate = new Date(endDate);
    aucObj.desiredPrice = desiredPriceInputRef.current.value;
    aucObj.bids=[];
    aucObj.isOpen=true;
    aucObj.userRef='';
    aucObj.wonBy='';
    setAuction(aucObj);
  };

  async function fetchAuction(obj) {
    const response = await fetch(
      "http://localhost:6363/api/tours/Dashboard/Auctions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      }
    );
  }

  return (
    <>
      <div id="overLay" />
      <div id="modal">
        <div id="tour-auction-info">
          <h4>Auction Details</h4>
          <p>
            <b>Tour Name:</b> {props.tourName}.
          </p>
          <div id="modal-lang-div">
            <LangSelect handleChange={handleChange} />
          </div>
          <div id="date-div">
            <p id="date-div-p">
              <b>Date: </b>{" "}
            </p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(new Date(date))}
              id="date-picker"
            />
          </div>
          <div id="date-div">
          <p id="date-div-p">
              <b>End By: </b>{" "}
            </p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(new Date(date))}
              id="date-picker"
            />
          </div>
          <div id="desired-price-holder">
            <input
              type="number"
              id="desired-price"
              min={0}
              placeholder="Desired Price in $"
              ref={desiredPriceInputRef}
              required
            />
          </div>
        </div>
        <div id="modal-btns-div">
          <button
            onClick={() => {
              openAuctionHandler();
              {
                props.onClose();
              }
            }}
          >
            Open Auction
          </button>
          <button onClick={props.onClose}>close</button>
        </div>
      </div>
    </>
  );
}
