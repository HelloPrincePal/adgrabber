// EU/EEA/UK/CH-only analytics consent. Loaded in <head> before the GA4 and Clarity tags.
// Visitors elsewhere see no banner but can opt out from the footer. See docs/security-privacy.md.
(function () {
    const STORAGE_KEY = 'adg_consent'; // 'granted' | 'denied'; strictly necessary, stores only the choice
    const HOTJAR_ID = 5038796;
    // privacy.html loads this script only for the settings link and banner, never the trackers.
    const settingsOnly = !!(document.currentScript && document.currentScript.hasAttribute('data-settings-only'));

    // EEA + UK + CH by Google's own geo (ISO 3166-1), used by GA4 Consent Mode.
    const CONSENT_REGIONS = [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
        'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
        'IS', 'LI', 'NO', 'GB', 'CH'
    ];

    // Browser time zones that may be inside the EEA/UK/CH. Over-matching (e.g. Europe/Istanbul) only shows the banner to a few extra people.
    const EU_ZONES_EXTRA = [
        'Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores', 'Atlantic/Reykjavik', 'Atlantic/Faroe',
        'Asia/Nicosia', 'Asia/Famagusta', 'Arctic/Longyearbyen',
        'Indian/Reunion', 'Indian/Mayotte', 'America/Guadeloupe', 'America/Martinique',
        'America/Cayenne', 'America/Marigot', 'America/St_Barthelemy',
        'GB', 'GB-Eire', 'Eire', 'Iceland', 'Poland', 'Portugal', 'WET', 'CET', 'MET', 'EET'
    ];

    function timeZone() {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        } catch (err) {
            return '';
        }
    }

    function readChoice() {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            return v === 'granted' || v === 'denied' ? v : null;
        } catch (err) {
            return null;
        }
    }

    function saveChoice(v) {
        try {
            localStorage.setItem(STORAGE_KEY, v);
        } catch (err) {
            // Private mode: the choice lasts for this page view only.
        }
    }

    const tz = timeZone();
    const inConsentRegion = tz.indexOf('Europe/') === 0 || EU_ZONES_EXTRA.indexOf(tz) !== -1;
    let choice = readChoice();

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    // AdGrabber runs no ads: ad signals stay denied everywhere.
    const adsDenied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

    if (choice) {
        window.gtag('consent', 'default', Object.assign({}, adsDenied, { analytics_storage: choice }));
    } else if (inConsentRegion) {
        window.gtag('consent', 'default', Object.assign({}, adsDenied, { analytics_storage: 'denied', wait_for_update: 500 }));
    } else {
        // Backup for EU visitors whose clock does not say Europe (VPN, odd settings): Google's geo keeps them cookieless.
        window.gtag('consent', 'default', Object.assign({}, adsDenied, { analytics_storage: 'denied', region: CONSENT_REGIONS }));
        window.gtag('consent', 'default', Object.assign({}, adsDenied, { analytics_storage: 'granted' }));
    }

    function loadHotjar() {
        if (settingsOnly || window.hj) return;
        (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); };
            h._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script'); r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    }

    function tellClarity(v) {
        if (typeof window.clarity === 'function') {
            window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: v });
        }
    }

    function apply(v) {
        choice = v;
        saveChoice(v);
        window.gtag('consent', 'update', { analytics_storage: v });
        tellClarity(v);
        if (v === 'granted') loadHotjar();
    }

    // Hotjar has no cookieless mode, so in the consent region it waits for Accept. Anyone who declined never gets it.
    if (choice === 'granted' || (!choice && !inConsentRegion)) loadHotjar();

    function showBanner() {
        if (document.getElementById('consent-banner')) return;
        const bar = document.createElement('div');
        bar.id = 'consent-banner';
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', 'Analytics consent');

        const text = document.createElement('p');
        text.append('We use analytics to improve AdGrabber. ');
        const link = document.createElement('a');
        link.href = 'privacy.html';
        link.textContent = 'Privacy';
        text.append(link);

        const accept = document.createElement('button');
        accept.type = 'button';
        accept.textContent = 'Accept';
        const decline = document.createElement('button');
        decline.type = 'button';
        decline.textContent = 'Decline';

        function choose(v) {
            apply(v);
            bar.remove();
        }
        accept.addEventListener('click', function () { choose('granted'); });
        decline.addEventListener('click', function () { choose('denied'); });

        const actions = document.createElement('div');
        actions.className = 'consent-actions';
        actions.append(decline, accept);
        bar.append(text, actions);
        document.body.appendChild(bar);
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (choice) tellClarity(choice);
        if (inConsentRegion && !choice) showBanner();

        const settings = document.getElementById('privacy-settings');
        // Everyone can change their choice; only the consent region gets the banner unprompted.
        if (settings) {
            settings.parentElement.hidden = false;
            settings.addEventListener('click', function (e) {
                e.preventDefault();
                showBanner();
            });
        }
    });
})();
