import React, { useEffect, useState } from 'react'
import "./slider.css"
import {BsArrowLeftCircle} from "react-icons/bs"
import {BsArrowRightCircle} from "react-icons/bs"

function ImageSlider({url,limit}) {
const [images,setImages]=useState([])
const [currentIndex,setCurrentIndex]=useState(0)
const [loading,setLoading]=useState(false)
const [error,setError]=useState(null)
async function fetchImages(url){
    try{
    setLoading(true)
    const response =await fetch(`${url}?page=2&limit=${limit}`)
    let data=await response.json()
    if(data){
        setImages(data)
        setLoading(false)
    }
}catch(e){
    setError(e)
}
}
useEffect(()=>{
   
    if(url!=="") fetchImages(url)

},[url])
function handlePrevious(){
    if(currentIndex>=0){
    setCurrentIndex(prev=>prev-1)
    }else{
        setCurrentIndex(images.length-1)
    }
}
function handleNext(){
    if(currentIndex===images.length-1){
        setCurrentIndex(0)
    }else{
    setCurrentIndex(prev=>prev+1)
    }
}

if(loading){
    return <div>Loading Please Wait...</div>
}
if(error!==null){
    return <div>Error Getting Data : {error}</div>

}

  return (
    <div className='wrapper'>
    <BsArrowLeftCircle className='arrow arrow-left' onClick={handlePrevious}></BsArrowLeftCircle>
    {images && images.length>0?
        images.map((image,index)=>{
         return   <img
            key={image.id}
            src={image.download_url}
            className={index===currentIndex?'current-Image':"hide-image"}
            ></img>
        })
        :null}
        <BsArrowRightCircle className='arrow arrow-right' onClick={handleNext}></BsArrowRightCircle>
        <div className='circles'>
    {images && images.length>0?

        images.map((_,index)=>{
          return  <button key={index} onClick={()=>setCurrentIndex(index)}  className={currentIndex==index?'circle-button':"inactive-button"}></button>
        })
      
        :null}
        </div>
    
    </div>
  )
}

export default ImageSlider