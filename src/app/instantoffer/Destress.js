"use client"
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";

// import { useEffect } from "react";
// import useFlowGetStartedStore from "@/store/store.js";
import useWindowSize from "@/hooks/useWindowSize";

import styles from './Destress.module.scss';
import ArrowButton from '../../components/fluid/ArrowButton';
import useGoogleTagManager from "@/hooks/useGoogleTagManager";

const Destress = ({}) => {
    const size = useWindowSize();
    const router = useRouter();
    const [dataLayer, doEventClick, gtmPush] = useGoogleTagManager();

    return (
        <div className={`${styles['main-component']}`}>
            <div className={`${styles['main-content-container']}  centered-content2`}>
                <div className={`${styles['main-copy-container']}`}>

                    <div className={`${styles['main-copy-supertitle']}`}>De-stress the selling process</div>

                    <div className={`${styles['main-copy-title']}`}>A quick, convenient, and secure sale that puts cash in your hands.</div>

                    <div className={`${styles['main-copy-copy']}`}>Share your home’s details, receive a competitive cash offer within 24 hours, and close the deal in just 15 days. Move forward with ease and excitement!</div>

                    <div className={`${styles['main-copy-list']}`}>
                        <div className={`${styles['main-copy-list-title']}`}>How it works</div>
                        <ul>
                            <li>01. Submit a request</li>
                            <li>02. Fill us in on a few details on your home</li>
                            <li>03. Receive your InstantOffer</li>
                            <li>04. Close and move stress-free </li>
                        </ul>
                    </div>
                    <div className={`${styles['main-copy-footer']}`}>
                        <ArrowButton
                            link_text="Get started"
                            callback={()=>{
                                // console.log("clicked")
                                // router.push(`/get_started?flow=instantoffer&step=1`);
                                gtmPush(["callback", "io_get_started", ()=>{router.push(`/get_started?flow=instantoffer&step=1`);}]);
                            }}
                        />
                    </div>


                </div>
                {/* {size.width > 1919 && */}
                <div className={`${styles['main-image-container']}`}>
                    <img src="/img/destress_hands.png" alt="destress" />
                </div>
                {/* }
                {size.width < 1920 && size.width > 1279 &&
                <div className={`${styles['main-image-container']}`}>
                    <img src="/img/destress_hands.png" alt="destress" />
                </div>
                }
                {size.width < 1280 && size.width > 1023 &&
                <div className={`${styles['main-image-container']}`}>
                    <img src="/img/destress_hands_1024.png" alt="destress" />
                </div>
                }
                {size.width < 1024 &&
                <div className={`${styles['main-image-container']}`}>
                    <img src="/img/destress_hands.png" alt="destress" />
                </div>
                } */}

            </div>
        </div>
    );
};

export default Destress;