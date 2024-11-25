import React, { useState } from 'react'; // Tuo React ja useState-hook moduulista 'react'.
import axios from 'axios';

function Form() { // Määrittelee komponentin nimeltä Form.
  // Alustaa useita tilamuuttujia, jotka tallentavat lomakkeen kenttien arvot.
  const [name, setName] = useState(''); // Hallitsee nimi-kentän tilaa.
  const [phone, setPhone] = useState(''); // Hallitsee puhelin-kentän tilaa.
  const [email, setEmail] = useState(''); // Hallitsee sähköposti-kentän tilaa.
  const [address, setAddress] = useState(''); // Hallitsee osoite-kentän tilaa.
  const [postalCode, setPostalCode] = useState(''); // Hallitsee postinumero-kentän tilaa.
  const [city, setCity] = useState(''); // Hallitsee kaupunki-kentän tilaa.
  const [feedback, setFeedback] = useState(''); // Hallitsee palaute-kentän tilaa.

// Määritellään handleSubmit funktio, joka käsittelee lomakkeen lähetystä.
const handleSubmit = async (event) => {
  // Estetään oletusarvoinen lomakkeen lähetysmekanismi, joka aiheuttaisi sivun uudelleenlatauksen.
  event.preventDefault();

  try {
    // Tehdään POST-pyyntö palvelimelle osoitteeseen 'http://localhost:3001/api/submit-form'.
    // Lähetetään lomakkeen tiedot JSON-muodossa: nimi, puhelin, sähköposti, osoite, postinumero ja kaupunki.
    const response = await axios.post('http://localhost:3001/api/submit-form', {
      name, phone, email, address, postalCode, city, feedback
    });

    // Tulostetaan konsoliin palvelimelta saatu vastaus.
    console.log(response.data); // palvelimen vastaus
  } catch (error) {
    // Jos pyynnön suorittamisessa tapahtuu virhe, tulostetaan virheilmoitus konsoliin.
    console.error('Lomakkeen lähetys epäonnistui:', error);
  }
};

  // Renderöi lomakkeen, joka käyttää handleSubmit-funktiota lähetettäessä.
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nimi:
        <input type="text" value={name} onChange={e => setName(e.target.value)} /> // Nimi-kenttä, joka päivittää tilan kirjoittaessa.
      </label>
      <br />
      <label>
        Puhelin:
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} /> // Puhelin-kenttä, joka päivittää tilan kirjoittaessa.
      </label>
      <br />
      <label>
        Sähköposti:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> // Sähköposti-kenttä, joka päivittää tilan kirjoittaessa.
      </label>
      <br />
      <label>
        Lähiosoite:
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} /> // Osoite-kenttä, joka päivittää tilan kirjoittaessa.
      </label>
      <br />
      <label>
        Postinumero:
        <input type="number" value={postalCode} onChange={e => setPostalCode(e.target.value)} /> // Postinumero-kenttä, joka päivittää tilan kirjoittaessa.
      </label>
      <br />
      <label>
        Postitoimipaikka:
        <input type="text" value={city} onChange={e => setCity(e.target.value)} /> // Kaupunki-kenttä, joka päivittää tilan kirjoittaessa.
      </label>
      <br />
      <label>
        Palaute (max 500 merkkiä):
        <textarea value={feedback} onChange={e => setFeedback(e.target.value)} maxLength={500} /> // Palaute-kenttä, joka rajoittaa merkkien määrän 500:aan.
      </label>
      <br />
      <button type="submit">Lähetä</button> // Lähetyspainike, joka käynnistää lomakkeen käsittelyn.
    </form>
  );
}
export default Form; // Viedään Form-komponentti käytettäväksi muissa osissa sovellusta.
