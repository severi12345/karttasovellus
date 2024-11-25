// Tuo tarvittavat moduulit: Express, body-parser, cors ja mysql.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Luo uusi Express-sovellus.
const app = express();
// Määritellään portti, jossa serveri kuuntelee.
const port = 3001;

// Ota käyttöön CORS (Cross-Origin Resource Sharing) mahdollistamaan pyynnöt eri alkuperistä.
app.use(cors());
// Käytä body-parseria JSON-muotoisen pyyntöruumiin jäsentämiseen.
app.use(bodyParser.json());

// Luo yhteys MySQL-tietokantaan käyttäen mysql-moduulia.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'form-datab'
});

// Middleware, joka lokittaa kaikki tulevat pyynnöt konsoliin ja kutsuu next()-funktiota jatkamaan käsittelyä.TÄMÄN VOI POISTAA, MUTTA HYVÄ SEURATA VIRHEITÄ TÄLLÄ TAVALLA SOVELLUSKEHITYKSEN AIKANA app.use,…!

app.use((req, res, next) => {
    console.log(req)  // Tulostaa pyynnön objektin konsoliin.
    next()  // Siirtyy seuraavaan middlewareen tai reitinkäsittelijään.
})

// Määritellään POST-reitti lomakkeen datan vastaanottamiseksi ja tallentamiseksi.
app.post('/api/submit-form', (req, res) => {
  // Purkaa pyynnöstä tarvittavat tiedot.
  const { name, phone, email, address, postalCode, city, feedback } = req.body;
  // SQL-kysely, joka lisää tiedot form_data-tauluun.
  const query = 'INSERT INTO form_data (name, phone, email, address, postal_code, city, feedback) VALUES (?, ?, ?, ?, ?, ?, ?)';
  // Suorittaa kyselyn ja välittää parametrit estämään SQL-injektioita.
  db.query(query, [name, phone, email, address, postalCode, city, feedback], (err, result) => {
    if (err) throw err;  // Heittää virheen, jos kysely epäonnistuu.
    res.send('Tiedot tallennettu tietokantaan');  // Lähetetään vastaus asiakkaalle onnistuneen tallennuksen jälkeen.
  });
});

// Käynnistää palvelimen kuuntelemaan määriteltyä porttia.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);  // Ilmoittaa konsolissa palvelimen käynnistymisestä.
});

