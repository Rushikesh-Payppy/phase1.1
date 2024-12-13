'use client';

import Image from 'next/image';

//section images
import CloseIcon from '@/Images/Store/close-icon.svg';
import UserIcon from '@/Images/Checkout/user-circle.svg';
import Location from '@/Images/Checkout/location.svg';
import EditIcon from '@/Images/Checkout/edit-icon.svg';
import Offer from '@/Images/Checkout/Offer.svg';
import Arrow from '@/Images/Checkout/chevron-icon.svg';
import Availability from '@/Images/Checkout/Availability.svg';

//order details
import Subtract from '@/Images/Checkout/Subtract.svg';


//bottom checkout images
import Store from '@/Images/Homepage/store-icon.svg';
import Razorpay from '@/Images/Store/razorpay-logo.svg';
import CheckIcon from '@/Images/Store/check-icon.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ManageAddress from '../../../Components/ManageAddressModal';

import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import GetCartItemsApi from '@/apis/store/GetCartItemsApi';
import { useRouter } from 'next/navigation';
import GetAddressApi from '../../../apis/store/GetAddressApi';
import CreatePaymentCollectionApi from '@/apis/store/CreatePaymentCollectionApi';
import GetPaymentProviderList from '@/apis/store/GetPaymentProviderList';
import IntiatePaymentApi from '@/apis/store/IntiatePaymentApi';
import GenerateOrderIdApi from '@/apis/store/GenerateOrderIdApi';



