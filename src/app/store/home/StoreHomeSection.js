'use client';
import StoreFooter from '@/Components/StoreFooter';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';


//hero section images
import Homepage from '@/Images/Homepage/homepage-img.jpg';
import PayppyStoreLogo from '@/Images/Store/Payppy-Store-Logo.svg';




//filter section images
import SingleViewFilter from '@/Images/Store/single-view-filter.svg';
import SingleViewActiveFilter from '@/Images/Store/single-view-active-filter.svg';

import MultiViewFilter from '@/Images/Store/multi-view-filter.svg';
import MultiViewActiveFilter from '@/Images/Store/multi-view-active-filter.svg';

import StoreProductsListApi from '@/apis/store/StoreProductsListApi';
// import LoadingAnimation from '@/app/auth/LoadingAnimation';
import ClothsImgInfoCompo from '@/Components/ClothsImgInfoCompo';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/app/auth/LoadingAnimation';



function StoreHomeSection() {

    let [gridColums, setGridColumns] = useState(2);
    let [products, setProducts] = useState([]);

    let [gettingAccessToken, setGettingAccessToken] = useState(true);
    let [accessToken, setAccessToken] = useState('');

    let[productsCount,setProductsCount]=useState(0);
    let[clickedLoadMoreCount,setClickedLoadMore]=useState(1);
    let[loadingAnimation,setLoadingAnimation]=useState(false);

    let router = useRouter();

    useEffect(() => {
        FetchProducts();
    }, [clickedLoadMoreCount])

    //get access token intially
    useEffect(() => {
        getAccessToken();
    }, [])


    let limit = clickedLoadMoreCount*50;
    
    let query = `?limit=${limit}&region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9`;
    function FetchProducts() {
        setLoadingAnimation(true);
        StoreProductsListApi(query)
            .then((response) => {
                console.log(response);
                setProducts(response?.products);
                setProductsCount(response?.count);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
                setLoadingAnimation(false);
            })
           
    }


    function getAccessToken() {
        setGettingAccessToken(true);
        GetAccessTokenAPI()
            .then((response) => {

                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
                setGettingAccessToken(false);
            }
        )
        
    }

    function handleLoadMoreButtonClick(){
            let totalcount=products.length<productsCount;
            
            if(totalcount)
            {
                let totalClickedTime=clickedLoadMoreCount+1;
                
                setClickedLoadMore(totalClickedTime);
            }
    }

    //if click on login/signup button
    function handleLoginSignupClick() {
        router.push('/auth/user-auth');
    }
    return (
        <>
            {gettingAccessToken ?
                <IntialLoadingAnimation />
                : <main className={"page-center-parent-container  relative overflow-scrollbar-hidden"}>
                    <div className="    ">

                        {(!accessToken&&!gettingAccessToken) && <button className="sticky top-0 z-[1] background-custom-green all-caps-12-bold custom-text-grey900 w-full text-center py-4 small-border border-black " onClick={handleLoginSignupClick} >Login/SignuP</button>}


                        {/* hero section  */}
                        <section className="h-[60vh] relative flex justify-center items-start py-8 ">
                            <Image src={Homepage} width={400} height={675} alt='img' quality={100} className='w-full h-full absolute z-0 object-cover top-0 left-0' />
                            <Image src={PayppyStoreLogo} width={290} height={36} alt='img' quality={100} className='z-[1] ' />

                        </section>



                        {/* filter section  */}

                        <section className="py-4 px-5 small-border-x small-border-top  custom-border-grey800 flex justify-end items-cneter  ">
                            {/* <div className="flex items-center gap-5">
                        <button className="all-caps-10 custom-text-grey800">Men</button>
                        <button className="all-caps-10 custom-text-grey800">Women</button>
                        <div className="background-custom-grey700 h-4 w-[0.5px]"></div>
                        <button className="all-caps-10 custom-text-grey800">FILTER</button>
                    </div> */}
                            <div className="flex items-center gap-4 ">
                                <Image src={gridColums == 1 ? SingleViewActiveFilter : SingleViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={() => { setGridColumns(1) }} />
                                <Image src={gridColums === 2 ? MultiViewActiveFilter : MultiViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={() => { setGridColumns(2) }} />
                            </div>
                        </section>


                        {/* grid view section  */}
                        <section className={`grid grid-cols-${gridColums} small-border-bottom small-border-x  custom-border-grey800`}>

                            {products?.length > 0 &&
                                products.map((element, index) => {
                                    return <ClothsImgInfoCompo key={index} borderClass={`  small-border-top ${index % 2 == 0 && gridColums === 2 ? ' small-border-right ' : ' '} `} data={element} />
                                })

                            }

                        </section>
                       {products.length<productsCount&& <div className="flex justify-center items-center px-6 py-10 background-custom-grey50">
                            <button className="py-4 px-8 small-border border-black all-caps-12-bold custom-text-grey900" onClick={handleLoadMoreButtonClick} disabled={loadingAnimation}>{loadingAnimation?<LoadingAnimation/>:'Load More'}</button>
                        </div>}



                    </div>
                        <StoreFooter />
                </main>}
        </>
    )
}

export default StoreHomeSection;
