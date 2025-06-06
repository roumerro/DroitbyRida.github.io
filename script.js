const quizData = [
    {
        question: "Qu'est-ce que le Droit ?",
        options: [
            "Une série de principes moraux permettant de distinguer le bien du mal.",
            "Des règles de vie fondées sur le respect et la solidarité entre les individus.",
            "Un ensemble de règles générales, obligatoires et sanctionnées, qui organisent la vie en société."
        ],
        correct: "Un ensemble de règles générales, obligatoires et sanctionnées, qui organisent la vie en société."
    },
    {
        question: "Quel est l'objet principal du Droit ?",
        options: [
            "Contrôler les comportements moraux de chacun.",
            "Faire respecter les traditions familiales.",
            "Organiser les relations entre les individus dans la société."
        ],
        correct: "Organiser les relations entre les individus dans la société."
    },
    {
        question: "Quand dit-on que la règle de Droit est 'obligatoire' ?",
        options: [
            "Quand elle est facultative pour certains citoyens.",
            "Quand elle est suggérée par un juge.",
            "Quand elle s’impose à tous, et doit être respectée sous peine de sanction."
        ],
        correct: "Quand elle s’impose à tous, et doit être respectée sous peine de sanction."
    },
    {
        question: "Pourquoi la règle de Droit est-elle dite 'générale' ?",
        options: [
            "Elle concerne uniquement les professionnels du droit.",
            "Elle vise à régler des cas particuliers.",
            "Elle s’applique à tous les citoyens."
        ],
        correct: "Elle s’applique à tous les citoyens."
    },
    {
        question: "Que signifie le fait que la règle de Droit est 'impersonnelle' ?",
        options: [
            "Elle s'adapte à chaque personne individuellement.",
            "Elle est basée sur l'opinion d'une seule personne.",
            "Elle n’est pas faite pour régler des cas particuliers."
        ],
        correct: "Elle n’est pas faite pour régler des cas particuliers."
    },
    {
        question: "Que signifie la caractéristique 'permanente' de la règle de Droit ?",
        options: [
            "Elle peut être modifiée à tout moment.",
            "Elle ne s'applique que pour une durée limitée.",
            "Elle reste en vigueur tant qu’elle n’est pas officiellement supprimée."
        ],
        correct: "Elle reste en vigueur tant qu’elle n’est pas officiellement supprimée."
    },
    {
        question: "Qu'est-ce que le 'Droit objectif' ?",
        options: [
            "Les prérogatives reconnues à chaque individu.",
            "Les jugements rendus par les tribunaux.",
            "L’ensemble des règles qui organisent la vie en société."
        ],
        correct: "L’ensemble des règles qui organisent la vie en société."
    },
    {
        question: "Un exemple de 'Droit subjectif' est :",
        options: [
            "Le droit du travail.",
            "Le droit commercial.",
            "Le droit de vote."
        ],
        correct: "Le droit de vote."
    }
];

const groupNames = ['Groupe 1', 'Groupe 2', 'Groupe 3', 'Groupe 4'];
const swordSound = new Audio('images/Knife Slash SFX  ROYALTY FREE SOUND EFFECT.mp3');
const gavelSound = new Audio('images/JUDGE GAVEL  SOUND EFFECT  SOUNDEES1.mp3');
const questionDiv = document.getElementById('question');
const quizContainer = document.getElementById('quiz-container');
const nextBtn = document.getElementById('next');
const timerDiv = document.getElementById('timer'); // Assurez-vous que cet ID est bien dans votre HTML

let currentQuestion = 0;
let answeredGroups = new Set();
let groupAnswers = {};
let scoreParGroupe = Array(groupNames.length).fill(0);
let timerInterval;
let timeLeft = 30;

let lastCorrectAnswerPosition = -1;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timerDiv.textContent = timeLeft + 's';
    timerDiv.classList.remove('blink');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = timeLeft + 's';

        if (timeLeft <= 10) {
            timerDiv.classList.add('blink');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDiv.classList.remove('blink');
            quizContainer.querySelectorAll('button.answer-btn').forEach(btn => btn.disabled = true);
            checkAndRevealAnswers();
            nextBtn.disabled = false;
        }
    }, 1000);
}

