'use client';
export const dynamic = 'force-dynamic';

import Image from "next/image";
//header images
import Plus from '@/Images/Store/plus.svg';

import { Plus_Jakarta_Sans } from "next/font/google";

//single product images
import InStock from '@/Images/Store/instock-green-circle.svg';
import DeliveryTruck from '@/Images/Store/availability.svg';




//product images
import Minus from '@/Images/Store/minus.svg';
import { useEffect, useRef, useState } from "react";

//offers images
import YesBank from '@/Images/Store/yes-bank.svg';

//feature images
import StoreShopPepoinNavbar from "@/Components/StoreShopPepoinNavbar";
import { useRouter, useSearchParams } from "next/navigation";
import StoreProductsListApi from "@/apis/store/StoreProductsListApi";
import StoreGetProductsExcludingOne from "@/apis/store/StoreGetProductsExcludingOne";
import ClothsImgInfoCompo from "@/Components/ClothsImgInfoCompo";
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import IntialLoadingAnimation from "@/Components/InitialPageLoadingAnimation";
import GetCartInfoApi from "@/apis/store/GetCartInfoApi";
import AddToCartApi from "../../../apis/store/AddToCartApi";
import CreateCartApi from "../../../apis/store/CreateCartApi";
import AddCartInDatabaseApi from "../../../apis/store/AddCartInDatabaseApi";
import Link from "next/link";



