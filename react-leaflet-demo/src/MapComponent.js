import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

// LocationMarker-komponentti käyttää Reactin tilaa ja Leaflet-kartan tapahtumien käsittelyä
// mahdollistaakseen käyttäjän lisätä kartalle markkereita hiiren klikkauksella.
function LocationMarker() {
    // useState-hookilla alustetaan tila, joka sisältää kaikki markkerit.
    // Alkuarvo on tyhjä taulukko.
    const [markers, setMarkers] = useState([]);

    // useMapEvents-hook kuuntelee kartan tapahtumia.
    // Tässä tapauksessa kuunnellaan kartan 'click'-tapahtumaa.
    useMapEvents({
        click(e) {
            // Kun karttaa klikataan, haetaan klikatun kohdan sijainti.
            const newMarker = e.latlng;
            // Uusi markkeri lisätään tilassa olevaan markkerien taulukkoon.
            setMarkers([...markers, newMarker]);
        }
    });

    // Komponentti renderöi kaikki tilassa olevat markkerit kartalle.
    // Jokaiselle markerille annetaan uniikki avain ja määritetään sijainti.
    // Markkerilla on myös popup, joka näyttää tekstin "Uusi markkeri!".
    return (
        <>
            {markers.map((marker, idx) => (
                <Marker key={idx} position={marker}>
                    <Popup>Uusi markkeri!</Popup>
                </Marker>
            ))}
        </>
    );
}

// MapComponent-komponentti vastaa kartan renderöimisestä.
const MapComponent = () => {
    return (
        // MapContainer määrittelee kartan perustiedot, kuten keskipisteen, zoom-tason,
        // ja tyylit, kuten korkeuden ja leveyden.
        <MapContainer center={[62.605079, 29.741751]} zoom={13} style={{ height: '700px', width: '100%' }}>
            // TileLayer lataa ja näyttää karttatilejä OpenStreetMapista.
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // Kartan alareunassa näytetään tekijänoikeustiedot.
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            // LocationMarker-komponentti lisätään kartalle, jotta markkereita voi lisätä.
            <LocationMarker />
        </MapContainer>
    );
};

// Komponentti viedään, jotta se voidaan käyttää muissa osissa sovellusta.
export default MapComponent;
