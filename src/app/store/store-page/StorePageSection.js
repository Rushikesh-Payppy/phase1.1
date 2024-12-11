'use client';


import StoreCollectionsApi from "@/apis/store/StoreCollectionsApi";
import StoreFooter from "@/Components/StoreFooter";
import StoreImgAndClothsCompo from "@/Components/StoreImgAndClothsCompo";
import StoreNavbar from "@/Components/StoreNavbar";
import Homepage from '@/Images/Homepage/homepage-img.jpg';
import StoreImg2 from '@/Images/Store/store-img-2.jpg';
import StoreImg3 from '@/Images/Store/store-img-3.jpg';
import { useEffect, useState } from "react";





function StorePageSection()
{
    let[collections,setCollections]=useState([]);

    function getCollections()
    {
        StoreCollectionsApi()
        .then((response)=>{
            setCollections(response.collections || []);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getCollections();
    },[])
    return(
        <>
        <section className="w-full h-screen flex justify-center background-custom-grey50 overflow-hidden">
            <div className="page-center-parent-container small-border custom-border-grey600 overflow-y-scroll relative overflow-scrollbar-hidden">
                <StoreNavbar />
                {collections.length>0&&collections.map((element,index)=>{
                    return    <StoreImgAndClothsCompo key={index} imgName={Homepage} catagory={'Discover'} title={element.title} id={element.id}/>
                })

                }
                <StoreImgAndClothsCompo imgName={StoreImg2} catagory={'Discover'} title={'MAGMA'}/>
                <StoreImgAndClothsCompo imgName={StoreImg3} catagory={'Discover'} title={'EthiKz'}/>
                <StoreFooter/>
            </div>
        </section>
        </>
    )
}


export default StorePageSection;