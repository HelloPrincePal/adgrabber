// Anonymous usage log to a private Google Sheet. See docs/architecture.md.
// Keep false until the Apps Script URL is set and privacy.html is live.
const TELEMETRY_ENABLED = false;
const TELEMETRY_URL = 'https://script.google.com/macros/s/AKfycbw7zVdwa3icuWfnUbyH5ygsCWTrAZQleRYg_UbqRiLwsHKseu2bbYJzAQcBrYNZfJKFKw/exec';

// Never send the pasted debug JSON. Only these fields.
function logEvent(outcome, adVideoId, clipboardOk) {
    if (!TELEMETRY_ENABLED || !navigator.sendBeacon) return;
    try {
        const body = JSON.stringify({
            outcome: outcome,
            ad_id: adVideoId || null,
            clipboard: clipboardOk,
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        navigator.sendBeacon(TELEMETRY_URL, new Blob([body], { type: 'text/plain' }));
    } catch (err) {
        // Logging must never break the copy flow.
    }
}

function showLink(resultDiv, message, adUrl) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = adUrl;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = adUrl;
    p.append(message, a);
    resultDiv.replaceChildren(p);
}

async function searchAd() {
    const debugInfo = document.getElementById('debugInfo').value;
    const resultDiv = document.getElementById('result');

    let debugData;
    try {
        debugData = JSON.parse(debugInfo);
    } catch (error) {
        resultDiv.textContent = 'Invalid debug info provided.';
        logEvent('invalid_json', null, null);
        return;
    }

    const adVideoId = debugData && debugData.addocid;

    if (!adVideoId) {
        resultDiv.textContent = 'Ad video ID not found in the provided debug info.';
        logEvent('missing_addocid', null, null);
        return;
    }

    const adUrl = `https://youtu.be/${encodeURIComponent(adVideoId)}`;

    try {
        await navigator.clipboard.writeText(adUrl);
        showLink(resultDiv, 'Link copied to clipboard: ', adUrl);
        logEvent('success', adVideoId, true);
        alert('Link copied to clipboard!');
    } catch (err) {
        console.error('Error copying URL: ', err);
        showLink(resultDiv, "Error copying to clipboard. Here's your link: ", adUrl);
        logEvent('success', adVideoId, false);
    }
}
