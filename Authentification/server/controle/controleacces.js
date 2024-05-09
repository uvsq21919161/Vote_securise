// Imports
const User = require("../modeles/user");
const { hashPassword, comparePassword } = require("../aide/hachage");
const nodemailer = require("nodemailer");

// Register Endpoint
/**
 * Fonction asynchrone pour créer un nouvel utilisateur dans la base de données,
 * et enregistre le mot de passe haché.
 *
 * Si le mail ou l'username existe déjà dans la base de données, une erreur
 * sera retournée.
 *
 * @param {Object} req - requête contenant les informations de l'utilisateur
 * @param {Object} res - reponse de la requête
 */
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let majerror = false;
    let msgerrormail = "";
    let msgerrorname = "";
    // Check si email dans la bdd
    const existmail = await User.findOne({ email });
    if (existmail) {
      msgerrormail = "Email is taken already";
      majerror = true;
    }
    // Check si username dans la bdd
    const existname = await User.findOne({ username });
    if (existname) {
      msgerrorname = "Username is taken already";
      majerror = true;
    }
    if (majerror == true) {
      return res.json({
        majerror,
        errormail: msgerrormail,
        errorname: msgerrorname,
      });
    }
    // Hachage du mot de passe
    const hashedpassword = await hashPassword(password);
    // Création de l'utilisateur dans la base de données avec mongoose
    const user = await User.create({
      username,
      email,
      password: hashedpassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

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
    if (!user) {
      return res.json({
        error: "Numéro étudiant inexistant",
      });
    }

    // Check si le mot de passe est le bon
    const match = await comparePassword(code, user.code);
    if (!match || code !== 6) {
      return res.json({
        error: "Mauvais code",
      });
    }
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
  setTimeout(updatePwd(email, 0), 180000);
  return res.json();
}

const updatePwd = async (email, newcode) => {
  UserModel.findOneAndUpdate(
    { email: email }, // Filtrez l'utilisateur en utilisant son identifiant
    { $set: { code: newcode } }, // Définissez le nouveau mot de passe
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

// Export
module.exports = { registerUser, loginUser, generateCode };

