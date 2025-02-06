const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;  // Railway fournit le port

// Middleware pour parser les données
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dossier public pour fichiers statiques
app.use(express.static('public'));

// Endpoint pour formulaire
app.post('/submit', (req, res) => {
    const userData = req.body;
    console.log('Données reçues:', userData);

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur lecture fichier:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }

        let jsonData = JSON.parse(data);
        jsonData.push(userData);

        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Erreur écriture fichier:", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }

            console.log('Données sauvegardées !');
            res.status(200).json({ message: 'Formulaire soumis avec succès' });
        });
    });
});

// 🔥 Corrige cette ligne pour bien écouter sur Railway !
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur en ligne sur http://0.0.0.0:${PORT}`);
});
