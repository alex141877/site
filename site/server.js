const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dossier public pour les fichiers statiques (index.html, CSS, etc.)
app.use(express.static('public'));

// Endpoint pour gérer la soumission du formulaire
app.post('/submit', (req, res) => {
    const userData = req.body;
    console.log(userData);

    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log("Erreur de lecture du fichier :", err);
            return;
        }

        let jsonData = JSON.parse(data);
        jsonData.push(userData);

        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log("Erreur d'écriture du fichier :", err);
                return;
            }

            console.log('Données sauvegardées avec succès !');
            res.send('Formulaire soumis avec succès');
        });
    });
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