function CheckoutSection() {

    let[showModal,setShowModal]=useState(false);
    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    let[cartInfo,setCartInfo]=useState('');

    let[showDetails,setShowDetails]=useState(false);


    let[cartItems,setCartItems]=useState([]);
    // let[notEligibleForCheckout,setNotEligibleForCheckout]=useState(true);
    let[selectedTerms,setSelectedTerms]=useState('');
    let[userAddress,setUserAddress]=useState('');


    let [paymentCollection, setPaymentCollection] = useState(null); 
    let[paymentProviderList,setPaymentProvidersList]=useState([]);
    let[invalidAddress,setInvalidAddress]=useState(false);


    let router=useRouter();
     //to get a access token
     useEffect(()=>{
        getAccessToken();
        getPaymentProviderList();
    },[])
    useEffect(()=>{
        if(accessToken)
        {
            getAddress();
        }
    },[accessToken])

    useEffect(()=>{
        if(accessToken)
        {
            getCartInfo();
        }
    },[accessToken])

    useEffect(()=>{
        if(cartInfo)
        {
            getCartItems();
            CreatePaymentCollection();
        }
    },[cartInfo])
    useEffect(()=>{
        if(cartInfo)
        {
            CreatePaymentCollection();
        }
    },[cartInfo])

    useEffect(()=>{
        if(paymentCollection)
        {
            IntiatePaymentSession();
        }
    },[paymentCollection])

     //getting access token
     function getAccessToken()
     {
         GetAccessTokenAPI()
         .then((response)=>{
             console.log(response);
             if(response&&'message' in response&&response.message==='Refresh token is missing!')
             {
                //  window.location.href='/';
             }
             if(response&&'access_token' in response)
             {
                 setAccessToken(response.access_token);
             }
             
         })
         .catch(()=>{
 
         })
         .finally()
         {
             setGettingAccessToken(false);
         }
     }
 
     //get cart information from api
     function getCartInfo()
     {
         GetCartInfoApi(accessToken)
         .then((response)=>{
             console.log('response');
 
             if(response&&'cart_id' in response)
             {
                 setCartInfo(response);
             }
         })
         .catch((error)=>{
             console.log(error);
         })
     }

     //get cart items
     function getCartItems()
     {
        GetCartItemsApi(cartInfo.cart_id)
        .then((response)=>{
            // console.log(response);
            setCartItems(response.cart);

        })
        .catch((error)=>{
            console.log(error);
        })
     }

     //create payment collection
     function CreatePaymentCollection()
     {
         // Fetch the data when the component mounts
         let obj={
            "cart_id": cartInfo.cart_id

         }
            CreatePaymentCollectionApi(obj)
            .then((response) => {
            if (response && response?.payment_collection) {
                setPaymentCollection(response?.payment_collection); // Store the payment collection in state
            } 
            })
            .catch((err) => {
                console.error("Error fetching payment collection:", err);
            });
     }

      //get payment provider list
      function getPaymentProviderList()
      {
          // Fetch the data when the component mounts
         
             GetPaymentProviderList()
             .then((response) => {
                if(response&&'payment_providers' in response)
                {
                    setPaymentProvidersList(response.payment_providers);
                }
             })
             .catch((err) => {
                 console.error("Error fetching payment collection:", err);
             });
      }

         //create payment collection
     function IntiatePaymentSession()
     {
         // Fetch the data when the component mounts
         let obj={
            "provider_id": "pp_razorpay_razorpay"

         }
         
         IntiatePaymentApi(obj,paymentCollection?.id)
            .then((response) => {
                console.log(response);
                
            })
            .catch((err) => {
                console.error("Error fetching payment collection:", err);
            });
     }

     function getAddress()
     {
        GetAddressApi(accessToken)
        .then((response)=>{
            if(response&&'response' in response&&response?.response&&'addresses' in response?.response)
            {
                    setUserAddress(response?.response?.addresses);
                    setInvalidAddress( response?.response?.addresses[0]?.address_1);

            }
        })
     }

     function handleProceedToPay()
     {
        setInvalidAddress( !userAddress[0]?.address_1);
        if(!userAddress[0]?.address_1)
        {
            return;
        }

        GenerateOrderIdApi(paymentCollection.id)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
     }

    function handleAddressClick()
    {
        setShowModal(!showModal);
    }
    function handleBackClick()
    {
        router.back();
    }
    return (
        <>
            <section className={"flex justify-center min-h-screen w-full background-custom-grey50    "}>
                <div className="page-center-parent-container  small-border background-custom-grey100  overflow-scrollbar-hidden relative">


                    {/* navbar  */}
                    <div className="flex items-center justify-between py-3.5 px-4 background-custom-white">
                        <button onClick={handleBackClick}>
                            <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                        </button>
                        <h4 className="heading-h4 custom-text-grey900">Review & Pay</h4>
                    </div>


                    {/* contatct details */}
                    <div className="background-custom-white py-7 px-6 flex gap-2 justify-start items-start small-border-top custom-border-grey800">
                        <Image src={UserIcon} width={20} height={20} alt="img" quality={100} className="" />
                        <div className="flex flex-col gap-2 ">
                            <div className="all-caps-12 custom-text-grey900">Contact Details</div>
                            <div className="flex flex-col gap-1">
                                <div className="body-sm-bold custom-text-grey900">{cartInfo?.details_data?.first_name + " "+cartInfo?.details_data?.last_name}</div>
                                <div className="flex items-center gap-2">
                                    <div className="body-sm-bold custom-text-grey900"> {cartInfo?.details_data?.phone_number}</div>
                                    <div className=" w-[0.5px] h-[18px] background-custom-grey900"></div>
                                    <div className="body-sm-bold custom-text-grey900">{cartInfo?.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping details */}
                   {userAddress?.length<1? <button className="background-custom-white w-full py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800" onClick={handleAddressClick}>
                        <div className="flex items-center gap-2 ">
                            <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="all-caps-12 custom-text-grey900">Add Address</div>
                        </div>
                        <Image src={Arrow} width={20} height={20} alt="img" quality={100} className="" />
                    </button>
                  :  <div className="background-custom-white py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        
                        <div className="flex gap-2  items-start">
                        <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                        <div className="flex flex-col gap-2 ">
                            <div className="all-caps-12 custom-text-grey900">Shipping to</div>
                            <div className="flex flex-col gap-1">
                                <div className="body-sm-bold custom-text-grey900">{cartInfo?.details_data?.first_name + " "+cartInfo?.details_data?.last_name}</div>
                                    <div className="body-sm-bold custom-text-grey900">{userAddress[0]?.address_1}
                                    <br />{userAddress[0]?.city}, {userAddress[0]?.province}, {userAddress[0]?.postal_code}</div>
                                </div>
                            </div>
                        </div>
                        <button onClick={()=>{setShowModal(true)}}>
                            <Image src={EditIcon} width={20} height={20} alt="img" quality={100}  />
                        </button>
                    </div>
}
                    {/* Apply coupon code details */}
                    {/* <button className="background-custom-white w-full py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        <div className="flex items-center gap-2 ">
                            <Image src={Offer} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="all-caps-12 custom-text-grey900">Apply coupon code</div>
                        </div>
                        <Image src={Arrow} width={20} height={20} alt="img" quality={100} className="" />
                    </button> */}

                    {/* Delivery details */}
                    <div className="background-custom-white py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        <div className="flex items-center gap-2 ">
                            <Image src={Availability} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="body-sm-bold custom-text-grey900">Expected Delivery:  3-5 Days</div>
                        </div>
                    </div>


                    <div className="px-6 pt-8 background-custom-grey100 relative ">
                        <Image src={Subtract} width={524} height={29} alt="img" quality={100} className="w-full object-cover absolute left-0 -top-2 z-[1]" />


                        <div className="flex flex-col gap-4  ">
                            <button className="py-[5px] px-2 flex items-center gap-1 ">
                                <Image src={Store} width={20} height={20} alt="img" quality={100} className="" />
                                <div className="all-caps-12 custom-text-grey900">Order Summary</div>
                            </button>
                            <div className="flex flex-col gap-2 py-4 ">
                                <div className="flex justify-between">
                                    <div className="all-caps-10 custom-text-grey900">Subtotal:</div>
                                    <div className="all-caps-12-bold custom-text-grey800">₹{cartItems?.total}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="all-caps-10 custom-text-grey900">Shipping:</div>
                                    <div className="all-caps-10-bold custom-text-grey900">FREE</div>
                                </div>
                            </div>


                            <div className="">
                                <div className="custom-text-grey900 small-border custom-border-grey800 border-dashed  "></div>
                            </div>

                            <div className="flex justify-between  ">
                                <div className="all-caps-12 custom-text-grey900">Total</div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <div className="flex items-center ">
                                        <div className="all-caps-12-bold custom-text-grey800">₹{cartItems?.total}</div>
                                    </div>
                                    <div className="all-caps-10 custom-text-grey900">GST INCLUDED</div>
                                </div>
                            </div>



                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                    <div className="w-4 h-4 small-border custom-border-grey800 bg-black relative cursor-pointer" onClick={()=>{setSelectedTerms(!selectedTerms)}}>
                                       {selectedTerms&& <Image src={CheckIcon} width={12} height={12} alt="img" quality={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 brightness-[100]" />}
                                    </div>
                                    <div className="body-sm custom-text-grey900"> I have read and agree to the website <Link href={'/my-account/legal-policies-and-more/terms-of-use'} className='font-semibold '>terms and conditions *</Link></div>
                                </div>
                                {invalidAddress&&<span className="body-sm text-red-600">Please Enter Valid Address</span>}
                                <button className={`text-center all-caps-12-bold  custom-text-white px-5 py-4 ${!selectedTerms || cartItems?.items.length===0?' background-custom-grey500 ':'  bg-black '}`} disabled={!selectedTerms || cartItems?.items.length===0} onClick={handleProceedToPay}>Proceed to Pay</button>
                                <div className="flex justify-center items-center  gap-2">
                                    <div className="all-caps-12 custom-text-grey700">Secured by</div>
                                    <Image src={Razorpay} width={74} height={16} alt="img" quality={100} className="" />
                                </div>

                            </div>

                        </div>

                    </div>


                    <ManageAddress showModal={showModal} setShowModal={setShowModal} userInfo={cartInfo?.details_data} accessToken={accessToken} getAddress={getAddress}/>

                </div>
            </section>
        </>
    )
}

export default CheckoutSection;

