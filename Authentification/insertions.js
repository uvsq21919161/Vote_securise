const User = require("../modeles/user");


for (let i = 0; i < 100; i++) {
    const email = `etudiant${i}@gmail.com`;
    const numero = 34000000 +i;
    const code = 0;
    await User.create({
        email,
        numero,
        code,
    })
}