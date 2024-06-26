async function searchAd() {
    const debugInfo = document.getElementById('debugInfo').value;
    const resultDiv = document.getElementById('result');
    
    try {
        const debugData = JSON.parse(debugInfo);
        const adVideoId = debugData.addocid;
        
        if (adVideoId) {
            const adUrl = `https://youtu.be/${adVideoId}`;
            
            try {
                await navigator.clipboard.writeText(adUrl);
                resultDiv.innerHTML = `<p>Link copied to clipboard: <a href="${adUrl}" target="_blank">${adUrl}</a></p>`;
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Error copying URL: ', err);
                resultDiv.innerHTML = `<p>Error copying to clipboard. Here's your link: <a href="${adUrl}" target="_blank">${adUrl}</a></p>`;
            }
        } else {
            resultDiv.innerHTML = 'Ad video ID not found in the provided debug info.';
        }
    } catch (error) {
        resultDiv.innerHTML = 'Invalid debug info provided.';
    }
}
