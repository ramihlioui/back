const prisma = require("../../prisma");

const equipes = [
  {
    nom: "CST",
  },
  {
    nom: "TDC",
  },
  {
    nom: "OPS",
  },
  {
    nom: "DEV",
  },
].map((e, i) => ({
  ...e,
  id: i+1
}));
const fournisseurs = [
  {
    nom: "F1",
  },
  {
    nom: "F2",
  },
  {
    nom: "F3",
  },
].map((e, i) => ({
  ...e,
  id: i+1,
}));
const categories = [
  {
    nom: "PC",
  },
  {
    nom: "Cable",
  },
  {
    nom: "Printer",
  },
  {
    nom: "Keyboard",
  },
  {
    nom: "Mouse",
  },
  {
    nom: "Sans fil",
  },
  {
    nom: "Router",
  },
  {
    nom: "Screen",
  },
].map((e, i) => ({
  ...e,
  id: i+1,
}));
const marques = [
  {
    nom: "HP",
  },
  {
    nom: "DELL",
  },
  {
    nom: "LENOVO",
  },
  {
    nom: "HAVIC",
  },
  {
    nom: "MSI",
  },
].map((e, i) => ({
  ...e,
  id: i+1
}));
//dependent entities
const users = [
  {
    nom: "Amin",
    prenom: "Salah",
    trigramme: "msal",
    isAdmin: true,
    password: "$2a$10$ieUqKnYHy6M2TV1/Xkz88uiWB3qlayHsMqHHPs1FuCZ4TCojfpPqi", //SIMPLE_PASSWORD
    equipeID: 1,
  },
  {
    nom: "Sana",
    prenom: "Rouissi",
    trigramme: "sro",
    isAdmin: false,
    password: "$2a$10$ieUqKnYHy6M2TV1/Xkz88uiWB3qlayHsMqHHPs1FuCZ4TCojfpPqi", //SIMPLE_PASSWORD
    equipeID: 2,
  },
  {
    nom: "Zied",
    prenom: "Snoussi",
    trigramme: "zsno",
    isAdmin: false,
    password: "$2a$10$ieUqKnYHy6M2TV1/Xkz88uiWB3qlayHsMqHHPs1FuCZ4TCojfpPqi", //SIMPLE_PASSWORD
    equipeID: 3,
  },
  {
    nom: "Malek",
    prenom: "Yaich",
    trigramme: "myai",
    isAdmin: false,
    password: "$2a$10$ieUqKnYHy6M2TV1/Xkz88uiWB3qlayHsMqHHPs1FuCZ4TCojfpPqi", //SIMPLE_PASSWORD
    equipeID: 4,
  },
].map((e, i) => ({
  ...e,
  id: i+1
}));
const produits = [
  {
    nom: "Souris Optique",
    quantite: 500,
    marqueID: 1,
    quantiteEnTachesEnCours: 3,
    categories: [5, 6],
  },
  {
    nom: "Souris Gamer",
    quantite: 0,
    marqueID: 2,
    categories: [5, 6],
    quantiteEnTachesEnCours: 0
  },
  {
    nom: "Imprimante Laser",
    quantite: 2,
    marqueID: 3,
    categories: [3],
    quantiteEnTachesEnCours: 1
  },
  {
    nom: "Clavier XHyper",
    quantite: 4,
    marqueID: 4,
    categories: [2],
    quantiteEnTachesEnCours: 4
  },
  {
    nom: "Ecran bureau",
    quantite: 1,
    marqueID: 5,
    categories: [8],
    quantiteEnTachesEnCours: 0
  },
].map((e, i) => ({
  ...e,
  id: i+1,
}));
const taches = [
  {
    userID: 1,
    produitID: 1,
    quantite: 2
  },
  {
    userID: 1,
    produitID: 3,
    quantite: 1,
  },
  {
    userID: 2,
    produitID: 4,
    quantite: 3,
  },
  {
    userID: 3,
    produitID: 4,
    quantite: 1
  },
  {
    userID: 3,
    produitID: 1,
    quantite: 1
  },
].map((e, i) => ({
  ...e,
  id: i+1,
}));
const factures = [
  {
    montant: 15.3,
    fournisseurID: 1,
  },
  {
    montant: 2.8,
    fournisseurID: 2,
  },
  {
    montant: 7,
    fournisseurID: 3,
  },
  //
  {
    montant: 15.3,
    fournisseurID: 2,
  },
  {
    montant: 2.8,
    fournisseurID: 3,
  },
  {
    montant: 7,
    fournisseurID: 1,
  },
  //
  {
    montant: 15.3,
    fournisseurID: 3,
  },
  {
    montant: 2.8,
    fournisseurID: 1,
  },
  {
    montant: 7,
    fournisseurID: 2,
  },
].map((e, i) => ({
  ...e,
  id: i+1,
}));

const seed_database = async () => {
  //create equipes
  await prisma.equipe.createMany({
    data: equipes,
  });
  console.log("created all equipe");
  //create fournisseurs
  await prisma.fournisseur.createMany({
    data: fournisseurs,
  });
  console.log("created all fournisseur");
  //create categories
  await prisma.categorie.createMany({
    data: categories,
  });
  console.log("created all categories");
  //create marques
  await prisma.marque.createMany({
    data: marques,
  });
  console.log("created all marques");
  //create users
  await prisma.user.createMany({
    data: users
  });
  console.log("created all users");
  //create produits
  for (const produit of produits) {
    const { categories } = produit;
    delete produit.categories;
    await prisma.produit.create({
      data: {
        ...produit,
        categories: {
          connect: categories.map((e) => ({ id: e })),
        },
      },
    });
  }
  console.log("created all produits");
  //create taches
  await prisma.tache.createMany({
    data: taches,
  });
  console.log("created all taches");
  //create factures
  await prisma.facture.createMany({
    data: factures,
  });
  console.log("created all factures");
};

module.exports = seed_database