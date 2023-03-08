var _iub_optionsObj = JSON.parse(JSON.stringify(_iub_options));

var _iub = _iub || [];

if(_iub_optionsObj.api_key){
    _iub.cons_instructions = _iub.cons_instructions || [];
    _iub.cons_instructions.push(["init", {
        api_key: _iub_optionsObj.api_key
    }]);
}

// Cookie Bar Floating Bottom
var bannerHTML;
_iub.csConfiguration = {
    "reloadOnConsent": _iub_optionsObj.reloadOnConsent,
    "countryDetection": true,
    "consentOnContinuedBrowsing": false,
    "perPurposeConsent": true,
    "gdprAppliesGlobally": (_iub_optionsObj.gdprAppliesGlobally ? _iub_optionsObj.gdprAppliesGlobally : true),
    "lang": _iub_optionsObj.lang,
    "siteId": _iub_optionsObj.siteId,
    "floatingPreferencesButtonDisplay": false,
    "cookiePolicyId": _iub_optionsObj.cookiePolicyId,
    "purposes": "1,2,3,4,5",
    "invalidateConsentWithoutLog": true,
    "banner": {
        "applyStyles": false,
        "acceptButtonDisplay": true,
        "customizeButtonDisplay": true,
        "acceptButtonColor": "#1998ff",
        "acceptButtonCaptionColor": "white",
        "customizeButtonColor": "transparent",
        "customizeButtonCaptionColor": "#4D4D4D",
        "rejectButtonDisplay": true,
        "rejectButtonColor": "#f6f7f8",
        "rejectButtonCaptionColor": "#4D4D4D",
        "position": "float-center",
        "backgroundOverlay": true,
        "textColor": "black",
        "backgroundColor": "white",
        "listPurposes": true,
        "rejectButtonCaption": _iub_optionsObj.rejectButtonCaption,
        "acceptButtonCaption": _iub_optionsObj.acceptButtonCaption,
        "customizeButtonCaption": _iub_optionsObj.customizeButtonCaption,
        "explicitWithdrawal": true
    },
    "callback": {
        "onReady": function() {
            var banner = document.getElementById('iubenda-cs-banner');
            if (banner) {
                bannerHTML = banner.innerHTML;
            }
        },
        "onPreferenceFirstExpressed": function(event) {
            _iub.cons_instructions.push(["submit",
                {
                    consent: {
                        subject: {},
                        preferences: event,
                        legal_notices: [{
                            identifier: "cookie_policy"
                        }],
                        proofs: [{
                            content: JSON.stringify(event),
                            form: bannerHTML
                        }]
                    }
                }
            ]);
        },
        "onPreferenceExpressed": function(preference) {
            if(_iub_optionsObj.scope == 'wp'){
                if(preference.purposes[4] != false){
                    if(typeof pys !== 'undefined') {
                        if(_iub_optionsObj.purposes.ga == true){
                            pys.Analytics.loadPixel();
                        }
                    }
                }
                if(preference.purposes[5] != false){
                    if(typeof pys !== 'undefined') {
                        if(_iub_optionsObj.purposes.facebook == true){
                            pys.Facebook.loadPixel();
                        }
                        if(_iub_optionsObj.purposes.gads == true){
                            pys.GAds.loadPixel();
                        }
                    }
                }
            }
        }
    }
};