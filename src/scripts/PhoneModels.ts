import axios from "axios";
import {JSDOM} from "jsdom"
// ========================================================================================================================================================================================================================================================================================================================================================


// ***IMPORTANTE*** NÃO ESQUEÇA DE ALTERAR!
// NOME DA MARCA 
const brandName = "Samsung";


//  SUBSTITUA O QUE ESTÁ ENTRE AS CRAZES
const html = `<div class="results">
                        
                    <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/80155-350/Samsung-Galaxy-M51.webp" alt="Samsung Galaxy M51" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/80155-350/Samsung-Galaxy-M51.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M51_id11491">Samsung Galaxy M51</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M51_id11491" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-M51,Samsung-Galaxy-A36-5G/phones/11491,12433" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11491" data-phone-name="Samsung Galaxy M51" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="1698" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/84718-350/Samsung-Galaxy-M32.webp" alt="Samsung Galaxy M32" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/84718-350/Samsung-Galaxy-M32.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M32_id12446">Samsung Galaxy M32</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M32_id12446" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A52-5G,Samsung-Galaxy-M32/phones/11829,12446" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/12446" data-phone-name="Samsung Galaxy M32" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="1707" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/72415-350/Samsung-Galaxy-J8.webp" alt="Samsung Galaxy J8" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/72415-350/Samsung-Galaxy-J8.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J8_id10795">Samsung Galaxy J8</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J8_id10795" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J8/phones/s/10795" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/73978-350/Samsung-Galaxy-On7-Prime.webp" alt="Samsung Galaxy On7 Prime" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/73978-350/Samsung-Galaxy-On7-Prime.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-On7-Prime_id10785">Samsung Galaxy On7 Prime</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-On7-Prime_id10785" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-On7-Prime/phones/s/10785" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/45741-350/Samsung-Galaxy-S5.webp" alt="Samsung Galaxy S5" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/45741-350/Samsung-Galaxy-S5.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-S5_id8202">Samsung Galaxy S5</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-S5_id8202" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-S5/phones/s/8202" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/81855-350/Samsung-Galaxy-M12.webp" alt="Samsung Galaxy M12" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/81855-350/Samsung-Galaxy-M12.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M12_id11575">Samsung Galaxy M12</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M12_id11575" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-M12,Apple-iPhone-16-Pro/phones/11575,12239" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11575" data-phone-name="Samsung Galaxy M12" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="406270" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/74372-350/Samsung-Galaxy-Book2.webp" alt="Samsung Galaxy Book2" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/74372-350/Samsung-Galaxy-Book2.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Book2_id11048">Samsung Galaxy Book2</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Book2_id11048" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Book2/phones/s/11048" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11048" data-phone-name="Samsung Galaxy Book2" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="406279" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/67810-350/Samsung-Galaxy-J5-2017.webp" alt="Samsung Galaxy J5 (2017)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/67810-350/Samsung-Galaxy-J5-2017.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J5-2017_id10473">Samsung Galaxy J5 (2017)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J5-2017_id10473" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J5-2017/phones/s/10473" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/72310-350/Samsung-Galaxy-J6.webp" alt="Samsung Galaxy J6" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/72310-350/Samsung-Galaxy-J6.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J6_id10884">Samsung Galaxy J6</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J6_id10884" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J6/phones/s/10884" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/78763-350/Samsung-Galaxy-Tab-A-8.4-2020.webp" alt="Samsung Galaxy Tab A 8.4 (2020)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/78763-350/Samsung-Galaxy-Tab-A-8.4-2020.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-A-8.4-2020_id11398">Samsung Galaxy Tab A 8.4 (2020)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-A-8.4-2020_id11398" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/vivo-Y19,Samsung-Galaxy-Tab-A-8.4-2020/phones/11323,11398" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11398" data-phone-name="Samsung Galaxy Tab A 8.4 (2020)" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="672380" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/67802-350/Samsung-Galaxy-J7-2017.webp" alt="Samsung Galaxy J7 (2017)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/67802-350/Samsung-Galaxy-J7-2017.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J7-2017_id10394">Samsung Galaxy J7 (2017)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J7-2017_id10394" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J7-2017/phones/s/10394" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/79297-350/Samsung-Galaxy-Watch-Active-2-40mm.webp" alt="Samsung Galaxy Watch Active 2 (40mm)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/79297-350/Samsung-Galaxy-Watch-Active-2-40mm.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-Active-2-40mm_id11452">Samsung Galaxy Watch Active 2 (40mm)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-Active-2-40mm_id11452" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Watch-Active-2-40mm,Samsung-Galaxy-Watch-8-40mm/phones/11452,12787" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11452" data-phone-name="Samsung Galaxy Watch Active 2 (40mm)" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="672388" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

                            
                <div class="spot spot-disclaimer ad_1_1"><!-- nd_phonefinder_inner_1 --><!-- /124260794/.2_7292.3_phonearena.com_tier1 --><div id="div-gpt-ad-1612185102182-0" style="width: 728px; max-height: 90px; height: 100%; min-height: 50px;" data-google-query-id=""><script>googletag.cmd.push(function(){googletag.display('div-gpt-ad-1612185102182-0')});</script><div id="google_ads_iframe_/124260794/.2_7292.3_phonearena.com_tier1_0__container__" style="border: 0pt; width: 728px; height: 0px;"></div></div></div>
            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/73166-350/Samsung-Galaxy-A7-2018.webp" alt="Samsung Galaxy A7 (2018)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/73166-350/Samsung-Galaxy-A7-2018.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A7-2018_id11002">Samsung Galaxy A7 (2018)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A7-2018_id11002" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A7-2018,Samsung-Galaxy-A30s/phones/11002,11228" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11002" data-phone-name="Samsung Galaxy A7 (2018)" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5135341" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/82761-350/Samsung-Galaxy-Watch-4-Classic-42mm.webp" alt="Samsung Galaxy Watch 4 Classic (42mm)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/82761-350/Samsung-Galaxy-Watch-4-Classic-42mm.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-4-Classic-42mm_id11775">Samsung Galaxy Watch 4 Classic (42mm)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-4-Classic-42mm_id11775" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Watch-4-Classic-42mm,Samsung-Galaxy-Watch-8-Classic/phones/11775,12761" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11775" data-phone-name="Samsung Galaxy Watch 4 Classic (42mm)" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5135349" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/72753-350/Samsung-Galaxy-Tab-S4.webp" alt="Samsung Galaxy Tab S4" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/72753-350/Samsung-Galaxy-Tab-S4.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-S4_id10814">Samsung Galaxy Tab S4</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-S4_id10814" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Tab-S4/phones/s/10814" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/79675-350/Samsung-Galaxy-Watch-3-45mm.webp" alt="Samsung Galaxy Watch 3 (45mm)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/79675-350/Samsung-Galaxy-Watch-3-45mm.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-3-45mm_id11461">Samsung Galaxy Watch 3 (45mm)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-3-45mm_id11461" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Watch-3-45mm,Samsung-Galaxy-Watch-5-Pro/phones/11461,11942" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11461" data-phone-name="Samsung Galaxy Watch 3 (45mm)" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5135356" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/79497-350/Samsung-Galaxy-A71-5G-UW.webp" alt="Samsung Galaxy A71 5G UW" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/79497-350/Samsung-Galaxy-A71-5G-UW.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A71-5G-UW_id11459">Samsung Galaxy A71 5G UW</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A71-5G-UW_id11459" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A71-5G,Samsung-Galaxy-A71-5G-UW/phones/11401,11459" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11459" data-phone-name="Samsung Galaxy A71 5G UW" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5137791" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/68740-350/Samsung-Galaxy-S8-Active.webp" alt="Samsung Galaxy S8 Active" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/68740-350/Samsung-Galaxy-S8-Active.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-S8-Active_id10608">Samsung Galaxy S8 Active</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-S8-Active_id10608" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-S8-Active/phones/s/10608" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/62887-350/Samsung-Galaxy-Note7.webp" alt="Samsung Galaxy Note7" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/62887-350/Samsung-Galaxy-Note7.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Note7_id10024">Samsung Galaxy Note7</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Note7_id10024" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Note7/phones/s/10024" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/63825-350/Samsung-W2016.webp" alt="Samsung W2016" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/63825-350/Samsung-W2016.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-W2016_id10303">Samsung W2016</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-W2016_id10303" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-W2016/phones/s/10303" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/26908-350/Samsung-Galaxy-S-II.webp" alt="Samsung Galaxy S II" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/26908-350/Samsung-Galaxy-S-II.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-S-II_id5106">Samsung Galaxy S II</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-S-II_id5106" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-S-II/phones/s/5106" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/70465-350/Samsung-Galaxy-A8-2018.webp" alt="Samsung Galaxy A8 (2018)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/70465-350/Samsung-Galaxy-A8-2018.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A8-2018_id10737">Samsung Galaxy A8 (2018)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A8-2018_id10737" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A8-2018/phones/s/10737" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/70758-350/Samsung-Galaxy-Luna.webp" alt="Samsung Galaxy Luna" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/70758-350/Samsung-Galaxy-Luna.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Luna_id10361">Samsung Galaxy Luna</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Luna_id10361" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Luna/phones/s/10361" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                    <div class="rumored-label">RUMORED</div>
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/81973-350/Samsung-Galaxy-Note-21.webp" alt="Samsung Galaxy Note 21" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/81973-350/Samsung-Galaxy-Note-21.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Note-21_id11668">Samsung Galaxy Note 21</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Note-21_id11668" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Note-21,Samsung-Galaxy-A57-5G/phones/11668,12808" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

                            
                
            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/62123-350/Samsung-Galaxy-J5-2016.webp" alt="Samsung Galaxy J5 (2016)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/62123-350/Samsung-Galaxy-J5-2016.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J5-2016_id10096">Samsung Galaxy J5 (2016)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J5-2016_id10096" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J5-2016/phones/s/10096" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/76731-350/Samsung-Galaxy-A30s.webp" alt="Samsung Galaxy A30s" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/76731-350/Samsung-Galaxy-A30s.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A30s_id11228">Samsung Galaxy A30s</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A30s_id11228" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A7-2018,Samsung-Galaxy-A30s/phones/11002,11228" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11228" data-phone-name="Samsung Galaxy A30s" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139258" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/61321-350/Samsung-Galaxy-Tab-E-Lite-7.0.webp" alt="Samsung Galaxy Tab E Lite 7.0" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/61321-350/Samsung-Galaxy-Tab-E-Lite-7.0.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-E-Lite-7.0_id10028">Samsung Galaxy Tab E Lite 7.0</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-E-Lite-7.0_id10028" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Tab-E-Lite-7.0/phones/s/10028" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/77745-350/Samsung-Galaxy-XCover-FieldPro.webp" alt="Samsung Galaxy XCover FieldPro" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/77745-350/Samsung-Galaxy-XCover-FieldPro.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-XCover-FieldPro_id11301">Samsung Galaxy XCover FieldPro</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-XCover-FieldPro_id11301" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-XCover-FieldPro,Samsung-Galaxy-XCover-Pro/phones/11301,11321" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11301" data-phone-name="Samsung Galaxy XCover FieldPro" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139264" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/79589-350/Samsung-Galaxy-Z-Flip-5G.webp" alt="Samsung Galaxy Z Flip 5G" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/79589-350/Samsung-Galaxy-Z-Flip-5G.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Z-Flip-5G_id11478">Samsung Galaxy Z Flip 5G</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Z-Flip-5G_id11478" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Z-Flip-5G,Google-Pixel-10a/phones/11478,12828" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11478" data-phone-name="Samsung Galaxy Z Flip 5G" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139724" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/77828-350/Samsung-Galaxy-S10-Lite.webp" alt="Samsung Galaxy S10 Lite" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/77828-350/Samsung-Galaxy-S10-Lite.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-S10-Lite_id11309">Samsung Galaxy S10 Lite</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-S10-Lite_id11309" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-S10-Lite,Samsung-Galaxy-S26/phones/11309,12804" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11309" data-phone-name="Samsung Galaxy S10 Lite" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139729" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/82760-350/Samsung-Galaxy-Watch-4-44mm.webp" alt="Samsung Galaxy Watch 4 (44mm)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/82760-350/Samsung-Galaxy-Watch-4-44mm.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-4-44mm_id11774">Samsung Galaxy Watch 4 (44mm)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Watch-4-44mm_id11774" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Watch-4-44mm,Samsung-Galaxy-Watch-7-44mm/phones/11774,12397" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11774" data-phone-name="Samsung Galaxy Watch 4 (44mm)" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139735" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/76546-350/Samsung-Galaxy-Tab-A-8.0-2019.webp" alt="Samsung Galaxy Tab A 8.0 (2019)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/76546-350/Samsung-Galaxy-Tab-A-8.0-2019.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-A-8.0-2019_id11201">Samsung Galaxy Tab A 8.0 (2019)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-A-8.0-2019_id11201" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Tab-A-8.0-2019,Samsung-Galaxy-Tab-A-8.4-2020/phones/11201,11398" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11201" data-phone-name="Samsung Galaxy Tab A 8.0 (2019)" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139740" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/20579-350/Samsung-Galaxy-S.webp" alt="Samsung Galaxy S" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/20579-350/Samsung-Galaxy-S.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-S_id4522">Samsung Galaxy S</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-S_id4522" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-S/phones/s/4522" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/78377-350/Samsung-Galaxy-M21.webp" alt="Samsung Galaxy M21" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/78377-350/Samsung-Galaxy-M21.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M21_id11384">Samsung Galaxy M21</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M21_id11384" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-M21,Nothing-Phone-4a-Pro/phones/11384,12936" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11384" data-phone-name="Samsung Galaxy M21" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139956" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/58772-350/Samsung-Galaxy-A5-2016.webp" alt="Samsung Galaxy A5 (2016)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/58772-350/Samsung-Galaxy-A5-2016.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A5-2016_id9813">Samsung Galaxy A5 (2016)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A5-2016_id9813" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A5-2016/phones/s/9813" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/83856-350/Samsung-Galaxy-A20s.webp" alt="Samsung Galaxy A20s" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/83856-350/Samsung-Galaxy-A20s.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A20s_id11257">Samsung Galaxy A20s</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A20s_id11257" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A20s,Samsung-Galaxy-A17-5G/phones/11257,12806" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11257" data-phone-name="Samsung Galaxy A20s" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5139961" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/76816-350/Samsung-Galaxy-Tab-Active-Pro.webp" alt="Samsung Galaxy Tab Active Pro" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/76816-350/Samsung-Galaxy-Tab-Active-Pro.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-Active-Pro_id11245">Samsung Galaxy Tab Active Pro</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-Active-Pro_id11245" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/OnePlus-7-Pro-5G,Samsung-Galaxy-Tab-Active-Pro/phones/11214,11245" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11245" data-phone-name="Samsung Galaxy Tab Active Pro" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5140240" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/42834-350/Samsung-Galaxy-Note3.webp" alt="Samsung Galaxy Note3" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/42834-350/Samsung-Galaxy-Note3.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Note3_id7984">Samsung Galaxy Note3</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Note3_id7984" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Note3/phones/s/7984" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/76701-350/Samsung-Galaxy-A10s.webp" alt="Samsung Galaxy A10s" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/76701-350/Samsung-Galaxy-A10s.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A10s_id11226">Samsung Galaxy A10s</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A10s_id11226" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A10,Samsung-Galaxy-A10s/phones/11119,11226" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11226" data-phone-name="Samsung Galaxy A10s" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5140246" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/76735-350/Samsung-Galaxy-A50s.webp" alt="Samsung Galaxy A50s" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/76735-350/Samsung-Galaxy-A50s.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A50s_id11227">Samsung Galaxy A50s</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A50s_id11227" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A50,Samsung-Galaxy-A50s/phones/11075,11227" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11227" data-phone-name="Samsung Galaxy A50s" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5140253" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/48757-350/Samsung-Galaxy-Note4.webp" alt="Samsung Galaxy Note4" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/48757-350/Samsung-Galaxy-Note4.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Note4_id8577">Samsung Galaxy Note4</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Note4_id8577" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Note4/phones/s/8577" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/78489-350/Samsung-Galaxy-M11.webp" alt="Samsung Galaxy M11" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/78489-350/Samsung-Galaxy-M11.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M11_id11396">Samsung Galaxy M11</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M11_id11396" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-M11,Samsung-Galaxy-S23/phones/11396,11999" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11396" data-phone-name="Samsung Galaxy M11" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5140626" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/80634-350/Samsung-Galaxy-F41.webp" alt="Samsung Galaxy F41" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/80634-350/Samsung-Galaxy-F41.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-F41_id11530">Samsung Galaxy F41</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-F41_id11530" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-F41,Samsung-Galaxy-S24/phones/11530,12113" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11530" data-phone-name="Samsung Galaxy F41" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5140633" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/69674-350/Samsung-Galaxy-Tab-Active-2.webp" alt="Samsung Galaxy Tab Active 2" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/69674-350/Samsung-Galaxy-Tab-Active-2.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-Active-2_id10705">Samsung Galaxy Tab Active 2</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-Active-2_id10705" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Tab-Active-2/phones/s/10705" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/78279-350/Samsung-Galaxy-M31.webp" alt="Samsung Galaxy M31" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/78279-350/Samsung-Galaxy-M31.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M31_id11353">Samsung Galaxy M31</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M31_id11353" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-M31,OnePlus-15/phones/11353,12846" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11353" data-phone-name="Samsung Galaxy M31" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;" data-gtm-vis-first-on-screen30784072_2159="5141908" data-gtm-vis-total-visible-time30784072_2159="100" data-gtm-vis-has-fired30784072_2159="1">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/46261-350/Samsung-GT-C3592.webp" alt="Samsung GT-C3592" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/46261-350/Samsung-GT-C3592.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-GT-C3592_id8527">Samsung GT-C3592</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-GT-C3592_id8527" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-GT-C3592/phones/s/8527" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/59879-350/Samsung-Galaxy-J3-2016.webp" alt="Samsung Galaxy J3 (2016)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/59879-350/Samsung-Galaxy-J3-2016.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J3-2016_id9889">Samsung Galaxy J3 (2016)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J3-2016_id9889" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J3-2016/phones/s/9889" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/51287-350/Samsung-Galaxy-S-Duos-3.webp" alt="Samsung Galaxy S Duos 3" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/51287-350/Samsung-Galaxy-S-Duos-3.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-S-Duos-3_id9124">Samsung Galaxy S Duos 3</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-S-Duos-3_id9124" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-S-Duos-3/phones/s/9124" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/65374-350/Samsung-Galaxy-A3-2017.webp" alt="Samsung Galaxy A3 (2017)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/65374-350/Samsung-Galaxy-A3-2017.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A3-2017_id10330">Samsung Galaxy A3 (2017)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A3-2017_id10330" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A3-2017/phones/s/10330" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/61080-350/Samsung-Galaxy-Tab-A-2016.webp" alt="Samsung Galaxy Tab A (2016)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/61080-350/Samsung-Galaxy-Tab-A-2016.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-A-2016_id9961">Samsung Galaxy Tab A (2016)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Tab-A-2016_id9961" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Tab-A-2016/phones/s/9961" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/74480-350/Samsung-Galaxy-J3-2017.webp" alt="Samsung Galaxy J3 (2017)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/74480-350/Samsung-Galaxy-J3-2017.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J3-2017_id10393">Samsung Galaxy J3 (2017)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J3-2017_id10393" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J3-2017/phones/s/10393" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/26359-350/Samsung-GALAXY-mini.webp" alt="Samsung GALAXY mini" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/26359-350/Samsung-GALAXY-mini.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-GALAXY-mini_id5147">Samsung GALAXY mini</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-GALAXY-mini_id5147" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-GALAXY-mini/phones/s/5147" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/49893-350/Samsung-Galaxy-A5.webp" alt="Samsung Galaxy A5" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/49893-350/Samsung-Galaxy-A5.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-A5_id8944">Samsung Galaxy A5</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-A5_id8944" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-A5/phones/s/8944" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/53243-350/Samsung-Galaxy-Grand-Neo-Plus.webp" alt="Samsung Galaxy Grand Neo Plus" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/53243-350/Samsung-Galaxy-Grand-Neo-Plus.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-Grand-Neo-Plus_id9418">Samsung Galaxy Grand Neo Plus</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-Grand-Neo-Plus_id9418" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Grand-Neo-Plus/phones/s/9418" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/74992-350/Samsung-Galaxy-M20.webp" alt="Samsung Galaxy M20" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/74992-350/Samsung-Galaxy-M20.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M20_id11079">Samsung Galaxy M20</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M20_id11079" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-M20,Xiaomi-Poco-M3/phones/11079,11553" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11079" data-phone-name="Samsung Galaxy M20" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/80657-350/Samsung-Galaxy-M31s.webp" alt="Samsung Galaxy M31s" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/80657-350/Samsung-Galaxy-M31s.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M31s_id11477">Samsung Galaxy M31s</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M31s_id11477" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-Note-20-Ultra,Samsung-Galaxy-M31s/phones/11470,11477" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11477" data-phone-name="Samsung Galaxy M31s" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/61573-350/Samsung-Galaxy-J7.webp" alt="Samsung Galaxy J7" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/61573-350/Samsung-Galaxy-J7.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J7_id10042">Samsung Galaxy J7</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J7_id10042" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J7/phones/s/10042" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/81548-350/Samsung-Galaxy-M02.webp" alt="Samsung Galaxy M02" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/81548-350/Samsung-Galaxy-M02.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-M02_id11598">Samsung Galaxy M02</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-M02_id11598" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-M01,Samsung-Galaxy-M02/phones/11468,11598" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                        <a href="javascript:" class="affiliate-button" data-endpoint="https://www.phonearena.com/phones/get-affiliate-data/11598" data-phone-name="Samsung Galaxy M02" data-trigger="affiliate-button" onclick="window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'affiliateButtonClicked'}); return true;">
        Check prices
    </a>
                </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/73802-350/Samsung-Galaxy-J3-2018.webp" alt="Samsung Galaxy J3 (2018)" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/73802-350/Samsung-Galaxy-J3-2018.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-Galaxy-J3-2018_id10736">Samsung Galaxy J3 (2018)</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-Galaxy-J3-2018_id10736" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-Galaxy-J3-2018/phones/s/10736" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                                <div class="tile-phone">
                                <div class="tile-header">
                    
        
    

<picture class="tile-picture">
                
    
    <img src="https://m-cdn.phonearena.com/images/phones/37761-350/Samsung-GALAXY-Note-II.webp" alt="Samsung GALAXY Note II" class="tile-image" loading="lazy">
        <noscript><img src="https://m-cdn.phonearena.com/images/phones/37761-350/Samsung-GALAXY-Note-II.webp" /></noscript>
    
</picture>
                    <a class="tile-title" href="https://www.phonearena.com/phones/Samsung-GALAXY-Note-II_id7254">Samsung GALAXY Note II</a>
                </div>
                <div class="tile-buttons">
                    <div class="widgetViewSpecsButton">
    <div class="tile-button">
        <i class="ic ic-bg-hardware-alt"></i>
        <a href="https://www.phonearena.com/phones/Samsung-GALAXY-Note-II_id7254" class="tile-button-label">
            View Specs
        </a>
    </div>
</div>
                    
    <div class="widgetCompareDeviceButton">
        <div class="tile-button">
            <i class="ic ic-phone-multiple"></i>
            <a href="https://www.phonearena.com/phones/compare/Samsung-GALAXY-Note-II/phones/s/7254" class="tile-button-label" rel="nofollow">
                Compare
            </a>
        </div>
    </div>
                                    </div>
            </div>

            
                        </div>`




// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================









const DOM = new JSDOM(html);
const doc = DOM.window.document;

const containerModelNames = doc.querySelectorAll("a.tile-title");
let modelNames: string[] = [];


for (let element of containerModelNames) {
    const untreatedModelName = element.textContent;
    const modelName = untreatedModelName.slice((brandName.length + 1), (untreatedModelName.length + 1))
    modelNames.push(modelName);
}


let brandId: number;

async function registerDeviceModels (brandName: string, modelNames: string[]) {
    const { data } = await axios.get(`http://localhost:3000/cellphone-brands/name/${brandName}`, {
        headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYWxpQGZyYW5jYS5jb20iLCJpYXQiOjE3NzU4MzM5NDgsImV4cCI6MTc3NTg2Mjc0OH0._GWFPWCX-PtzQeXe1dzTwtT6Q_2r8ktRPqo-DA4Oolc'}
    });
    
    brandId =  data[0].id;
    console.log("id da marca:", brandId)
    console.log(modelNames)
    
    for (let modelName of modelNames) {
        console.log(`CADASTRANDO MODELO: ${modelName}`)
        try {
            await axios.post('http://localhost:3000/cellphone-models/new', {name: modelName, brandId: brandId}, {headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYWxpQGZyYW5jYS5jb20iLCJpYXQiOjE3NzU4MzM5NDgsImV4cCI6MTc3NTg2Mjc0OH0._GWFPWCX-PtzQeXe1dzTwtT6Q_2r8ktRPqo-DA4Oolc'
            }});
        }
        catch(error: any) {
            if (error.toString().includes('406')){
                console.log(`Modelo "${modelName}" já existe!`)
            }
            else console.error("Erro ao cadastrar modelo: ", error)
        }
    }    
}

registerDeviceModels(brandName, modelNames);

console.log(modelNames);





