const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;  // Railway doit utiliser process.env.PORT

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dossier public pour les fichiers statiques (index.html, CSS, etc.)
app.use(express.static('public'));

// Vérifie si le fichier data.json existe, sinon le crée
const DATA_FILE = 'data.json';
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

// Endpoint pour gérer la soumission du formulaire
app.post('/submit', (req, res) => {
    const userData = req.body;
    console.log('Données reçues:', userData);

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur de lecture du fichier :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (error) {
            console.error("Erreur de parsing JSON :", error);
            return res.status(500).json({ error: "Données corrompues" });
        }

        jsonData.push(userData);

        fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Erreur d'écriture du fichier :", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }

            console.log('Données sauvegardées avec succès !');
            res.status(200).json({ message: 'Formulaire soumis avec succès' });
        });
    });
});

// Lancer le serveur sur le bon port
app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
