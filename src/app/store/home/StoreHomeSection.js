'use client';
import StoreFooter from '@/Components/StoreFooter';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';


//hero section images
// import Homepage from '@/Images/Homepage/homepage-img.jpg';
import Hero1 from '@/Images/Store/hero-image-1.jpg';
import Hero2 from '@/Images/Store/hero-image-2.jpg';
import Hero3 from '@/Images/Store/hero-image-3.jpg';

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
import StorePulseEffectComponent from '@/Components/StorePulseEffectComponent';
import { useSearchParams } from 'next/navigation';



function StoreHomeSection() {

    let [gridColums, setGridColumns] = useState(2);
    let [products, setProducts] = useState([]);

    let [gettingAccessToken, setGettingAccessToken] = useState(true);
    let [accessToken, setAccessToken] = useState('');

    let[productsCount,setProductsCount]=useState(0);
    let[clickedLoadMoreCount,setClickedLoadMore]=useState(1);
    let[loadingAnimation,setLoadingAnimation]=useState(false);
    let[currentFilterId,setCurrentFilterId]=useState('');
    let[selectedCatagory,setSelectedCatagory]=useState('');

    let router = useRouter();
    
    const carouselRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

  let params=useSearchParams();

  let filterCatagories={
    'men':'pcat_01JE90TZWNW2N8SKKXYCKN711A',
    'women':'pcat_01JF1SPYGN7HQKZA0YK9K2Z4BW',
    'accessories':'pcat_01JFF47JZMV8QXD30HPQSXB4E4'
}
  
    const handleScroll = () => {
        if (carouselRef.current) {
            const scrollLeft = carouselRef.current.scrollLeft;
            const itemWidth = carouselRef.current.offsetWidth;
            const index = Math.round(scrollLeft / itemWidth); // Calculate the active index
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        FetchProducts();
    }, [clickedLoadMoreCount,selectedCatagory])

    //get access token intially
    useEffect(() => {
        getAccessToken();
    }, [])

    useEffect(()=>{
        let queryFilter=params.get('catagory');
        if(queryFilter)
        {
            setSelectedCatagory(queryFilter);
            setCurrentFilterId(filterCatagories[queryFilter]);
        }
        else{
            setCurrentFilterId('');
            setSelectedCatagory('');
        }
    },[params])

   
    function handleProductCatagory(catagory)
    {
        if(params.get('catagory')===catagory)
        {
            router.push('/');
        }
        else{
            router.push('/?catagory='+catagory);
        }
    }
    // function shuffleArray(array) {
    //     for (let i = array.length - 1; i > 0; i--) {
    //       // Generate a random index
    //       const j = Math.floor(Math.random() * (i + 1));
    //       // Swap elements at indices i and j
    //       [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array;
    //   }

    let limit = clickedLoadMoreCount*50;
    
    let query = (selectedCatagory!=='')? `?limit=${limit}&&region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9&fields=*variants.calculated_price&category_id=${currentFilterId}`:`?limit=${limit}&region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9&order=-id`;
    // let query = `?limit=${limit}&&region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9&fields=*variants.calculated_price&category_id=pcat_01JFF49WBG2MMV3W8SJ5VV2RKG`;
    function FetchProducts() {
        setLoadingAnimation(true);
        setProducts('');
        setProductsCount('');
        StoreProductsListApi(query)
            .then((response) => {
                // console.log(response);
                setTimeout(() => {      
                    setProducts(response?.products);
                    setProductsCount(response?.count);
                }, 500);
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

                        {(!accessToken&&!gettingAccessToken) && <button className="sticky top-0 z-[2] background-custom-green all-caps-12-bold custom-text-grey900 w-full text-center py-4 small-border border-black " onClick={handleLoginSignupClick} >Login/SignuP</button>}


                        {/* hero section  */}
                        <section className="h-[60vh] relative flex justify-center items-start py-8 overflow-hidden">
                            <div className="flex overflow-x-auto  overflow-scrollbar-hidden w-full h-full absolute z-0  top-0 left-0 snap-x-custom " ref={carouselRef} onScroll={handleScroll}>
                                <Image src={Hero1} width={400} height={675} alt='img' quality={100} className='w-full h-full  object-cover flex-shrink-0 snap-start-custom' />
                                <Image src={Hero2} width={400} height={675} alt='img' quality={100} className='w-full h-full  object-cover flex-shrink-0 snap-start-custom' />
                                <Image src={Hero3} width={400} height={675} alt='img' quality={100} className='w-full h-full  object-cover flex-shrink-0 snap-start-custom' />
                            </div>
                            {/* Dots */}
                            <div className="absolute bottom-4 flex space-x-2 z-10">
                                {Array(3).fill(null).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${activeIndex === index ? 'bg-black' : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <Image src={PayppyStoreLogo} width={290} height={36} alt='img' quality={100} className='z-[1] ' />

                        </section>



                        {/* filter section  */}

                        <section className="py-4 px-5 small-border-x small-border-top  custom-border-grey800 flex justify-between items-cneter  ">
                            <div className="flex items-center gap-5">
                                <button className={`custom-text-grey800 ${selectedCatagory==='men'?' all-caps-10-bold':' all-caps-10 '}`}  onClick={()=>{handleProductCatagory('men')}}>Men</button>
                                <button className={`${selectedCatagory==='women'?' all-caps-10-bold':' all-caps-10 '} custom-text-grey800`} onClick={()=>{handleProductCatagory('women')}}>Women</button>
                                {/* <div className="background-custom-grey700 h-4 w-[0.5px]"></div> */}
                                <button className={`${selectedCatagory==='accessories'?' all-caps-10-bold':' all-caps-10 '} custom-text-grey800`} onClick={()=>{handleProductCatagory('accessories')}}>Accessories</button>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <Image src={gridColums == 1 ? SingleViewActiveFilter : SingleViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={() => { setGridColumns(1) }} />
                                <Image src={gridColums === 2 ? MultiViewActiveFilter : MultiViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={() => { setGridColumns(2) }} />
                            </div>
                        </section>


                        {/* grid view section  */}
                        <section className={`grid grid-cols-${gridColums} small-border-bottom small-border-x  custom-border-grey800`}>

                            {products?.length > 0 ?
                                products?.map((element, index) => {
                                    return <ClothsImgInfoCompo key={index} borderClass={`  small-border-top ${index % 2 == 0 && gridColums === 2 ? ' small-border-right ' : ' '} `} data={element} />
                                })
                                :
                                Array(10).fill(null).map((element,index)=>{
                                    return <StorePulseEffectComponent key={index}/>
                                })

                            }

                        </section>
                       {products?.length<productsCount&& <div className="flex justify-center items-center px-6 py-10 background-custom-grey50">
                            <button className="py-4 px-8 small-border border-black all-caps-12-bold custom-text-grey900" onClick={handleLoadMoreButtonClick} disabled={loadingAnimation}>{loadingAnimation?<LoadingAnimation/>:'Load More'}</button>
                        </div>}



                    </div>
                        <StoreFooter />
                </main>}
        </>
    )
}

export default StoreHomeSection;
