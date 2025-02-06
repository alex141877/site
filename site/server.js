const express = require('express');
const mongoose = require('mongoose');  // Importer mongoose
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;  // Railway fournit le port

// Middleware pour parser les données
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connexion à MongoDB (utilise ton URI MongoDB Atlas)
const mongoURI = 'mongodb+srv://desjardinsalex67:YSYS4ZZdhrHSviEb@cluster0.y33wb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('🌍 Connecté à MongoDB');
  })
  .catch((err) => {
      console.log('❌ Échec de la connexion à MongoDB', err);
  });

// Dossier public pour fichiers statiques (index.html, CSS, etc.)
app.use(express.static('public'));

// Définir un modèle de données avec mongoose (modèle pour les utilisateurs du formulaire)
const userDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const UserData = mongoose.model('UserData', userDataSchema);  // Le modèle de données pour la base MongoDB

// Endpoint pour gérer la soumission du formulaire
app.post('/submit', (req, res) => {
    const newUser = new UserData(req.body);  // Créer un nouvel utilisateur avec les données du formulaire

    newUser.save()
        .then(() => {
            console.log('Données sauvegardées dans MongoDB');
            res.status(200).json({ message: 'Formulaire soumis avec succès' });
        })
        .catch((err) => {
            console.log('Erreur de sauvegarde', err);
            res.status(500).json({ error: 'Erreur serveur' });
        });
});

// 🔥 Corrige cette ligne pour bien écouter sur Railway
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur en ligne sur http://0.0.0.0:${PORT}`);
});
