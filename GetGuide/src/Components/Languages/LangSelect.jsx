import { useState } from "react";
import Select from 'react-select';
import './LangSelect.css'

export default function LangSelect({handleChange}){
    const options=[
        {value: "English", label:"English"},
        {value: "French", label:"French"},
        {value: "Spanish", label:"Spanish"},
        {value: "German", label:"German"},
    ];
    
  

    return <Select options={options} onChange={handleChange} placeholder="Select Language" id="select-lang"/>

}