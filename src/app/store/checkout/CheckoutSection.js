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
import RazorpayIcon from '@/Images/Store/razorpay-logo.svg';
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
import Script from 'next/script';
import AddShippingMethodsApi from '@/apis/store/AddShippingMethodsApi';

import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import TaxesApi from '@/apis/store/TaxesApi';
import CreateCartApi from '@/apis/store/CreateCartApi';
import GenerateOrderApi from '@/apis/store/GenerateOrderApi';
import DeleteCartIdApi from '@/apis/store/DeleteCartIdApi';


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

    let[shippingId,setShippingId]=useState('');
    let [paymentCollection, setPaymentCollection] = useState(null); 
    let[paymentProviderList,setPaymentProvidersList]=useState([]);
    let[invalidAddress,setInvalidAddress]=useState(false);

    let[tax,setTax]=useState('');
    let[orderDetails,setOrderDetails]=useState('');


    let router=useRouter();

    const { error, isLoading, Razorpay } = useRazorpay();
     //to get a access token
     useEffect(()=>{
        getAccessToken();
        getPaymentProviderList();
    },[])
    // useEffect(()=>{
    //     if(accessToken)
    //     {
           
    //     }
    // },[accessToken])

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
            getAddress();
            AddShippingMethod();
        }
    },[cartInfo])

    useEffect(()=>{
        if(userAddress)
        {
            CreatePaymentCollection();
        }
    },[userAddress])

    useEffect(()=>{
        if(paymentCollection)
        {
            PutTaxesInCart();
        }
    },[paymentCollection])


    useEffect(()=>{
        if(tax)
        {
            IntiatePaymentSession();
        }
    },[tax])

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    //     script.async = true;
    //     script.onload = () => console.log('Razorpay script loaded!');
    //     document.body.appendChild(script);
    //   }, []);

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

     //add shipping method
     function AddShippingMethod()
     {
        let obj={
              "option_id": "so_01JE68TCMQVJTGQWHYZPT6A28H"
        }
        AddShippingMethodsApi(obj,cartInfo.cart_id)
        .then((response)=>{
            console.log(response);
            setShippingId(response?.cart);
            
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
            "provider_id": "pp_razorpay_razorpay",
            "context":{
                "extra": tax

         }
        }
         
         IntiatePaymentApi(obj,paymentCollection?.id)
            .then((response) => {
                console.log(response);
                if(response&&'payment_collection' in response)
                {
                    setOrderDetails(response.payment_collection);
                }
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
                    let length=response?.response.addresses.length-1;
                    setInvalidAddress(!response?.response?.addresses[length]?.address_1);

                    let Addresses=response?.response?.addresses[length];
                    //removing unwanted properties
                    delete Addresses.company;
                    delete Addresses.address_2;
                    delete Addresses.metadata;
                    delete Addresses.created_at;
                    delete Addresses.updated_at;
                    delete Addresses.customer_id;
                    delete Addresses.id;


                    let billingAddresses =Addresses;
                    let shipping_address=Addresses;
                  

                   

                    let createCartObj={
                        "billing_address": billingAddresses,
                        "shipping_address": shipping_address
                    }

                    CreateCartApi(createCartObj,cartInfo.cart_id)
                    .then((response)=>{
                        console.log(response);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                    
            }
        })
     }

     function PutTaxesInCart()
     {
        TaxesApi(cartInfo.cart_id)
        .then((response)=>{
            console.log('tax info :',response);
            if(response){
                setTax(response.cart);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
     }

     function handleProceedToPay()
     {
        try {
            
      
        setInvalidAddress( !userAddress[userAddress.length-1]?.address_1);
        if(!userAddress[userAddress.length-1]?.address_1)
        {
            return;
        }


        const options = {
            key: 'rzp_test_7ouO5vEuMs7k4r', // Replace with Razorpay Test/Live Key ID
            amount: orderDetails?.payment_sessions[0]?.data?.amount, // Amount from Razorpay Order
            currency: 'INR', // Currency from Razorpay Order
            order_id: orderDetails?.payment_sessions[0]?.data?.id, // Razorpay Order ID
            name: cartInfo?.details_data?.first_name,
            // callback_url: `https://medusa.payppy.in/razorpay/hooks`,
            description: 'Payment for product/service',
            // image: '/your-logo.png', // Optional logo
            handler: (response) => {
              // Handle successful payment here
              console.log('Payment successful:', response);
            if(response&&'razorpay_payment_id' in response)
            {
                //if payment sucessfull then first generate the order id from medusa 
                GenerateOrderApi(cartInfo.cart_id)
                .then((response)=>{
                  console.log('generate cart response :',response);
                  if(response&&'order' in response)
                  {

                    //then delete the cart id that has been used 
                    DeleteCartIdApi(accessToken)
                    .then()
                    .catch()
                    .finally(()=>{
                        window.location.href='/store/order-complete?url='+response?.order.id;
                    })
                  }
                  
                })
                .catch((error)=>{
                  console.log(error);
                })
            }
            },
            "prefill": {
              "name": cartInfo?.details_data?.first_name, // Customer's name
              "email": cartInfo?.email, // Customer's email
              "contact": cartInfo?.details_data?.phone_number, // Customer's phone
            },
            theme: {
              color: '#3399cc', // Optional custom theme color
            },
          };
    
          const razorpayInstance = new Razorpay(options);
          razorpayInstance.open();

          // Handling Razorpay errors
            razorpayInstance.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                // alert('Payment failed. Please try again or contact support.');
                window.location.href='/store/order-fail?url='+orderDetails?.payment_sessions[0]?.data?.id;
            });

        } catch (error) {
            console.log(error);
             
        }
     }

    function handleAddressClick()
    {
        setShowModal(!showModal);
    }
    function handleBackClick()
    {
        router.push('/store/shopping-bag');
    }
    return (
        <>
            <section className={"flex justify-center min-h-screen w-full background-custom-grey50  "}>
                <div className="page-center-parent-container  small-border border-black background-custom-grey100  overflow-scrollbar-hidden relative">


                    {/* navbar  */}
                    <div className="relative flex items-center justify-center py-3.5 px-4 background-custom-grey50">
                        <button onClick={handleBackClick} className='absolute top-4 left-3.5'>
                            <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                        </button>
                        <h4 className="heading-h4 custom-text-grey900">Review & Pay</h4>
                    </div>


                    {/* contatct details */}
                    <div className="background-custom-grey50 py-7 px-6 flex gap-2 justify-start items-start small-border-top custom-border-grey800">
                        <Image src={UserIcon} width={20} height={20} alt="img" quality={100} className="" />
                        <div className="flex flex-col gap-2 ">
                            <div className="all-caps-12 custom-text-grey900">Contact Details</div>
                            <div className="flex flex-col gap-1">
                                <div className="body-sm-bold custom-text-grey900">{(cartInfo?.details_data?.first_name || "") + " "+ (cartInfo?.details_data?.last_name || "")}</div>
                                <div className="flex items-center gap-2">
                                    <div className="body-sm-bold custom-text-grey900"> {cartInfo?.details_data?.phone_number || ""}</div>
                                    <div className=" w-[0.5px] h-[18px] background-custom-grey900"></div>
                                    <div className="body-sm-bold custom-text-grey900">{cartInfo?.email || ""}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping details */}
                   {userAddress?.length<1? <button className="background-custom-grey50 w-full py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800" onClick={handleAddressClick}>
                        <div className="flex items-center gap-2 ">
                            <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="all-caps-12 custom-text-grey900">Add Address</div>
                        </div>
                        <Image src={Arrow} width={20} height={20} alt="img" quality={100} className="" />
                    </button>
                  :  <div className="background-custom-grey50 py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        
                        <div className="flex gap-2  items-start">
                        <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                        <div className="flex flex-col gap-2 ">
                            <div className="all-caps-12 custom-text-grey900">Shipping to</div>
                            <div className="flex flex-col gap-1">
                                {/* <div className="body-sm-bold custom-text-grey900">{cartInfo?.details_data?.first_name + " "+cartInfo?.details_data?.last_name}</div> */}
                                    <div className="body-sm-bold custom-text-grey900">{userAddress[userAddress.length-1]?.address_1 || ""}
                                    <br />{userAddress[userAddress.length-1]?.city || ""}, {userAddress[userAddress.length-1]?.province || ""}, {userAddress[userAddress.length-1]?.postal_code || ""}</div>
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
                    <div className="background-custom-grey50 py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        <div className="flex items-center gap-2 ">
                            <Image src={Availability} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="body-sm-bold custom-text-grey900">Expected Delivery:  3-5 Days</div>
                        </div>
                    </div>


                    <div className="px-6 py-8 background-custom-grey100 relative h-auto">
                        <Image src={Subtract} width={524} height={20} alt="img" quality={100} className=" w-full object-cover absolute left-0 -top-2 z-[1]" />


                        <div className="flex flex-col gap-4  relative z-[2]">
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
                                    <div className={`w-4 h-4 small-border custom-border-grey800 ${selectedTerms?' bg-black ':' small-border bg-white border-black '}  relative cursor-pointer`} onClick={()=>{setSelectedTerms(!selectedTerms)}}>
                                       {selectedTerms&& <Image src={CheckIcon} width={12} height={12} alt="img" quality={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 brightness-[100]" />}
                                    </div>
                                    <div className="body-sm custom-text-grey900"> I have read and agree to the website <Link href={'/my-account/legal-policies-and-more/terms-of-use'} className='font-semibold '>terms and conditions *</Link></div>
                                </div>
                                {invalidAddress&&<span className="body-sm text-red-600">Please Enter Valid Address</span>}
                                <button className={`text-center all-caps-12-bold  custom-text-white px-5 py-4 ${!selectedTerms || cartItems?.items.length===0?' background-custom-grey500 ':'  bg-black '}`} disabled={!selectedTerms || cartItems?.items.length===0} onClick={handleProceedToPay}>Proceed to Pay</button>
                                <div className="flex justify-center items-center  gap-2">
                                    <div className="all-caps-12 custom-text-grey700">Secured by</div>
                                    <Image src={RazorpayIcon} width={74} height={16} alt="img" quality={100} className="" />
                                </div>

                            </div>

                        </div>

                    </div>


                    <ManageAddress showModal={showModal} setShowModal={setShowModal} userInfo={cartInfo} accessToken={accessToken} getAddress={getAddress} houseNoprops={userAddress[userAddress.length-1]?.address_1} apartmentNoprops={userAddress[userAddress.length-1]?.address_2} cityProps={userAddress[userAddress.length-1]?.city} zipcodeprops={userAddress[userAddress.length-1]?.postal_code} />

                </div>
            </section>

            {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" /> */}
        </>
    )
}

export default CheckoutSection;