function clearPreviousAnswerStyles() {
    quizContainer.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct-answer-bg', 'incorrect-answer-bg');
        btn.disabled = false;
    });
    quizContainer.querySelectorAll('.group.correct').forEach(g => g.classList.remove('correct'));
    quizContainer.querySelectorAll('.celebration').forEach(e => e.remove());
}

function renderQuestion(index) {
    answeredGroups.clear();
    groupAnswers = {};
    clearPreviousAnswerStyles();
    nextBtn.disabled = true;

    const currentQuiz = quizData[index];
    questionDiv.textContent = `Q${index + 1}: ${currentQuiz.question}`;
    quizContainer.innerHTML = '';

    const currentCorrectAnswerText = currentQuiz.correct;

    let shuffledOptions = [...currentQuiz.options];
    let newCorrectAnswerIndex;

    let attempts = 0;
    const maxAttempts = 10;

    do {
        shuffledOptions = [...currentQuiz.options];
        shuffleArray(shuffledOptions);
        newCorrectAnswerIndex = shuffledOptions.findIndex(option => option === currentCorrectAnswerText);
        attempts++;
    } while (newCorrectAnswerIndex === lastCorrectAnswerPosition && attempts < maxAttempts);

    lastCorrectAnswerPosition = newCorrectAnswerIndex;

       if (index === quizData.length - 1) {
        nextBtn.textContent = "⚔️ Verdict Final - الحكم النهائي ⚔️";
        // Styles ajoutés pour le bouton "Verdict Final"
        nextBtn.style.fontSize = '1.8rem';
        nextBtn.style.fontWeight = 'bold';
        nextBtn.style.color = '#ffff00'; // Texte jaune/doré
        nextBtn.style.textShadow = '0 0 15px rgb(255, 0, 0), 0 0 25px rgb(255, 0, 0)'; // Ombre du texte rouge
        nextBtn.style.boxShadow = '0 0 15px rgba(255, 0, 0, 1)'; // <--- GLOW INITIAL RÉDUIT (de 20px à 15px)
        nextBtn.style.transition = 'all 0.3s ease';
        nextBtn.style.backgroundColor = '#B22222'; // Force le fond du bouton en rouge solide au repos

        swordSound.play(); 
        // Ajuster l'effet au survol spécifiquement pour ce bouton de fin
        nextBtn.onmouseover = () => {
            // Glow au survol réduit (valeurs diminuées)
            nextBtn.style.boxShadow = '0 0 25px rgba(255, 0, 0, 1), 0 0 45px rgba(255, 0, 0, 1), 0 0 60px rgba(255, 0, 0, 1)'; // <--- GLOW AU SURVOL RÉDUIT
            nextBtn.style.transform = 'scale(1.05)';
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.backgroundColor = '#8B0000'; // Rouge plus foncé et solide au survol
        };
        nextBtn.onmouseout = () => {
            nextBtn.style.boxShadow = '0 0 15px rgba(255, 0, 0, 1)'; // <--- REVENIR AU GLOW INITIAL RÉDUIT
            nextBtn.style.transform = 'scale(1)';
            nextBtn.style.cursor = 'default';
            nextBtn.style.backgroundColor = '#B22222'; // Revenir à la couleur de fond de base
        };
    } else {
        nextBtn.textContent = "Question Suivante ➤";
    }

    groupNames.forEach((groupName, groupIndex) => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
        groupDiv.setAttribute('data-group-index', groupIndex);

        const title = document.createElement('h2');
        title.textContent = groupName;
        groupDiv.appendChild(title);

        shuffledOptions.forEach((option, optIndex) => {
            const btn = document.createElement('button');
            btn.classList.add('answer-btn');
            btn.textContent = option;
            btn.dataset.value = optIndex;
            if (optIndex === newCorrectAnswerIndex) {
                btn.dataset.isCorrect = 'true';
            }

            btn.addEventListener('click', () => {
                if (answeredGroups.has(groupIndex)) {
                    return;
                }

                answeredGroups.add(groupIndex);
                groupAnswers[groupIndex] = optIndex;

                groupDiv.querySelectorAll('button.answer-btn').forEach(b => {
                    b.classList.remove('selected');
                });

                btn.classList.add('selected');

                groupDiv.querySelectorAll('button.answer-btn').forEach(b => {
                    b.disabled = true;
                });

                if (answeredGroups.size === groupNames.length) {
                    clearInterval(timerInterval);
                    timerDiv.classList.remove('blink');
                    checkAndRevealAnswers();
                    nextBtn.disabled = false;
                }
            });

            groupDiv.appendChild(btn);
        });
        quizContainer.appendChild(groupDiv);
    });

    startTimer();
}

