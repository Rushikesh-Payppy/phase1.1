'use client';
import React from "react";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Plus_Jakarta_Sans } from 'next/font/google';

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap'
})

//images
import SaveOnYourPhone from '@/Images/Icons/save-on-your-phone-icon.png';


const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Listen for the 'beforeinstallprompt' event
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault(); // Prevent the default mini-infobar
            setDeferredPrompt(e); // Save the event for later use
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        if (deferredPrompt) {
            // Show the prompt after 2 seconds
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [deferredPrompt]);

    // Detect user scroll on the scrollable container
    useEffect(() => {
        const scrollContainer = document.querySelector('.scroll-container-pwa-prompt'); // Adjust the class name if needed

        const handleUserScroll = () => {
            if (deferredPrompt) {
                setShowPrompt(true);
                if (scrollContainer) {
                    scrollContainer.removeEventListener('scroll', handleUserScroll);
                }
            }
        };

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleUserScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleUserScroll);
            }
        };
    }, [deferredPrompt]);

    // Trigger prompt on click
    useEffect(() => {
        const handleUserClick = () => {
            if (deferredPrompt) {
                setShowPrompt(true);
                window.removeEventListener('click', handleUserClick);
            }
        };

        window.addEventListener('click', handleUserClick);

        return () => {
            window.removeEventListener('click', handleUserClick);
        };
    }, [deferredPrompt]);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the browser's install dialog
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installed');
            } else {
                console.log('PWA installation declined');
            }
            setDeferredPrompt(null); // Clear the prompt
            setShowPrompt(false); // Hide the custom UI
        }
    };

    return (
        <>
            <article className="page-center-parent-container fixed bg-black bg-opacity-80 ">
                <section className={"" + plus_jakarta_sans.className}>
                    <div className=" gap-8 pt-2 px-6 pb-7 bg-[#FDFBF8] w-full flex flex-col items-center">
                        {/* seperator */}
                        <div className="background-custom-grey400 h-[2px] w-12 "></div>
                        {/* save on your phone */}
                        <section className=" gap-3 flex flex-col justify-center items-center text-center">
                            <Image src={SaveOnYourPhone} width={100} height={100} alt="img" quality={100} />
                            <h2 className="heading-h2 custom-text-grey900 mt-3">Save on your Phone</h2>
                            <p className=" font-normal body custom-text-grey700">Tap the button below to install our app and stay connected wherever you go!</p>
                        </section>
                        {/* install now button */}
                        <button onClick={handleInstallClick} className="background-custom-grey900 py-4 px-7 rounded-[2px] uppercase all-caps-12-bold custom-text-white w-full">Install NOW</button>
                    </div>
                </section>
            </article>
        </>
    );
};

export default PWAInstallPrompt;
