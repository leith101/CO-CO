const {google} = require('googleapis');

const API_KEY = 'AIzaSyC1ZJXMsEPSPvCWNlx5Ze-RGJVcIe_qYOI';
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

const analyzeRequest = {
    comment: {
        text: process.argv[2], // Le commentaire à analyser est passé en argument
    },
    requestedAttributes: {
        TOXICITY: {},
    },
};

google.discoverAPI(DISCOVERY_URL)
    .then(client => {
        client.comments.analyze(
            {
                key: API_KEY,
                resource: analyzeRequest,
            },
            (err, response) => {
                if (err) {
                    console.error(err);
                    process.exit(1); // Quitter avec code d'erreur
                }
                console.log(JSON.stringify(response.data, null, 2));
                process.exit(0); // Quitter avec code de succès
            });
    })
    .catch(err => {
        console.error(err);
        process.exit(1); // Quitter avec code d'erreur
    });