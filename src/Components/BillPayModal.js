'use client';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

//images
import BillIcon from '@/Images/BillPay/bill-coming-icon.svg';
import PoweredBy from '@/Images/BillPay/powered-by-bc-icon.svg';
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function BillPayModal() {

    let [showModal, setShowModal] = useState(false);

    let modalRef = useRef();

    let params=useSearchParams();
    
    let pathname=usePathname();
    let router=useRouter();


    useEffect(()=>{
        let billpay=params.get('billpay');
        if(billpay)
        {
            setShowModal(true);
        }
    },[params])

    useEffect(() => {

        function handleOutsideClick(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModal(false);
                if(showModal)
                {
                    router.push(pathname);
                }
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return ()=>{
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [showModal])

  
    function closeModal() {
        setShowModal(false);
        router.push(pathname);
         
    }

   
    return (
        <div className="       ">
            <div className={`page-center-parent-container    w-full     background-custom-grey50  duration-500 small-border border-black fixed left-[50%] -translate-x-[50%] z-[4] ${showModal ? ' bottom-0    ' : '  -bottom-[100%]  '} `} ref={modalRef} style={{minHeight:'auto'}} >

                <div className="flex flex-col items-center gap-8 p-6 pt-2 ">
                    <div className="w-12 h-[1px] background-custom-grey400"></div>
                    <div className="flex flex-col items-center gap-2 w-full relative">
                        <Image src={PoweredBy} width={57} height={45} quality={100} alt="img" className="absolute right-0 top-0" />

                        <Image src={BillIcon} width={130} height={130} quality={100} alt="img" className="" />
                        <h3 className="custom-text-grey900 heading-h3">Bill Pay Coming Soon!</h3>
                        <div className="custom-text-grey900 body-sm">Pay your bills on Payppy and earn exclusive rewards</div>
                    </div>
                    <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `} onClick={closeModal} >Okay</button>

                </div>

 
            </div>

        </div>
    )
}


export default BillPayModal;