/* TrailScope module: kmz.js — local KMZ reader powered by JSZip. */
const KMZ_MAX_KML_BYTES = 32 * 1024 * 1024;
const KMZ_MAX_ARCHIVE_BYTES = 128 * 1024 * 1024;

function kmzNormalizeEntryName(name) {
    return name.replace(/\\/g, '/').replace(/^\.\//, '').toLowerCase();
}

let jsZipLoadPromise = null;
function loadJSZipOnDemand() {
    if (typeof JSZip !== 'undefined' && typeof JSZip.loadAsync === 'function') {
        return Promise.resolve(JSZip);
    }
    if (jsZipLoadPromise) return jsZipLoadPromise;

    jsZipLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'js/common/jszip.min.js';
        script.async = true;
        script.onload = () => {
            if (typeof JSZip !== 'undefined' && typeof JSZip.loadAsync === 'function') {
                resolve(JSZip);
            } else {
                reject(new Error('JSZip is not available'));
            }
        };
        script.onerror = () => reject(new Error('Failed to load JSZip'));
        document.head.appendChild(script);
    }).catch(error => {
        jsZipLoadPromise = null;
        throw error;
    });
    return jsZipLoadPromise;
}

async function extractKMLFromKMZ(arrayBuffer) {
    if (!(arrayBuffer instanceof ArrayBuffer)) {
        throw new Error('KMZ data is not an ArrayBuffer');
    }
    if (arrayBuffer.byteLength > KMZ_MAX_ARCHIVE_BYTES) {
        throw new Error('KMZ archive is too large');
    }
    const JSZipLibrary = await loadJSZipOnDemand();

    let zip;
    try {
        zip = await JSZipLibrary.loadAsync(arrayBuffer);
    } catch (error) {
        throw new Error('Invalid KMZ ZIP archive');
    }

    const entries = Object.values(zip.files).filter(entry => !entry.dir);
    const kmlEntry = entries.find(entry => kmzNormalizeEntryName(entry.name) === 'doc.kml') ||
        entries.find(entry => kmzNormalizeEntryName(entry.name).endsWith('.kml'));
    if (!kmlEntry) {
        throw new Error('No KML file was found inside KMZ');
    }

    let kmlBytes;
    try {
        kmlBytes = await kmlEntry.async('uint8array');
    } catch (error) {
        throw new Error('Failed to extract KML from KMZ');
    }
    if (kmlBytes.byteLength > KMZ_MAX_KML_BYTES) {
        throw new Error('KML inside KMZ is too large');
    }

    return new TextDecoder('utf-8').decode(kmlBytes);
}
