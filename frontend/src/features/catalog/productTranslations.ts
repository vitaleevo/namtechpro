export const productTranslations: Record<string, {
    EN: { name?: string, description?: string, specs?: string[] },
    FR: { name?: string, description?: string, specs?: string[] }
}> = {
    "Radar Furuno DRS4D-NXT": {
        EN: {
            description: "Solid-state radar with Doppler Target Analyzer technology. Offers unprecedented situational awareness, identifying dangerous targets instantly through dynamic on-screen colors.",
            specs: ["Doppler technology", "Target Analyzer", "Fast Target Tracking"]
        },
        FR: {
            description: "Radar à semi-conducteurs avec technologie Doppler Target Analyzer. Offre une conscience situationnelle sans précédent, identifiant instantanément les cibles dangereuses grâce à des couleurs dynamiques à l'écran.",
            specs: ["Technologie Doppler", "Target Analyzer", "Suivi Rapide de Cible"]
        }
    },
    "Piloto Automático Simrad AP44": {
        EN: {
            name: "Simrad AP44 Autopilot",
            description: "Intuitive controller with high-visibility 4.1-inch display. Perfect for vessels requiring absolute precision in complex routes or adverse sea conditions.",
            specs: ["Glass Helm Design", "NMEA 2000", "No Drift Steering"]
        },
        FR: {
            name: "Pilote Automatique Simrad AP44",
            description: "Contrôleur intuitif avec écran haute visibilité de 4,1 pouces. Parfait pour les navires nécessitant une précision absolue sur des routes complexes ou dans des conditions de mer difficiles.",
            specs: ["Design Glass Helm", "NMEA 2000", "Direction Sans Dérive"]
        }
    },
    "Rádio VHF Icom IC-M605": {
        EN: {
            name: "Icom IC-M605 VHF Radio",
            description: "VHF radio with integrated AIS receiver and color TFT display. The gold standard for maritime communication, allowing AIS targets to be viewed directly on the radio display.",
            specs: ["Integrated AIS", "DSC Class D", "Intuitive UI"]
        },
        FR: {
            name: "Radio VHF Icom IC-M605",
            description: "Radio VHF avec récepteur AIS intégré et écran TFT couleur. La référence absolue pour la communication maritime, permettant de visualiser les cibles AIS directement sur l'écran.",
            specs: ["AIS Intégré", "DSC Classe D", "Interface Intuitive"]
        }
    },
    "Iridium Certus 100": {
        EN: {
            description: "Compact satellite terminal for voice and data anywhere on the globe. Ideal for maintaining crew connectivity and real-time monitoring systems on the high seas.",
            specs: ["IP data up to 88kbps", "High-quality voice", "Small footprint"]
        },
        FR: {
            description: "Terminal satellite compact pour la voix et les données partout dans le monde. Idéal pour maintenir la connectivité de l'équipage et les systèmes de surveillance en temps réel en haute mer.",
            specs: ["Données IP jusqu'à 88kbps", "Voix haute qualité", "Faible encombrement"]
        }
    },
    "Bateria AGM Victron 12V/220Ah": {
        EN: {
            name: "Victron AGM Battery 12V/220Ah",
            description: "Deep cycle AGM battery with low self-discharge and high performance. Specially designed for maritime use in demanding conditions.",
            specs: ["VRLA technology", "Low self-discharge", "Maintenance free"]
        },
        FR: {
            name: "Batterie AGM Victron 12V/220Ah",
            description: "Batterie AGM à décharge profonde avec faible autodécharge et haute performance. Spécialement conçue pour un usage maritime dans des conditions exigeantes.",
            specs: ["Technologie VRLA", "Faible autodécharge", "Sans entretien"]
        }
    },
    "Victron MultiPlus 3000": {
        EN: {
            description: "Hybrid inverter/charger for maritime and industrial systems. Ensures seamless transition between shore power and batteries, protecting sensitive electronics.",
            specs: ["Pure Sine Wave", "Parallel connection", "Remote monitoring"]
        },
        FR: {
            description: "Convertisseur/chargeur hybride pour systèmes maritimes et industriels. Assure une transition transparente entre l'alimentation à quai et les batteries, protégeant l'électronique sensible.",
            specs: ["Onde Sinusoïdale Pure", "Connexion parallèle", "Surveillance à distance"]
        }
    }
};
