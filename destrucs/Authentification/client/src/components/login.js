// Imports
import axios from "axios";

// Classe du login
class Signin {
  // Constructeur
  constructor(form, fields, navigate, setFormData) {
    this.form = form;
    this.fields = fields;
    this.navigate = navigate;
    this.setFormData = setFormData;
    this.transitionform = { ...this.form };
    // Verifie en continue si les paramètres du constructeur sont valides.
    this.validateonSubmit();
  }

  /**
   * Fonction asynchrone vérifiant en continue la validité des paramètres du constructeur.
   * Si ils sont bons, envoie une requête au serveur avec les valeurs pour vérifier
   * qu'ils sont dans la base de données.
   */
  async validateonSubmit() {
    const username = this.form.username;
    const password = this.form.password;
    try {
      const { data } = await axios.post("/login", { username, password });
      if (!data.error) {
        this.navigate("/dashboard");
      } else {
        this.setFormData({
          ...this.form,
          errorMsg: data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Export
export default Signin;
