'use client';
import Image from 'next/image';
import ClothsHorizontalCarousel from './ClothsHorizontalCarousel';
import { useEffect, useState } from 'react';
import StoreProductsListApi from '@/apis/store/StoreProductsListApi';

function StoreImgAndClothsCompo({imgName,catagory,title,id})
{
    let[products,setProducts]=useState([]);

    function getProductsOfCollection()
    {
        let query=`?collection_id=${id}`;

        StoreProductsListApi(query)
        .then((response)=>{
            setProducts(response?.products || []);
        })
        .catch((error)=>{
            console.log(error);
            return error;
        })
    }

    useEffect(()=>{
        getProductsOfCollection();
    },[])
    return(
        <>
        <div className="">
            <div className="h-[60vh] relative flex justify-center items-center">
                <Image src={imgName} width={400} height={675} alt='img' quality={100} className='w-full h-full absolute z-0 object-cover top-0 left-0' />
                <div className="flex flex-col gap-2 items-center relative z-1">
                    <div className="all-caps-10 custom-text-white">{catagory}</div>
                    <div className="all-caps-14-bold custom-text-white">{title}</div>
                </div>
            </div>
            <div className=" flex overflow-x-scroll overflow-scrollbar-hidden ">
                {products.length>0?products.map((element,index)=>{
                    return <ClothsHorizontalCarousel containerWidth={'  '}  title={element.title} img={element.images[0]} key={index}/>
                })
                :
                //this conditional rendering is for development purpose (in production mode only above return statement code will be use)
                <>  
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                <ClothsHorizontalCarousel containerWidth={'  '}/>
                </>
                }
                

            </div>


        </div>
        </>
    )
}

export default StoreImgAndClothsCompo;