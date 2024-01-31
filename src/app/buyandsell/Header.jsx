"use client"
import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/fluid/Navbar';
import styles from './Header.module.scss';
import useWindowSize from '../../hooks/useWindowSize';
import { useRouter } from "next/navigation";
import useFlowGetStartedStore from "@/store/store.js"
import GooglePlacesScript, {getSuggestions, getSuggestionsWidget} from "@/components/GooglePlacesScript";
import { produce } from "immer";
import useGoogleTagManager from "@/hooks/useGoogleTagManager";

const Header = () => {

    const router = useRouter();
    const [dataLayer, doEventClick, gtmPush] = useGoogleTagManager();

    // const [selectedIndex, setSelectedIndex] = useState(0);
    const form_data = useFlowGetStartedStore(state => state.form_data);
    const setFormData = useFlowGetStartedStore(state => state.setFormData);
    const google_api_loaded = useFlowGetStartedStore(state => state.google_api_loaded);

    const new_address = useFlowGetStartedStore(state => state.new_address);
    const setNewAddress = useFlowGetStartedStore(state => state.setNewAddress);

    const size = useWindowSize();

    const searchInputRef = useRef();
    const autoCompleteRef = useRef();

    function handleKeyup(evt){
      
    }


    function processPlaceSelection(){
        // false && console.log('processPlaceSelection');
        router.push(`/get_started?flow=sellbuy&step=2`);
        // http://localhost:3000/get_started?flow=sellbuy&step=2
    }


    useEffect(() => {
        // false && console.log(selectedChip);
        if(google_api_loaded) {
            autoCompleteRef.current = getSuggestionsWidget(searchInputRef);
            autoCompleteRef.current.addListener("place_changed", async function () {
                const place = await autoCompleteRef.current.getPlace();
                setFormData(produce(form_data, draft => {
                    draft['sell_address'] = place;
                }));
                setNewAddress(true);
                processPlaceSelection();
  
                // processPlaceSelection(place);
                    // false && console.log(results);
                    // getLatLng(results[0])
                // })                
               });            
        }
    }, [google_api_loaded]);

    return (
        <div  className={styles['main-component']}>
         { !google_api_loaded && <GooglePlacesScript />}
            <Navbar />
            <div className={`${styles['main-content-container']} centered-content2`}>
                <div className={`${styles['header-content-container']}`}>
                    <div className={styles['header-content-title']}>Selling and buying your next home, the <span>easy way.</span></div>
                    <div className={styles['header-content-copy']}>Sell & buy your home with HomeEasy.</div>
                    <div className={styles["transparentprocess-content-tabs-content"]}>
                        <div className={styles["transparentprocess-content-tabs-content-item"]}>
                            <input ref={searchInputRef} onKeyUp={(e)=>{handleKeyup(e);}} type="text" placeholder="Enter your home address" />
                            {/* <div className={styles["transparentprocess-content-tabs-content-item-button-holder"]}>
                                <button onClick={()=>{
                                    // processPlaceSelection();
                                    gtmPush(["callback", "buysell_hero_gs", ()=>{processPlaceSelection();}]);

                                }} className='darken-on-hover'><span>Get Started</span> &rarr; </button>
                            </div> */}
                        </div>
                    </div>
                        
                </div>
            </div>

        </div>
    );
};

export default Header;