const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap'
})
function ProductSection() {
    let [firstSelectSizeBtnSivible, setFirstSelectSizeBtnVisible] = useState(true);
    let [productId, setProductId] = useState('');

    let [ProductShoppingInfoVisibilityIndex, setProductShoppingInfoVisibilityIndex] = useState(-1);


    let [product, setProduct] = useState({});
    let [remainingProducts, setRemainingProducts] = useState([]);

    let parentContainer = useRef();

    //to select a size of product like XL 
    let [selectedSize, setSelectedSize] = useState('');
    let [isSizeSelected, setIsSizeSelected] = useState(false);

    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);

    let [cartid, setCartId] = useState('');

    let params = useSearchParams();

    let router = useRouter();

    useEffect(() => {
        let productid = params?.get('product');
        if (productid) {
            setProductId(productid);
        }
    }, [params])

    //fetch api
    useEffect(() => {
        if (productId) {
            FetchProducts();
        }
    }, [productId])


    useEffect(() => {
        function handleFirstSelectSizeBtnVisibility() {
            setFirstSelectSizeBtnVisible(parentContainer.current.scrollTop < 20)

        }
        if (parentContainer.current) {
            parentContainer.current.addEventListener('scroll', handleFirstSelectSizeBtnVisibility);
        }

        return () => parentContainer.current?.removeEventListener('scroll', handleFirstSelectSizeBtnVisibility);
    }, [parentContainer.current])

    //to get a access token
    useEffect(() => {
        getAccessToken();
    }, [])

    useEffect(() => {
        if (accessToken) {
            getCartInfo();
        }
    }, [accessToken])


    //fetch product
    function FetchProducts() {
        let query = `/${productId}?region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9`;
        StoreProductsListApi(query)
            .then((response) => {
                // console.log(response);
                setProduct(response.product);
                // setThumbnailImage(getValidImgUrl(product?.thumbnail));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally()
        {
            FetchRemainingProducts();
        }
    }

    //fetch all products excluding one
    function FetchRemainingProducts() {
        let query = `/?region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9&limit=8`;

        StoreGetProductsExcludingOne(query, productId)
            .then((response) => {
                setRemainingProducts(response);
            })
            .catch((error) => {
                console.log(error);

            })
    }

    // function getValidImgUrl(imgsrc)
    // {
    //     let replacedUrl=imgsrc;
    //     if(imgsrc?.includes('http://localhost:9000'))
    //     {
    //         replacedUrl=imgsrc.replace('http://localhost:9000','https://medusa.payppy.app');
    //     }
    //     return replacedUrl;
    // }

    //for toggling product information visibility like accordion
    function handleProductInfoClick(index) {
        if (index === ProductShoppingInfoVisibilityIndex) {
            setProductShoppingInfoVisibilityIndex(-1);
            return;
        }
        setProductShoppingInfoVisibilityIndex(index)
    }



    //to select size of product i.e. varient id
    function handleSizeSelect(value) {
        setSelectedSize(value);
        setIsSizeSelected(value === '');
    }

    //handle add to cart
    function handleAddToCart() {
        setIsSizeSelected(selectedSize === '');

        if (selectedSize === '') {
            return;
        }
        if (accessToken === '') {
            router.push('/auth/user-auth');
        }

        let obj = {
            "variant_id": selectedSize,
            "quantity": 1
        }
        AddToCartApi(obj, cartid)
            .then((response) => {
                console.log('add to cart ', response);
                if (response && 'cart' in response) {
                    router.push('/store/shopping-bag');
                }
            })
            .catch((error) => {
                console.log(error);

            })


    }


    //getting access token
    function getAccessToken() {
        GetAccessTokenAPI()
            .then((response) => {
                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }

                // if(response&&'message' in response&&response.message==='Refresh token is missing')
                // {
                //     router.push('/auth/')
                // }
            })
            .catch(() => {

            })
            .finally()
        {
            setGettingAccessToken(false);
        }
    }

    //get cart information from api
    function getCartInfo() {
        GetCartInfoApi(accessToken)
            .then((response) => {
                console.log('response');

                if (response && 'cart_id' in response) {
                    if (!response.cart_id) {
                        let obj = {
                            "email": response?.email
                        }
                        // No cart_id found, create a new cart
                        CreateCartApi(obj)
                            .then((response) => {
                                if (response) {
                                    setCartId(response?.cart?.id);

                                    if ('cart' in response) {
                                        let payloadObj = {
                                            "cartid": response.cart.id
                                        }
                                        AddCartInDatabaseApi(payloadObj, accessToken)
                                            .then(() => {

                                            })
                                            .catch((error) => {
                                                console.log(error);

                                            })
                                    }
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    }
                    else {
                        setCartId(response.cart_id);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            {gettingAccessToken ? <IntialLoadingAnimation />
                :
                <section className="page-center-parent-container  overflow-scrollbar-hidden   ">
                    <div className="small-border-x border-black  " ref={parentContainer}>

                            <StoreShopPepoinNavbar share={true} store={true} pepcoin={true} accessToken={accessToken}/>
                        <div className="   ">


                            {product?.thumbnail && <Image src={product?.thumbnail} width={390} height={620} alt="img" quality={100} className="w-full h-auto object-cover " />}

                        </div>

                        {/* <div className=""> */}


                            {/* product price  */}
                            <div className="flex justify-between gap-2 p-4 pt-5   ">

                                <div className="flex flex-col gap-2.5">
                                    <div className="all-caps-12 custom-text-grey900">{product?.title}</div>
                                    <div className="flex gap-2 5 items-center">
                                        <div className="all-caps-10 custom-text-grey600">by {product?.collection?.title}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <div className="all-caps-12 custom-text-grey800">₹{product?.variants?.[0]?.calculated_price?.calculated_amount}</div>
                                    <div className="body-xs custom-text-grey500 ">MRP incl. of all taxes</div>
                                </div>

                            </div>

                            {/* { <button className={`background-custom-grey900 all-caps-12-bold custom-text-white  w-full text-center duration-200 ${firstSelectSizeBtnSivible?' py-4 px-7 max-h-60 h-fit overflow-auto ':' max-h-0 h-0 overflow-hidden '} `}>Select Size</button>} */}



                            {/* product size  */}
                            <div className="p-4 pb-6 flex flex-col gap-2.5  ">
                                <div className="flex justify-between items-center gap-2">
                                    <div className="all-caps-10 custom-text-grey800">Select Size</div>
                                    {isSizeSelected && <div className="all-caps-10 custom-text-alert">please select size</div>}
                                </div>
                                <div className="flex overflow-scroll overflow-scrollbar-hidden scroll-smooth">
                                    {product?.variants?.map((element, index) => {
                                        return <div key={index} className={`flex justify-center items-center p-3 w-16 h-16 small-border body-sm  custom-text-grey900 cursor-pointer ${selectedSize === element.id ? '  border-black font-bold ' : ' custom-border-grey400 '}`} onClick={() => { handleSizeSelect(element.id) }}>{element.options[0]?.value}</div>
                                    })

                                    }
                                </div>

                            </div>

                            {/* select size button */}
                            <div className="flex flex-col p-4 pb-6 gap-1.5  ">
                                <div className="flex justify-between items-center px-[5px]">
                                    <div className="flex items-center gap-1">
                                        <Image src={DeliveryTruck} width={16} height={16} alt="img" quality={100} className="" />
                                        <div className="all-caps-10 custom-text-grey600">Delivery in 3-7 days</div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Image src={InStock} width={16} height={16} alt="img" quality={100} className="" />
                                        <div className="all-caps-10 custom-text-grey600">IN STOCK</div>
                                    </div>
                                </div>
                                <button className="background-custom-grey900 all-caps-12-bold custom-text-white py-4 px-7 w-full text-center" onClick={handleAddToCart}>Add to cart</button>

                            </div>


                            {/* product details , offers and shipping , exchanges & returns info  */}
                            <div className="flex flex-col p-6 pb-6 gap-1.5 small-border-y border-gray-300 ">

                                {/* product details */}
                                <div className="flex flex-col gap-2 ">
                                    <div className="flex justify-between cursor-pointer" onClick={() => { handleProductInfoClick(0) }}>
                                        <div className="all-caps-10-bold custom-text-grey800">product Details</div>
                                        {/* <Image src={Plus} width={24} height={24} alt="img" quality={100} className="" /> */}
                                        <Image src={ProductShoppingInfoVisibilityIndex === 0 ? Plus : Minus} width={24} height={24} alt="img" quality={100} className="" />
                                    </div>
                                    <div className={`flex flex-col gap-5 duration-500 ${ProductShoppingInfoVisibilityIndex == 0 ? ' max-h-[900px] pr-6 pb-2 h-fit overflow-auto ' : ' max-h-0 h-0 overflow-hidden '}`}>
                                        <div className="body-sm custom-text-grey700">Introducing Cyberpunk, a collaboration story between two British heritage luxury brands. The collection encapsulates the best of contemporary and heritage styling, a collaboration story between </div>
                                        <div className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                                            <div className="flex flex-col gap-1 py-3 small-border-top custom-border-grey400">
                                                <div className="all-caps-10 custom-text-grey600">Type</div>
                                                <div className="body-bold custom-text-grey900">Jacket</div>
                                            </div>
                                            <div className="flex flex-col gap-1 py-3 small-border-top custom-border-grey400">
                                                <div className="all-caps-10 custom-text-grey600">color</div>
                                                <div className="body-bold custom-text-grey900">Red</div>
                                            </div>
                                            <div className="flex flex-col gap-1 py-3 small-border-top custom-border-grey400">
                                                <div className="all-caps-10 custom-text-grey600">Type</div>
                                                <div className="body-bold custom-text-grey900">Jacket</div>
                                            </div>
                                            <div className="flex flex-col gap-1 py-3 small-border-top custom-border-grey400">
                                                <div className="all-caps-10 custom-text-grey600">color</div>
                                                <div className="body-bold custom-text-grey900">Red</div>
                                            </div>
                                            <div className="flex flex-col gap-1 py-3 small-border-top custom-border-grey400">
                                                <div className="all-caps-10 custom-text-grey600">Type</div>
                                                <div className="body-bold custom-text-grey900">Jacket</div>
                                            </div>
                                            <div className="flex flex-col gap-1 py-3 smal-border-top custom-border-grey400">
                                                <div className="all-caps-10 custom-text-grey600">color</div>
                                                <div className="body-bold custom-text-grey900">Red</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping, exchanges & returns details */}
                                <div className="flex flex-col gap-3 ">
                                    <div className="flex justify-between" onClick={() => { handleProductInfoClick(2) }}>
                                        <div className="all-caps-10-bold custom-text-grey800">Shipping, exchanges & returns</div>
                                        {/* <Image src={Plus} width={24} height={24} alt="img" quality={100} className="" /> */}
                                        <Image src={ProductShoppingInfoVisibilityIndex === 2 ? Plus : Minus} width={24} height={24} alt="img" quality={100} className="" />
                                    </div>
                                    <div className={`text-xs body-sm custom-text-grey900 ${ProductShoppingInfoVisibilityIndex == 2 ? ' max-h-[900px] pb-2 h-fit overflow-auto ' : ' max-h-0 h-0 overflow-hidden '} `}>
                                        <div className="text-xs body-sm font-bold">Shipping:</div>
                                        <ul className="list-disc body-sm   pl-4 mt-2">
                                            <li className="body-sm custom-text-grey900">FREE Shipping</li>
                                            <li className="body-sm custom-text-grey900">We do not offer COD or Exchanges right now.</li>
                                        </ul>
                                        <br />

                                        <div className="text-xs body-sm font-bold">Returns:</div>
                                        <ul className="list-disc body-sm  pl-4 mt-2">
                                            <li className="body-sm custom-text-grey900">3-day hassle-free returns after delivery.</li>
                                            <li className="body-sm custom-text-grey900">Return will ONLY be provided in case there is a defect in the product or a wrong product is delivered by mistake.</li>
                                            <li className="body-sm custom-text-grey900">If there are any signs of wear, return will NOT be accepted. Labels must be kept attached to the product.</li>
                                            <li className="body-sm custom-text-grey900">A fee of ₹130 will be applied on the return of sale items.</li>
                                            <li className="body-sm custom-text-grey900">If your PIN is not serviceable for reverse pickup, you must ship the product to us.</li>
                                            <li className="body-sm custom-text-grey900">Returns of items below will ₹999 will incur a charge of ₹130.</li>
                                            <li className="body-sm custom-text-grey900">If you receive a damaged product, find items missing from your order, or have received a delivery status notification without receiving the package, please contact us via email at <strong>upport@payppy.co</strong>s or phone at <strong>+91 9022558944</strong> within 24 hours of delivery.</li>
                                        </ul>
                                        <br />
                                        <div className="custom-text-grey900">For more details, please check our <Link href={'/my-account/legal-policies-and-more/shipping-return-refund'} className=" underline">shipping, return & refund policy here.</Link></div>
                                    </div>
                                </div>
                            </div>
                            {/* More from collection  */}
                            {/* <div className="flex flex-col gap-4 pt-10 ">
                                    <div className="custom-text-grey800 all-caps-12 px-4">You might also like</div>
                                    <div className="grid grid-cols-2 small-border-y custom-border-grey800">
                                        {remainingProducts.length>0&&remainingProducts.map((element,index)=>{
                                            return <ClothsImgInfoCompo key={index} borderClass={`small-border-bottom ${index%2===0?' small-border-right ':''}`} data={element}/>

                                        })

                                        }
                                    </div>

                                </div> */}
                        {/* </div> */}
                    </div>
                </section>

            }
        </>
    )
}

export default ProductSection;