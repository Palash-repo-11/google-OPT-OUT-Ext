

let port;
try {
    port = document.getElementById('ga-google-opt-port');
    port.remove();
}
catch (e) {
    port = document.createElement('span');
    port.id = 'ga-google-opt-port';
    document.documentElement.append(port);
}



window['_gaUserPrefs'] = {
    ioo() {
        port.dispatchEvent(new Event('ga-google-opt-event'));
        return true;
    }
};