function checkAndRevealAnswers() {
    groupNames.forEach((groupName, groupIndex) => {
        const groupDiv = document.querySelector(`.group[data-group-index="${groupIndex}"]`);
        const selectedValue = groupAnswers[groupIndex];

        groupDiv.querySelectorAll('button.answer-btn').forEach(b => {
            b.disabled = true;
            b.classList.remove('selected');
        });

        const actualCorrectAnswerBtn = groupDiv.querySelector('button.answer-btn[data-is-correct="true"]');

        if (selectedValue !== undefined) {
            const selectedBtn = groupDiv.querySelector(`button.answer-btn[data-value="${selectedValue}"]`);

            if (selectedBtn && selectedBtn.dataset.isCorrect === 'true') {
                selectedBtn.classList.add('correct-answer-bg');
                groupDiv.classList.add('correct');
                scoreParGroupe[groupIndex]++;
                showCelebration(groupDiv, '✅ Bravo !');
            } else {
                if (selectedBtn) {
                    selectedBtn.classList.add('incorrect-answer-bg');
                }
                showCelebration(groupDiv, '❌ Faux !');

                if (actualCorrectAnswerBtn) {
                    actualCorrectAnswerBtn.classList.add('correct-answer-bg');
                }
            }
        } else {
            showCelebration(groupDiv, '⏰ Temps écoulé !');

            if (actualCorrectAnswerBtn) {
                actualCorrectAnswerBtn.classList.add('correct-answer-bg');
            }
        }
    });
}

function showCelebration(groupDiv, message) {
    const celebration = document.createElement('div');
    celebration.classList.add('celebration');
    celebration.textContent = message;
    celebration.style.color = message.includes('Bravo') ? '#00cc66' : 'red';
    celebration.style.marginTop = '10px';
    celebration.style.fontWeight = 'bold';
    groupDiv.appendChild(celebration);
}

