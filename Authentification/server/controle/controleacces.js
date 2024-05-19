// Imports
const User = require("../modeles/user");
const Candidat = require("../modeles/Candidats");
const nodemailer = require("nodemailer");

// Login Endpoint
/**
 * Fonction asynchrone pour vérifier qu'un utilisateur existe dans
 * la base de données, et que l'username et le mot de passe sont corrects :
 * créer le cookie pour stocker le token signé si c'est le cas.
 *
 * Si l'username n'est pas existant, ou que le mot de passe ne
 * correspond pas à celui retrouvé dans la base de donnée,
 * retourne une erreur.
 *
 * @param {Object} req - requête contenant les informations de l'utilisateur
 * @param {Object} res - reponse contenant un header qui set le cookie
 */
const loginUser = async (req, res) => {
  try {
    const { numero, code } = req.body;

    // Check si l'username existe dans la bdd
    const user = await User.findOne({ numero });
    console.log(user)
    if (!user) {
      return res.json({
        error: "Numéro étudiant inexistant",
      });
    }
    // Check si le mot de passe est le bon
    const match = code === user.code;
    if (!match || code.toString().length !== 6) {
      console.log(match,code.toString().length)
      return res.json({
        error: "Mauvais code",
      });
    } else {
      const userdetail = { numero: numero, email: user.email}
      console.log(userdetail)
      return res.json({
        user: { numero: numero, email: user.email},
      })
    }
    updatePwd(email, 0);
  } catch (error) {
    console.log(error);
  }
};

// generateCode Endpoint
const generateCode = async (req, res) => {
  const { numero } = req.body;
  // Check si l'username existe dans la bdd
  const user = await User.findOne({ numero });

  if (!user) {
    return res.json({
      error: "Numéro étudiant inexistant",
    });
  }
  const email = user.email;
  const newcode = Math.floor(100000 + Math.random() * 900000);

  updatePwd (email, newcode);

  const expediteur = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD, //process.env.PASSWORD,
    },
  })
  const contenu = {
    from: process.env.EMAIL,
    to: email,
    subject: "Code temporaire",
    html: `<h1>Code temporaire</h1>
    <p>Votre code temporaire est : ${newcode}</p>`,
  }

  expediteur.sendMail(contenu, (err, info) => {
    if (err) {
      console.log(err);
    }
  })
  setTimeout(() => updatePwd(email, 0), 180000);
  return res.json();
}

const updatePwd = async (email, newcode) => {
  User.findOneAndUpdate(
    { email: email }, // Filtrez l'utilisateur en utilisant son identifiant
    { $set: { code: newcode } },
    { new: true } // Si vous voulez récupérer l'objet mis à jour, utilisez { new: true }
  )
  .then(updatedUser => {
    if (updatedUser) {
      console.log('Mot de passe mis à jour avec succès :', updatedUser);
    } else {
      console.log('Utilisateur non trouvé.');
    }
  })
  .catch(error => {
    console.error('Une erreur est survenue lors de la mise à jour du mot de passe :', error);
  });
}

const getCandidats = async (req, res) => {
  const list = await Candidat.find({});
  const candidats = list.map((candidat) => {
    return {id_candidat: candidat.id_candidat, nom: candidat.nom, description: candidat.description};
  })
  return res.json({candidats});
}

// Export
module.exports = { loginUser, generateCode, getCandidats };