// Nouvelle fonction pour télécharger les résultats en PDF
async function downloadResultsPDF(classement) {
    // Vérifier si jsPDF est bien chargé
    if (typeof window.jspdf === 'undefined') {
        alert("La bibliothèque jsPDF n'est pas chargée. Veuillez vérifier votre connexion ou le fichier index.html.");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ajout de la police pour mieux gérer les caractères spéciaux (même si les emojis restent un défi)
    // C'est un exemple, une police plus complète serait nécessaire pour tous les emojis.
    // doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal"); // Ceci nécessiterait d'inclure le fichier .ttf
    // doc.setFont("NotoSans");

    let y = 10; // Position Y de départ sur le PDF
    doc.setFontSize(18);
    doc.text("Classement Final du Quiz de Droit", 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleString()}`, 10, y);
    y += 20;

    // Calcul pour la logique des menottes dans le PDF
    const uniqueScores = [...new Set(classement.map(g => g.score))].sort((a, b) => b - a);
    const minScore = uniqueScores[uniqueScores.length - 1];
    const allScoresAreEqual = uniqueScores.length === 1;

    doc.setFontSize(12);
    doc.text("Rang | Nom du Groupe | Score", 10, y);
    y += 5;
    doc.setDrawColor(0); // Couleur de la ligne (noir)
    doc.setLineWidth(0.5); // Épaisseur de la ligne
    doc.line(10, y, 100, y); // Dessine une ligne
    y += 10;


    let currentRank = 0;
    let lastScore = -1;

    for (let i = 0; i < classement.length; i++) {
        const groupe = classement[i];

        if (groupe.score !== lastScore) {
            currentRank = i + 1;
            lastScore = groupe.score;
        }

        let rankDisplay = "";
        let groupText = `${groupe.nom}: ${groupe.score} pts`;

        // Logique des menottes dans le PDF
        if (!allScoresAreEqual && groupe.score === minScore) {
            rankDisplay = "Dernier ✋⚖️";
            doc.setTextColor(255, 0, 0); // Rouge pour les menottes
        } else {
            // Utiliser les icônes de podium si possible, ou le numéro de rang
            if (currentRank === 1) {
                rankDisplay = "🏆";
            } else if (currentRank === 2) {
                rankDisplay = "🥈";
            } else if (currentRank === 3) {
                rankDisplay = "🥉";
            } else {
                rankDisplay = `Rang ${currentRank}`;
            }
            doc.setTextColor(0, 0, 0); // Noir par défaut
        }

        doc.text(`${rankDisplay} - ${groupText}`, 10, y);
        y += 10;
        if (y > 280) { // Si on approche du bas de la page
            doc.addPage();
            y = 10; // Réinitialiser la position Y
        }
    }

    doc.save(`Resultats_Quiz_Droit_${new Date().toISOString().slice(0, 10)}.pdf`);
    // Remettre la couleur de texte par défaut après le save si d'autres textes devaient être ajoutés
    doc.setTextColor(0, 0, 0);
}


nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        renderQuestion(currentQuestion);
    }
    else {
        // Fin du quiz
        clearInterval(timerInterval);
        timerDiv.style.display = 'none'; // Cacher le timer quand le quiz est fini

        questionDiv.textContent = "🔨 L'audience est levée - رفعت الجلسة 🔨";
        gavelSound.play();
        quizContainer.innerHTML = ''; // Nettoyer le contenu du quizContainer
        nextBtn.style.display = 'none'; // Cacher le bouton "Suivant"

        const classement = groupNames.map((name, i) => ({
            nom: name,
            score: scoreParGroupe[i]
        }));

        classement.sort((a, b) => b.score - a.score);

        const podium = document.createElement('div');
        podium.style.display = 'flex';
        podium.style.justifyContent = 'center';
        podium.style.alignItems = 'flex-end';
        podium.style.gap = '30px';
        podium.style.marginTop = '30px';
        // Ajustez la largeur maximale du podium pour qu'il soit bien centré
        podium.style.maxWidth = '90%';
        podium.style.margin = '30px auto';
        podium.style.flexWrap = 'wrap'; // Permet aux éléments de passer à la ligne si l'écran est petit


        const uniqueScores = [...new Set(classement.map(g => g.score))].sort((a, b) => b - a);
        const minScore = uniqueScores[uniqueScores.length - 1];
        const allScoresAreEqual = uniqueScores.length === 1;

        const stylePodiumBox = (height, bgColor, rankText, scoreData) => {
            const box = document.createElement('div');
            box.style.width = '120px';
            box.style.height = height + 'px';
            box.style.backgroundColor = bgColor;
            box.style.borderRadius = '10px 10px 0 0';
            box.style.textAlign = 'center';
            box.style.color = 'white';
            box.style.display = 'flex';
            box.style.flexDirection = 'column';
            box.style.justifyContent = 'center';
            box.style.alignItems = 'center';
            box.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
            box.style.fontWeight = 'bold';
            box.style.fontSize = '1.1rem';
            box.style.marginBottom = '10px'; // Espace en bas de chaque boîte

            let icon = rankText;

            if (!allScoresAreEqual && scoreData.score === minScore) {
                icon = '✋⚖️';
                box.style.backgroundColor = '#6c0000';
                box.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
            }

            box.innerHTML = `<div style="font-size:${icon === '🏆' ? '3rem' : '2rem'};">${icon}</div>${scoreData.nom}<br>${scoreData.score} pts`;
            return box;
        };

        let currentRank = 0;
        let lastScore = -1;

        for (let i = 0; i < classement.length; i++) {
            const groupe = classement[i];

            if (groupe.score !== lastScore) {
                currentRank = i + 1;
                lastScore = groupe.score;
            }

            let icon = '';
            let height = 0;
            let bgColor = '';

            if (currentRank === 1) {
                icon = '🏆';
                height = 200;
                bgColor = '#FFD700';
            } else if (currentRank === 2) {
                icon = '🥈';
                height = 150;
                bgColor = '#C0C0C0';
            } else if (currentRank === 3) {
                icon = '🥉';
                height = 120;
                bgColor = '#CD7F32';
            } else {
                icon = ' '; // Pas d'icône spécifique de podium
                height = 100; // Hauteur de base
                bgColor = '#444'; // Couleur de fond générique
            }

            const podiumBox = stylePodiumBox(height, bgColor, icon, groupe);
            podium.appendChild(podiumBox);
        }

        // Ajouter le podium au quizContainer
        quizContainer.appendChild(podium);

        // Créer et ajouter le bouton de téléchargement en PDF
        const downloadPdfBtn = document.createElement('button');
        downloadPdfBtn.textContent = "Télécharger les résultats (PDF) 📄"; // Emoji ajouté
        downloadPdfBtn.style.marginTop = '30px'; // Plus d'espace en haut
        downloadPdfBtn.style.padding = '12px 25px'; // Bouton un peu plus grand
        downloadPdfBtn.style.backgroundColor = '#DC3545'; // Couleur rouge pour PDF
        downloadPdfBtn.style.color = 'white';
        downloadPdfBtn.style.border = 'none';
        downloadPdfBtn.style.borderRadius = '8px'; // Coins plus arrondis
        downloadPdfBtn.style.cursor = 'pointer';
        downloadPdfBtn.style.fontSize = '1.1rem'; // Texte plus grand
        downloadPdfBtn.style.fontWeight = 'bold'; // Texte en gras
        downloadPdfBtn.style.transition = 'background-color 0.3s ease, transform 0.2s ease'; // Transition au survol
        downloadPdfBtn.onmouseover = () => {
            downloadPdfBtn.style.backgroundColor = '#BD2130';
            downloadPdfBtn.style.transform = 'translateY(-2px)'; // Petit effet de soulèvement
        };
        downloadPdfBtn.onmouseout = () => {
            downloadPdfBtn.style.backgroundColor = '#DC3545';
            downloadPdfBtn.style.transform = 'translateY(0)';
        };

        downloadPdfBtn.addEventListener('click', () => downloadResultsPDF(classement));
        // Ajouté à la fin du quizContainer
        quizContainer.appendChild(downloadPdfBtn);

        // Optionnel: Ajouter un bouton pour rejouer si vous le souhaitez
        // const restartBtn = document.createElement('button');
        // restartBtn.textContent = "Rejouer le Quiz 🔄";
        // restartBtn.style.marginTop = '20px';
        // restartBtn.style.padding = '10px 20px';
        // restartBtn.style.backgroundColor = '#28A745';
        // restartBtn.style.color = 'white';
        // restartBtn.style.border = 'none';
        // restartBtn.style.borderRadius = '5px';
        // restartBtn.style.cursor = 'pointer';
        // restartBtn.style.fontSize = '1rem';
        // restartBtn.addEventListener('click', () => location.reload()); // Recharge la page
        // quizContainer.appendChild(restartBtn);
    }
});

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('rules-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    currentQuestion = 0;
    lastCorrectAnswerPosition = -1;
    scoreParGroupe = Array(groupNames.length).fill(0);
    renderQuestion(currentQuestion);
});